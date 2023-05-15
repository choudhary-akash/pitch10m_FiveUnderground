import React, { useEffect, useState } from 'react'
import '../styles/ViewQuestions.css';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import Question from '../components/Question.jsx';

const ViewQuestions = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [questions, setQuestions] = useState(null)
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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

	function previousQn() {
		setCurrentQuestionIndex(oldQnIndex => oldQnIndex - 1);
	}
	
	function nextQn() {
		setCurrentQuestionIndex(oldQnIndex => oldQnIndex + 1);
	}

	return (
		<div className='view-questions'>
			<button className='back-btn' onClick={goBack}>
				<img src="/assets/left-arrow.svg" alt="Left Arrow Icon" />
				Back
			</button>	

			{
				questions &&
				<div>
					<div className='questions-container'>
						<Question question={questions[currentQuestionIndex]} questionIndex={currentQuestionIndex} totalQuestions={questions.length}></Question>
					</div>

					<div className="qn-nav-btns">
						<button onClick={previousQn} disabled={currentQuestionIndex <= 0}>Previous</button>
						<button onClick={nextQn} disabled={(currentQuestionIndex + 1) >= questions.length}>Next</button>
					</div>
				</div>
			}
		</div>
	)
}

export default ViewQuestions