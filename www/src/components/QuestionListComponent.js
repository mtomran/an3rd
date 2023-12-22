import QuestionComponent from "./QuestionComponent";
import React, { useState, useEffect } from 'react';

function QuestionListComponent({ userId }) {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the user data
    const { REACT_APP_SERVER_HOST: host, REACT_APP_SERVER_PORT: port } = process.env;
    fetch(`${host}:${port}/question`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setQuestions(data.result);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching question:', error);
        setLoading(false);
      });
    }, [userId]);

    if (isLoading) return <p>Loading...</p>;

    return (
      <div className="questions">
          <h2>Questions</h2>
          {questions.map((question, index) => (
            <QuestionComponent key={index} question={question} user={{userId: question.User.id, username: question.User.username}} />
          ))}
      </div>
    )
}

export default QuestionListComponent
