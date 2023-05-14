import React from 'react';
import '../styles/VideoCard.css';
import { redirect } from 'react-router-dom';

const VideoCard = ({ video }) => {
	function redirectToVideo() {
		console.log("Redirecting to video...");
		document.location.href = `/videos/${video.cmsVideoId}`;
	}

	return (
		<div className='video-card' onClick={redirectToVideo}>
			<div className='video-thumbnail'>
				<img src={video.thumbnailUrl} alt="" />
			</div>
			<div className='video-description'>
				<div className='view-count'>
					<img src="/assets/eye.svg" alt="" />
					<span>550 views</span>
				</div>
				<div className='view-name'>
					{video.videoName}
				</div>
			</div>
		</div>
	);
};

export default VideoCard;