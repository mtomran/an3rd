import QuestionComponent from "./QuestionComponent";
import CommentComponent from "./CommentComponent";
import AnswerComponent from "./AnswerComponent";

import React, { useState, useEffect } from 'react';

function UserDataComponent({ userId }) {
  const [comments, setComments] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [user, setUser] = useState('');
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the user data
    fetch(`http://localhost:3001/user/${userId}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const { username, Questions, Answers, Comments} = data.result;
        setUser({ userId, username });
        setQuestions(Questions);
        setAnswers(Answers);
        setComments(Comments);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching question:', error);
        setLoading(false);
      });
    }, [userId]);

    if (isLoading) return <p>Loading...</p>;


    return (
      <div className="userData">
        <div className="questions">
          <h2>Questions</h2>
          {questions.map((question, index) => (
            <QuestionComponent key={index} question={question} user={user} />
          ))}
        </div>
        <div className="answers">
          <h2>Answers</h2>
          {answers.map((answer, index) => (
            <AnswerComponent key={index} answer={answer} user={user}/>
          ))}
        </div>
        <div className="comments">
          <h2>Comments</h2>
          {comments.map((comment, index) => (
            <CommentComponent key={index} comment={comment} user={user}/>
          ))}
        </div>
      </div>
    )
}

export default UserDataComponent
