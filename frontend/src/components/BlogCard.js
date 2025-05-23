import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BlogCard.css';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  return (
    <div className="blog-card" onClick={() => navigate(`/editor/${blog._id}`)}>
      <h4>{blog.title}</h4>
      <p>{blog.content.substring(0, 100)}...</p>
      <div>
        <span>Status: {blog.status}</span>
      </div>
    </div>
  );
};

export default BlogCard;
