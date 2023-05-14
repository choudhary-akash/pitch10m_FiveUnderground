import React from 'react'
import '../styles/AllVideos.css';
import Sidebar from '../components/Sidebar';
import VideoList from '../components/VideoList';

const AllVideos = () => {
	return (
		<div id='all-videos'>
			<Sidebar></Sidebar>
			<VideoList></VideoList>
		</div>
	)
}

export default AllVideos