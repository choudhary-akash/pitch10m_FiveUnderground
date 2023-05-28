import React, { useEffect, useRef, useState } from 'react'
import '../styles/VideoView.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {duration} from 'moment/moment';

const VideoView = () => {
	const [video, setVideo] = useState(null);
	const videoRef = useRef(null);
	const navigate = useNavigate();

	let { cmsVideoId } = useParams();

	let getVideoAPI = "http://localhost:8000" + `/api/videos/${cmsVideoId}`;

	useEffect(() => {
		if (video == null) {
			axios.get(getVideoAPI)
			.then(res => {
				setVideo(res.data.data);
			});
		}
	}, [video]);

	function jumpToTime(seconds) {
		videoRef.current.currentTime = seconds;
	}
	
	function goBack() {
		navigate(-1);
	}

	function goToQuestionsPage() {
		navigate("/practiseQuestions", {
			state: {
				subjectId: video.subjectId,
				chapterId: video.chapterId,
				topicId: video.topicId,
				subtopicId: video.subtopicId
			}
		});
	}

	function getSubjectIcon(subjectId) {
		switch(subjectId) {
			case 1:
				return '/assets/physics-icon.svg';

			case 2:
				return '/assets/chemistry-icon.svg';

			case 3:
				return '/assets/maths-icon.svg';
		
			default:
				return '';
		}
	}
	

	return (
		<div id='video-view'>
			<button className='back-btn' onClick={goBack}>
				<img src="/assets/left-arrow.svg" alt="Left Arrow Icon" />
				Back
			</button>		
			<div className="video-container">
				<video src={video?.videoUrl || ''} controls ref={videoRef} autoPlay crossOrigin='anonymous'>
					<track label='English' kind='subtitles' srcLang='en' src={video?.vttCaptionsUrl || ''} default />
				</video>
				<div className="timeline">
					<div className='timeline-heading'>
						<h3>Video Timeline</h3>
					</div>
					<div className='timeline-topics'>
						{
							video?.timeline &&
							video?.timeline?.map((timelineEl, index) => 
								<div className='timeline-topic' key={index}>
									<span className='topic-name'>
										{timelineEl.topic}
									</span>
									<span className='topic-timestamp' style={{cursor: 'pointer'}} onClick={() => jumpToTime(duration(timelineEl.timestamp).asSeconds())}>
										{String(duration(timelineEl.timestamp).minutes()).padStart(2, '0') + ":" + String(duration(timelineEl.timestamp).seconds()).padStart(2, '0')}
									</span>
								</div>	
							)
						}
					</div>
					<div className='generate-qns-container'>
						<button onClick={() => goToQuestionsPage()}>Generate Questions</button>
					</div>
				</div>
			</div>
			<div className='video-details'>
				<div className='video-title'>{video?.videoName}</div>
				<div className='video-topic'>
					<img src={getSubjectIcon(video?.subjectId)} alt="" className='video-subject-icon' />
					<span>{video?.topicName}</span>
				</div>
			</div>
		</div>
	)
}

export default VideoView