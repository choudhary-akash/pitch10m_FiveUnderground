import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Question = ({ questions, questionIndex, totalQuestions, setSelectedAnswer, setOpenHints }) => {
	const [question, setQuestion] = useState(null);

	useEffect(() => {
		setQuestion(questions[questionIndex]);
	}, [questions, questionIndex]);

	function isOptionSelected(optionIndex) {
		return question.selectedAnswer != null && ((question.selectedAnswer - 1) == optionIndex);
	}

	if (question == null) {
		return <></>;
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
						<label 
							key={index}
							className={['option', !isOptionSelected(index) ? '' : (question.isCorrect === true) ? 'correct-answer' : 'wrong-answer'].join(' ')}>
							
							<input type='radio' name='selected-answer' value={index + 1} 
								onChange={() => { setSelectedAnswer(questionIndex, index+1) }} 
								disabled={question.selectedAnswer != null} 
								checked={isOptionSelected(index)}
							/>

							<span dangerouslySetInnerHTML={{ __html: option}} ></span>
						</label>
					)
				}
			</div>
			<div className='hints-suggestion'>
				Need help with this problem? 
				<button className='hints-button' onClick={() => { setOpenHints(true) }}>
					<img src="/assets/head-idea.svg" alt="Thinking head icon" />
					<span>Ask AI</span>
				</button>
			</div>
		</div>
	);
}

export default Question