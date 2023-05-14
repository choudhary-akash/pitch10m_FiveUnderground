import React from 'react'
import '../styles/VideoView.css'
import { useParams } from 'react-router-dom';

const VideoView = () => {

	let { cmsVideoId }= useParams();
	console.log(cmsVideoId);

	let videoUrl = document.location.host + `/api/videos/${cmsVideoId}`;

	return (
		<div id='video-view'>
			<button className='back-btn'>
				<img src="/assets/left-arrow.svg" alt="Left Arrow Icon" />
				Back
			</button>		
			<div className="video-container">
				<video src="" controls></video>
				<div className="timeline">
					<div className='timeline-heading'>
						<h3>Video Timeline</h3>
					</div>
					<div className='timeline-topics'></div>
					<div className='generate-qns-container'>
						<button>Generate Questions</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default VideoView