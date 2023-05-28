const fs = require("fs");
const axios = require("axios");
const moment = require("moment");

// Load env variables
require("dotenv").config();


const API_KEY = process.env.OPENAI_KEY;

const BASE_URL = "https://api.openai.com/v1";
const COMPLETION_URL = BASE_URL + "/completions";
const CHAT_COMPLETION_URL = BASE_URL + "/chat/completions";
const FILE_PATH = "maths-197856.srt";

const chat_messages = [];

async function davinci_completion(prompt) {
	const response = await axios.post(COMPLETION_URL, {
		model: "text-davinci-003",
		prompt: prompt,
		max_tokens: 500,
		temperature: 0.7
	}, {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${API_KEY}`,
		}
	});

	if (response.status !== 200) {
		throw new Error(`Error: ${response.status} - ${response.statusText}`);
	}

	return response.data;
}

async function chat_completion(prompt, config) {
	if (!config) {
		config = {};
	}

	// Add new prompt to the existing conversation
	chat_messages.push({role: 'user', content: prompt});

	// Call OpenAI API for chat completion
	const response = await axios.post(CHAT_COMPLETION_URL, {
		model: "gpt-3.5-turbo",
		messages: chat_messages,
		max_tokens: config.maxTokens ?? 500,
		temperature: 0.49,
		top_p: 0.49,
		n: 1,
		presence_penalty: 0,
		frequency_penalty: 0,
		stream: false
	}, {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${API_KEY}`,
		}
	});

	// If response status is not 200 OK, then throw an error
	if (response.status !== 200) {
		throw new Error(`Error: ${response.status} - ${response.statusText}`);
	}

	chat_messages.push(response.data.choices[0].message);

	return response.data;
}

async function feedTranscript() {
	// Instruct chat gpt to wait for all parts of the transcript before further processing
	const startPrompt = `I will send you my input in multiple parts. You keep storing my prompt and generate the response when I will say this is my final prompt. Each prompt will begin with Part [x] where x denotes the current part number.`;

	await chat_completion(startPrompt);

	// Read transcript from file
	const transcript = fs.readFileSync(FILE_PATH, { 
		encoding: 'utf8'
	});

	// Divide transcript into list of string, where each element contains the caption index, caption timestamp and caption text 
	let transcriptLines = transcript.trim().split('\n\n');

	let partCount = 1;

	let transcriptBuffer = `Part [${partCount}]`;
	
	// Load the transcript into a buffer of around 3000 chars, feed the transcript to chatgpt and clear the buffer
	for (let i = 0; i < transcriptLines.length; i++) {
		let line = transcriptLines[i];
		if (i > 0) {
			transcriptBuffer += "\n\n";
		}
		transcriptBuffer += line;

		// When the buffer fills up to 3000 chars, then send the buffer to chat gpt and clear the buffer
		if (transcriptBuffer.length >= 1000 || (transcriptLines.length - i) <= 1 ) {
			if ((transcriptLines.length - i) <= 1 ) {
				transcriptBuffer += "\n\nI've sent all the parts.";
			} else {
				transcriptBuffer += "\n\nWait for the next parts.";
			}

			// await chat_completion(transcriptBuffer, {
			// 	maxTokens: 50
			// });

			chat_messages.push({ role: 'user', content: transcriptBuffer });
			// chat_messages.push({ role: 'assistant', content: "Thank you for the input. Please provide the next parts whenever you are ready."});
			
			partCount++;

			transcriptBuffer = `Part [${partCount}]`;
		}
	}
}

async function summarize() {
	// Instruct chat gpt to summarize the previously fed transcript
	const prompt = `Read and understand the above timestamped text in .srt format shared with you in parts and then distribute them into broad topics in one liners and along with the starting timestamp of the topic. In your answer, only send a json array of objects where each object contains two fields - 'topic' and 'timestamp'. Send the topics as string and the timestamps as string in HH:MM:SS.SSS format. Don't include anything else in your response. `;

	let completionRes = await chat_completion(prompt, {maxTokens: 250});

	let responseContent = String(completionRes.choices[0].message.content);

	let topicTimestamps;
	let jsonStr;

	if (responseContent.includes('```')) {
		jsonStr = responseContent.split('```')[1];
	} else {
		jsonStr = responseContent;
	}
	
	try {
		topicTimestamps = JSON.parse(jsonStr);
	} catch (err) {
		throw new Error("Unable to parse response as json. Content: " + responseContent);
	}

	return topicTimestamps;
}


async function main() {
	try{ 
		await feedTranscript();
		let topicTimestamps = await summarize();

		fs.writeFileSync("topic_timestamps.json", JSON.stringify(topicTimestamps));
	} catch (err) {
		console.error(err.message);
	}
}

main();