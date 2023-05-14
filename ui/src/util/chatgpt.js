import axios from "axios";

const API_KEY = "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";

const BASE_URL = "https://api.openai.com/v1";
const COMPLETION_URL = BASE_URL + "/completions";
const CHAT_COMPLETION_URL = BASE_URL + "/chat/completions";

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

async function chat_completion(messageList, config) {
	if (!config) {
		config = {};
	}

	// Call OpenAI API for chat completion
	const response = await axios.post(CHAT_COMPLETION_URL, {
		model: "gpt-3.5-turbo",
		messages: messageList,
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

	return response.data.choices[0];
}

export { davinci_completion, chat_completion };