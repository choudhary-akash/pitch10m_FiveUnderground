import React, { useEffect, useState } from 'react'
import '../styles/ViewQuestions.css';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import Question from '../components/Question.jsx';
import AskHints from '../components/AskHints';

const ViewQuestions = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [questions, setQuestions] = useState(null);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [openHints, setOpenHints] = useState(false);

	async function fetchQuestions() {
		let getQuestionsURL = "http://localhost:8000" + `/api/getQuestions`
		let response = await axios.post(getQuestionsURL, location.state);
		return response.data.data;
	}

	useEffect(() => {
		fetchQuestions()
		.then(questions => {
			questions = questions.map(question => {
				question.selectedAnswer = null;
				question.isCorrect = null;
				return question;
			});
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

	function setSelectedAnswer(qnIndex, optionIndex) {
		setQuestions(questions => questions.map((question, index) => {
			if (index !== qnIndex) return question;

			question.selectedAnswer = optionIndex;
			question.isCorrect = optionIndex === Number(question.correctAnswer);
			
			return question;
		}));
	}

	if (openHints) {
		return (
			<AskHints
				question={questions[currentQuestionIndex]}
				setOpenHints={setOpenHints}
			></AskHints>
		);
	} else {
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
							<Question
								questions={questions} 
								questionIndex={currentQuestionIndex} 
								totalQuestions={questions.length}
								setSelectedAnswer={setSelectedAnswer}
								setOpenHints={setOpenHints}
							></Question>
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

}

export default ViewQuestions