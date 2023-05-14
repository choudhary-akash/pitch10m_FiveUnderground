import React from 'react'
import VideoCard from './VideoCard';

const VideoList = () => {
	const videos = [
		{
			"cmsVideoId": 13608,
			"videoName": "Chemical Law of Equivalence",
			"videoUrl": "http://64.227.137.118/assets/videos/chemistry-13608.mp4",
			"thumbnailUrl": "http://64.227.137.118/assets/thumbnails/chemistry-13608.png",
			"subjectId": 2,
			"chapterId": 68,
			"topicId": 558,
			"subtopicId": 2727,
			"assemblyTranscriptId": "6g11w40e3b-8cd9-4677-abb7-a7eae5c78596",
			"captionsUrl": "http://64.227.137.118/assets/transcripts/chemistry-13608.srt",
			"duration": 267
		},
		{
			"cmsVideoId": 199579,
			"videoName": "Motion in a Straight Line",
			"videoUrl": "http://64.227.137.118/assets/videos/physics-199579.mp4",
			"thumbnailUrl": "http://64.227.137.118/assets/thumbnails/physics-199579.png",
			"subjectId": 1,
			"chapterId": 40,
			"topicId": 268,
			"subtopicId": 2137,
			"assemblyTranscriptId": "6g1xu2mazm-dd5b-4de4-aed0-87229042a041",
			"captionsUrl": "http://64.227.137.118/assets/transcripts/physics-199579.srt",
			"duration": 282
		},
		{
			"cmsVideoId": 197856,
			"videoName": "Measurement of an Angle",
			"videoUrl": "http://64.227.137.118/assets/videos/maths-197856.mp4",
			"thumbnailUrl": "http://64.227.137.118/assets/thumbnails/maths-197856.png",
			"subjectId": 3,
			"chapterId": 5613,
			"topicId": 13505,
			"subtopicId": 13510,
			"assemblyTranscriptId": "6g1xpndpef-9224-4386-a2e5-3a02613159e8",
			"captionsUrl": "http://64.227.137.118/assets/transcripts/maths-197856.srt",
			"duration": 236
		}
	];

	return (
		<div id='video-list'>
			{
				videos.map(video => 
					<VideoCard video={video} key={video.cmsVideoId}></VideoCard>	
				)
			}
		</div>
	)
}

export default VideoList