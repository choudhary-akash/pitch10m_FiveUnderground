
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
        chapterId:{
            type: Number, 
            required:true
        },
        topicId: {
            type: Number,
            default: false
        },
        subtopicId:{
            type:Number,
            required:true
        },
        assemblyTranscriptId:{
            type:String
        },
        captionsUrl:{
            type:String
        },
        duration:{
            type:Number,
            required:true
        },
				vttCaptionsUrl: {
					type: String
				},
				timeline: {
					type: Array
				}
    })

module.exports = mongoose.model('Videos', videosSchema);
 


// {
//     "cmsVideoId": 13608,
//     "videoName": "Chemical Law of Equivalence",
//     "videoUrl": "http://64.227.137.118/assets/videos/chemistry-13608.mp4",
//     "thumbnailUrl": "http://64.227.137.118/assets/thumbnails/chemistry-13608.png",
//     "subjectId": 2,
//     "chapterId": 68,
//     "topicId": 558,
//     "subtopicId": 2727,
//     // "assemblyTranscriptId": "6g11w40e3b-8cd9-4677-abb7-a7eae5c78596",   =====not req
//     // "captionsUrl": "http://64.227.137.118/assets/transcripts/chemistry-13608.srt",==nreq
//     "duration": 267
//   }



