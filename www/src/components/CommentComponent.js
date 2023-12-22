function CommentComponent({ comment, user }) {
    return (
      <div className="comment">
        <div className="comment-author">Comment by: {user.username}</div>
        <div dangerouslySetInnerHTML={{__html: `<p>${comment.body}</p>` }}/>
      </div>
    );
  }
  
export default CommentComponent;