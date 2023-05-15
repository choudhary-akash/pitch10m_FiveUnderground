import React from 'react'
import { useNavigate } from 'react-router-dom';

const Question = ({ question, questionIndex, totalQuestions }) => {
	const navigate = useNavigate();

	console.log(question);

	function goToHints() {
		navigate("/getHints", {
			state: {
				question: question
			}
		});
	}

	return (
		<div className='question-container'>
			<header className='question-header'>
				<img src="/assets/chatbot-outline.svg" alt="Bot Icon" />
				<div>
					<h3 style={{marginTop: 0}}>Question {`${questionIndex + 1} / ${totalQuestions}`}</h3>
					<p className='question-text' dangerouslySetInnerHTML={{ __html: question.questionText} }>
					</p>
				</div>
			</header>
			<p>Select Your Answer</p>
			<div className='options-contaier'>
				{
					question.answerOptions.map((option, index) => 
						<label className='option'>
							<input type='radio' name='selected-answer' value={index + 1} />
							<span dangerouslySetInnerHTML={{ __html: option}}></span>
						</label>
					)
				}
			</div>
			<div className='hints-suggestion'>
				Need help with this problem? 
				<button className='hints-button' onClick={goToHints}>
					<img src="/assets/head-idea.svg" alt="Thinking head icon" />
					<span>Ask AI</span>
				</button>
			</div>
		</div>
	);
}

export default Question