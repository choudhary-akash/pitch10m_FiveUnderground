import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import '../styles/AskHints.css';
import { chat_completion } from '../util/chatgpt.js';
import Loader from '../components/Loader';
import { ThreeDots } from 'react-loader-spinner';

const AskHints = () => {
	const [conversation, setConversation] = useState([]);
	const [isAsking, setIsAsking] = useState(false);
	const location = useLocation();
	const inputRef = useRef(null);

	const { question } = location.state;

	async function handleInput(e) {
		e.preventDefault();
		let inputEl = inputRef.current;

		let input = inputEl.value;

		console.log(input);

		setIsAsking(true);

		setConversation(oldConversation => [...oldConversation, {role: 'user', content: input}]);

		inputEl.value = '';
	}

	useEffect(() => {
		console.log(conversation);

		if (conversation[conversation.length - 1]?.role === 'user') {
			console.log('Calling chat gpt...');
			chat_completion(conversation, { max_tokens: 1000 })
			.then(response => {
				setConversation(oldConversation => [...oldConversation, response.message]);
				setIsAsking(false);
				console.log('Set is asking to true...');
			});
		}
	}, [conversation]);

	useEffect(() => {
		let questionPrompt = `Question: [${question.questionText}]\n`;

		questionPrompt += 'Answer Options:\n';
		question.answerOptions.forEach(option => questionPrompt += `[${option}]\n`);
		
		let correctAnswerIndex = Number(question.correctAnswer) - 1;
		let correctAnswer = question.answerOptions[correctAnswerIndex];
		questionPrompt += `Correct Answer:\n${correctAnswer}`;
		
		questionPrompt += `Please guide me to solve this question by providing hints and asking about my approach, without revealing the correct option. Your first message should be 'What's your approach?'`;

		let startingConversation = [
			{
				role: "system",
				content: "You are a problem solving assistant. Your answers should be around 5 sentences long. You should not provide the user the solution directly even if they ask for it. You should ask the user for their approach and help them understand the correct approach."
			},
			{
				role: "user",
				content: questionPrompt
			},
			{
				role: "assistant",
				content: `What's your approach?`
			}
		];

		setConversation(startingConversation);
	}, []);

	return (
		<div className='conversation-container'>
			<div className="message-list">
				<div className="message-container">
					<div className="message bot-message">
						<img src="/assets/chatbot-outline.svg" className='assistant-icon' alt="Bot Icon" />
						<div>
							<h3 style={{marginTop: 0}}>Question</h3>
							<p className='question-text' dangerouslySetInnerHTML={{ __html: question.questionText} }>
							</p>
						</div>
					</div>
				</div>

				<div className="message-container">
					<div className="message bot-message">
						<img src="/assets/chatbot-outline.svg" className='assistant-icon' alt="Bot Icon" />

						<div>
							<p className='question-text'>
								Sure, I'd be happy to help you with this problem. First, can you please tell me your approach to solve this question?
							</p>
						</div>
					</div>
				</div>

				{
					conversation.slice(3, conversation.length).map(message => 
						<div className="message-container">
							<div className={`message ${message.role}-message`}>
								<img src={message.role == 'assistant' ? '/assets/chatbot-outline.svg' : '/assets/student-icon.svg'} className={`${message.role}-icon`} alt="Bot Icon" />
								<div>
									<p className='question-text'>
										{message.content}
									</p>
								</div>
							</div>
						</div>
					)
				}

				{
					isAsking && 
					<div className="message-container">
						<div className="message">
						<ThreeDots 
							height="30" 
							width="30" 
							radius="9"
							color="#3C8DCB" 
							ariaLabel="three-dots-loading"
							wrapperStyle={{}}
							wrapperClassName=""
							visible={true}
						/>

						</div>
					</div>
				}
			</div>

			<div className='input-container'>
				<form onSubmit={handleInput}>
					<input type="text" disabled={isAsking} className='ask-input' placeholder='Send message' ref={inputRef} />
				</form>
			</div>
		</div>
	)
}

export default AskHints