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

    const publishedBlogs = blogs.filter((b) => b.status === 'published');

  return (
    <div className="container-blogs">
      <h3 style={{textAlign:"center"}}>Published Blogs</h3>
      {publishedBlogs.length > 0 ? (
        publishedBlogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))
    ) : (
      <p>There is no published blogs.</p>
    )
    }
    </div>
  );
};

export default PublishedBlog;
