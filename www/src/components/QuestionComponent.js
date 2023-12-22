import React, { useState } from 'react';
import CommentComponent from './CommentComponent';
import AnswerComponent from './AnswerComponent';

function QuestionComponent({ question, user }) {
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [answerBody, setAnswerBody] = useState('');

  const handleAnswerToggle = () => {
    setShowAnswerForm(!showAnswerForm);
  };

  const updateAnswer = async () => {
    const { REACT_APP_SERVER_HOST: host, REACT_APP_SERVER_PORT: port } = process.env;
    try { 
      const response = await fetch(`${host}:${port}/answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId: question.User.id, questionId: question.id, body: answerBody})
      });
      const data = await response.json();
      console.log(`New answer with id: ${data.result.id} was added.`)
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleSubmitAnswer = async () => {
    await updateAnswer();
    // Reset form and hide it
    setAnswerBody('');
    setShowAnswerForm(false);
  };
  const questionUsername = user.username ?? question.User.username
  return (
    <div className="question">
      <div dangerouslySetInnerHTML={{ __html: `<h2>${question.title}</h2>` }} />
      <div className="question-author">Asked by: {questionUsername}</div>
      <div dangerouslySetInnerHTML={{ __html: `<p>${question.body}</p>` }} />
      <strong>Score: {question.score}</strong>
      { question.Comments && 
        <div className="comments">
            {question.Comments.map((comment, index) => (
              <CommentComponent key={index} comment={comment} user={comment.User}/>
            ))}
        </div> 
      }
      { 
        question.Answers && 
        <div className="answers">
          {question.Answers.map((answer, index) => (
            <AnswerComponent key={index} answer={answer} user={answer.User}/>
          ))}
        </div>
      }
      <button onClick={handleAnswerToggle}>Provide Answer</button>
      
      {showAnswerForm && (
        <div>
          <textarea placeholder="Answer Body" value={answerBody} onChange={(e) => setAnswerBody(e.target.value)} />
          <button onClick={handleSubmitAnswer}>Submit Answer</button>
        </div>
      )}
    </div>
  );
}

export default QuestionComponent;