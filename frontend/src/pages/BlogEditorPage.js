import React, { useState, useEffect, useRef } from 'react';
import API from '../api/api';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const BlogEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('draft');
  const timeoutRef = useRef(null);

  // Fetch blog if editing
  useEffect(() => {
    if (id) {
      API.get(`/blogs/${id}`).then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
        setTags(res.data.tags.join(', '));
        setStatus(res.data.status);
      });
    }
  }, [id]);

  // Auto-save after 5s inactivity or every 30s
  useEffect(() => {
    const autoSave = () => {
      saveDraft();
    };

    const handleInput = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(autoSave, 5000);
    };

    document.addEventListener('input', handleInput);

    const interval = setInterval(autoSave, 30000);

    return () => {
      document.removeEventListener('input', handleInput);
      clearInterval(interval);
      clearTimeout(timeoutRef.current);
    };
  }, [title, content, tags]);

  const saveDraft = async () => {
    try {
      const data = { title, content, tags: tags.split(',').map((t) => t.trim()), status: 'draft' };
      if (id) {
        await API.post('/blogs/save-draft', { ...data, id });
      } else {
        const res = await API.post('/blogs/save-draft', data);
        navigate(`/editor/${res.data._id}`);
      }
      toast.info('Draft auto-saved!');
    } catch (error) {
      console.error('Auto-save failed', error);
    }
  };

  const publishBlog = async () => {
    try {
      const data = { title, content, tags: tags.split(',').map((t) => t.trim()) };
      await API.post('/blogs/publish', id ? { ...data, id } : data);
      toast.success('Blog published!');
      navigate('/');
    } catch (error) {
      toast.error('Publish failed!');
    }
  };

  return (
    <div className="container">
      <h2>Blog Editor</h2>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Content" rows={10} value={content} onChange={(e) => setContent(e.target.value)}></textarea>
      <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
      <div>
        <button onClick={saveDraft}>Save Draft</button>
        <button onClick={publishBlog}>Publish</button>
      </div>
    </div>
  );
};

export default BlogEditorPage;
