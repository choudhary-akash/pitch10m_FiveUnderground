const fs = require("fs");
const axios = require("axios");

const API_TOKEN = '0a3d4fa6ab074d56a8c816332aba5666';

// Function to upload a local file to the AssemblyAI API
async function upload_file(api_token, path) {
  const data = fs.readFileSync(path);
  const url = 'https://api.assemblyai.com/v2/upload';

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Authorization': api_token,
      },
			maxContentLength: Infinity,
			maxBodyLength: Infinity
    });

    if (response.status === 200) {
      return response.data['upload_url'];
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return null;
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    return null;
  }
}

// Async function that sends a request to the AssemblyAI transcription API and retrieves the transcript
async function transcribeAudio(api_token, audio_url) {
  const headers = {
    authorization: api_token,
    'content-type': 'application/json',
  };

  // Send a POST request to the transcription API with the audio URL in the request body
  const response = await axios.post('https://api.assemblyai.com/v2/transcript', {
    audio_url,
    speaker_labels: true
  }, { headers });

  // Retrieve the ID of the transcript from the response data
  const transcriptId = response.data.id;

  // Construct the polling endpoint URL using the transcript ID
  const pollingEndpoint = `https://api.assemblyai.com/v2/transcript/${transcriptId}`;

  // Poll the transcription API until the transcript is ready
  while (true) {
    // Send a GET request to the polling endpoint to retrieve the status of the transcript
    const pollingResponse = await axios.get(pollingEndpoint, { headers });

    // Retrieve the transcription result from the response data
    const transcriptionResult = pollingResponse.data;

    // If the transcription is complete, return the transcript object
    if (transcriptionResult.status === 'completed') {
      return transcriptionResult;
    }
    // If the transcription has failed, throw an error with the error message
    else if (transcriptionResult.status === 'error') {
      throw new Error(`Transcription failed: ${transcriptionResult.error}`);
    }
    // If the transcription is still in progress, wait for a few seconds before polling again
    else {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
}

// Async function to export subtitles in the specified format
async function exportSubtitles(api_token, transcriptId, format) {
  const exportUrl = `https://api.assemblyai.com/v2/transcript/${transcriptId}/${format}`;

  const exportResponse = await axios.get(exportUrl, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Authorization': api_token,
    }
  });

  return exportResponse.data;
}

async function main() {
  // // const path = 'C:\\Users\\Admin\\OneDrive - Varsity Education Management Pvt Ltd\\Hackathon-DESKTOP-SJAOSSJ\\CBSE GRADE 6 Zoology - 2.5 mins.mp4';

	// console.log("Uploading file...");
  // // const uploadUrl = await upload_file(API_TOKEN, path);
	// const uploadUrl = `http://64.227.137.118/assets/videos/maths-197856.mp4`;

  // if (!uploadUrl) {
  //   console.error(new Error('Upload failed'));
  //   return
  // }

	// console.log("Transcribing audio...");
  // // Call the transcribeAudio function to start the transcription process
	// let startTime = new Date();
  // const transcript = await transcribeAudio(API_TOKEN, uploadUrl);
  // let endTime = new Date();

	// console.log("Time taken to transcribe: " + (endTime - startTime) + " ms");

	// console.log("Transcription Id: " + transcript.id);

	// let transcriptId = transcript.id;

	let transcriptId = '6g1xpndpef-9224-4386-a2e5-3a02613159e8';
	let subtitleFormat = 'vtt';

  // Call the exportSubtitles function with the desired format ('srt' or 'vtt')
  const subtitles = await exportSubtitles(API_TOKEN, transcriptId, subtitleFormat);

	// Write the subtitles to a file
	fs.writeFileSync(`transcript.${subtitleFormat}`, subtitles);
}

async function getTranscription(transcriptId, api_token) {
	const exportUrl = `https://api.assemblyai.com/v2/transcript/${transcriptId}`;

  const exportResponse = await axios.get(exportUrl, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': api_token,
    }
  });

  return exportResponse.data;
}

async function writeTranscriptToFile() {
	// Fetching transcript object from Assembly API using transcript id 
	console.log("Fetching transcript...");
	transcript = await getTranscription("6g6107f34c-2d5f-451a-9913-415dc07ffc59", API_TOKEN);

	// Writing transcript captions to file
	console.log("Writing Transcript to File...")
	fs.writeFileSync("transcript.json", JSON.stringify(transcript));
}

main();

// writeTranscriptToFile();