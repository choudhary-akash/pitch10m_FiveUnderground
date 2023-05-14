import React from 'react';

const Sidebar = () => {
	return (
		<div id='sidebar'>
			<div className='sidebar-link active'>
				<img src="/assets/Home.svg" alt="Home Icon" />
				Home
			</div>
			<div className='sidebar-link'>
				<img src="/assets/Video.svg" alt="Video Icon" />
				Live Classes
			</div>
			<div className='sidebar-link'>
				<img src="/assets/Activity.svg" alt="Activity Icon" />
				Learn
			</div>
			<div className='sidebar-link'>
				<img src="/assets/Edit Square.svg" alt="Edit Square Icon" />
				Tests
			</div>
			<div className='sidebar-link'>
				<img src="/assets/Profile.svg" alt="Profile Icon" />
				Account
			</div>
			<div className='sidebar-link'>
				<img src="/assets/Bookmark.svg" alt="Bookmarks Icon" />
				My Bookmarks
			</div>
			<div className='sidebar-link'>
				<img src="/assets/Wallet.svg" alt="Wallet Icon" />
				Subscription
			</div>
			<div className='sidebar-link'>
				<img src="/assets/Call.svg" alt="Call Icon" />
				Contact Us
			</div>
		</div>
	);
};

export default Sidebar;