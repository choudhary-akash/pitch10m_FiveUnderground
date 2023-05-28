import React from 'react';
import '../styles/VideoCard.css';
import moment, { duration } from 'moment/moment';

const VideoCard = ({ video }) => {
	const videoDuration = moment.utc(video.duration * 1000).format('mm:ss');

	function redirectToVideo() {
		document.location.href = `/videos/${video.cmsVideoId}`;
	}

	return (
		<div className='video-card' onClick={redirectToVideo}>
			<div className='video-thumbnail'>
				<img src={video.thumbnailUrl} alt="" />
				<div className='video-duration'>{videoDuration}</div>
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