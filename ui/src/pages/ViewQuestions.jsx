import React, { useEffect, useState } from 'react'
import '../styles/ViewQuestions.css';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import Question from '../components/Question.jsx';

const ViewQuestions = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [questions, setQuestions] = useState(null)

	async function fetchQuestions() {
		let getQuestionsURL = "http://localhost:8000" + `/api/getQuestions`
		let response = await axios.post(getQuestionsURL, location.state);
		return response.data.data;
	}

	useEffect(() => {
		fetchQuestions()
		.then(questions => {
			setQuestions(questions);
		})
	}, [])

	function goBack() {
		navigate(-1);
	}

	return (
		<div className='view-questions'>
			<button className='back-btn' onClick={goBack}>
				<img src="/assets/left-arrow.svg" alt="Left Arrow Icon" />
				Back
			</button>	

			<div className='questions-container'>
				{
					questions &&
					<Question question={questions[0]}></Question>
				}
			</div>

			<div className="qn-nav-btns">
				<button >Previous</button>
				<button >Next</button>
			</div>
		</div>
	)
}

export default ViewQuestions