import React, { useEffect, useState } from 'react';
import API from '../api/api';
import BlogCard from '../components/BlogCard';
import { useNavigate } from 'react-router-dom';

const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await API.get('/blogs');
      setBlogs(res.data);
    } catch (error) {
      console.error('Failed to load blogs');
    }
  };

  return (
    <div>
    <div className="container">
      <h2>My Blogs</h2>
      <button onClick={() => navigate('/editor')}>New Blog</button>
      </div>
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogListPage;
