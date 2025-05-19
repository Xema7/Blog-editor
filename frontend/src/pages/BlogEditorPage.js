import React, { useState, useEffect, useRef } from 'react';
import API from '../api/api';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import '../styles/BlogEditorPage.css';

const BlogEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

const [blog, setBlog] = useState({ title: '', content: '', tags: '', status: 'draft' });
  const timeoutRef = useRef(null);

  // Fetch blog if editing
  useEffect(() => {
    if (id) {
      API.get(`/blogs/${id}`).then(({ data }) => {
        setBlog({
          title: data.title,
          content: data.content,
          tags: data.tags.join(', '),
          status: data.status,
        });
      });
    }
  }, [id]);

  // Auto-save
  useEffect(() => {
    const autoSave = () => saveDraft();

    const handleInput = () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(autoSave, 5000);
    };

    document.addEventListener('input', handleInput);
    const interval = setInterval(autoSave, 30000);

    return () => {
      document.removeEventListener('input', handleInput);
      clearInterval(interval);
      clearTimeout(timeoutRef.current);
    };
  }, [blog]);

  const handleChange = (field) => (e) => setBlog({ ...blog, [field]: e.target.value });

  const saveDraft = async () => {
    console.log("Save draft triggered");
    try {
      const payload = {
        ...blog,
        tags: blog.tags.split(',').map((t) => t.trim()),
        status: 'draft',
        ...(id && { id }),
      };
      console.log("Payload: ", payload);
      const res = await API.post('/blogs/save-draft', payload);
      if (!id) navigate(`/editor/${res.data._id}`);
      toast.info('Draft saved!');
    } catch {
      toast.error('Auto-save failed');
    }
  };

  const publishBlog = async () => {
    try {
      const payload = {
        title: blog.title,
        content: blog.content,
        tags: blog.tags.split(',').map((t) => t.trim()),
        ...(id && { id }),
      };
      await API.post('/blogs/publish', payload);
      toast.success('Blog published!');
      navigate('/home');
    } catch {
      toast.error('Publish failed!');
    }
  };

  return (
    <div className="container-main">
      <div className='container-blog'>
        <input type="text" className="title" placeholder="Title" value={blog.title} onChange={handleChange('title')} />
        <textarea className="textarea" placeholder="Content" rows={10} value={blog.content} onChange={handleChange('content')}></textarea>
        <input type="text" className="tags" placeholder="Tags (comma separated)" value={blog.tags} onChange={handleChange('tags')} />
      </div>
      <div className="btn">
        <button onClick={saveDraft}>Save Draft</button>
        <button onClick={publishBlog}>Publish</button>
      </div>
    </div>
  );
};

export default BlogEditorPage;
