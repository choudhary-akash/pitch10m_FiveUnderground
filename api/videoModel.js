
const mongoose = require('mongoose');

const videosSchema = new mongoose.Schema(
	{
		_id: {
			type: mongoose.Schema.Types.ObjectId,
			auto: true
		},
		cmsVideoId: {
			type: Number,
			required: true
		},
		videoName: {
			type: String,
			required: true
		},
		videoUrl: {
			type: String,
			required: true
		},
		thumbnailUrl: {
			type: String,
			required: true
		},
		subjectId: {
			type: Number
		},
		subjectName: {
			type: String
		},
		chapterId: {
			type: Number,
		},
		chapterName: {
			type: String
		},
		topicId: {
			type: Number,
		},
		topicName: {
			type: String,
		},
		subtopicId: {
			type: Number,
		},
		subtopicName: {
			type: String
		},
		assemblyTranscriptId: {
			type: String
		},
		captionsUrl: {
			type: String
		},
		duration: {
			type: Number,
			required: true
		},
		vttCaptionsUrl: {
			type: String
		},
		timeline: {
			type: Array
		}
	});

module.exports = mongoose.model('Videos', videosSchema);