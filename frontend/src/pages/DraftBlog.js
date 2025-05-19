import React, { useEffect, useState } from 'react';
import API from '../api/api';
import BlogCard from '../components/BlogCard';


const DraftBlog = () => {
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

  const draftBlogs = blogs.filter((b) => b.status === 'draft');

  return (
    <div className="container-blogs">
      <h3 style={{textAlign:"center"}}>Draft Blogs</h3>
      {draftBlogs.length > 0 ? (
      draftBlogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))
    ) : (
      <p>There is no draft blogs</p>
    )}
    </div>
  );
};

export default DraftBlog;
