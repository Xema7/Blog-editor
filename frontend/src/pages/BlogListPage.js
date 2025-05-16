import React, { useEffect, useState } from 'react';
import API from '../api/api';
import BlogCard from '../components/BlogCard';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);
  const { logout } = useAuth();
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
    <div className="container">
      <h2>My Blogs</h2>
      <button onClick={() => navigate('/editor')}>New Blog</button>
      <button onClick={logout}>Logout</button>
      <h3>Published</h3>
      {blogs.filter((b) => b.status === 'published').map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
      <h3>Drafts</h3>
      {blogs.filter((b) => b.status === 'draft').map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogListPage;
