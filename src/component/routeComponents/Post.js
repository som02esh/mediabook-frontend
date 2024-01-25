// CommentForm.js
import React, { useState } from 'react';

const Post = ({ addComment }) => {
  const [comment, setComment] = useState('');
  const host="https://mediabook-server.vercel.app"
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim() !== '') {
      try {
        const response = await fetch(host+'/api/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: comment }),
        });

        const data = await response.json();
        addComment(data.text);
        setComment('');
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        rows="4"
        cols="50"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Post;
