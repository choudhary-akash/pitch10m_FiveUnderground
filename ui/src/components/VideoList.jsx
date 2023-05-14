import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard';
import axios from 'axios';

const VideoList = () => {
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		fetchVideos().
		then(videos => {
			setVideos(videos);
		})
	}, []);

	async function fetchVideos() {
		let getAllVideosURL = "http://localhost:8000" + `/api/videos`;
		let response = await axios.get(getAllVideosURL);

		return response.data.data;
	}

	return (
		<div id='video-list'>
			{
				videos &&
				videos.map(video => 
					<VideoCard video={video} key={video.cmsVideoId}></VideoCard>	
				)
			}
		</div>
	)
}

export default VideoList