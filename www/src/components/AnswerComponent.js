import CommentComponent from './CommentComponent';

function AnswerComponent({ answer, user }) {
    return (
      <div className="answer">
        <div className="answer-author">Answered by: {user.username}</div>
        <div dangerouslySetInnerHTML={{ __html: `<p>${answer.body}</p>` }}/>
        <strong>Score: {answer.score} | Accepted: {answer.accepted ? 'Yes' : 'No'}</strong>
        { answer.Comments && 
        <div className="comments">
            {answer.Comments.map((comment, index) => (
              <CommentComponent key={index} comment={comment} user={comment.User}/>
            ))}
        </div> 
      }
      </div>
    );
  }
 
export default AnswerComponent;