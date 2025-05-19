import React, { useEffect, useState } from 'react';
import API from '../api/api';
import BlogCard from '../components/BlogCard';


const PublishedBlog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await API.get('/blogs');
      console.log("Fetched blogs: ", res.data);
      setBlogs(res.data);
    } catch (error) {
      console.error('Failed to load blogs', error);
    }
  };
  return (
    // <div>
    <div className="container">
      <h3>Published</h3>
      {blogs.filter((b) => b.status === 'published').map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default PublishedBlog;
