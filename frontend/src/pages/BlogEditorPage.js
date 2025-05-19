import React, { useState, useEffect, useRef } from 'react';
import API from '../api/api';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const BlogEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // const [title, setTitle] = useState('');
  // const [content, setContent] = useState('');
  // const [tags, setTags] = useState('');
  // const [status, setStatus] = useState('draft');
  // const timeoutRef = useRef(null);

  // // Fetch blog if editing
  // useEffect(() => {
  //   if (id) {
  //     API.get(`/blogs/${id}`).then((res) => {
  //       setTitle(res.data.title);
  //       setContent(res.data.content);
  //       setTags(res.data.tags.join(', '));
  //       setStatus(res.data.status);
  //     });
  //   }
  // }, [id]);

  // // Auto-save after 5s inactivity or every 30s
  // useEffect(() => {
  //   const autoSave = () => {
  //     saveDraft();
  //   };

  //   const handleInput = () => {
  //     if (timeoutRef.current) clearTimeout(timeoutRef.current);
  //     timeoutRef.current = setTimeout(autoSave, 5000);
  //   };

  //   document.addEventListener('input', handleInput);

  //   const interval = setInterval(autoSave, 30000);

  //   return () => {
  //     document.removeEventListener('input', handleInput);
  //     clearInterval(interval);
  //     clearTimeout(timeoutRef.current);
  //   };
  // }, [title, content, tags]);

  // const saveDraft = async () => {
  //   try {
  //     const data = { title, content, tags: tags.split(',').map((t) => t.trim()), status: 'draft' };
  //     if (id) {
  //       await API.post('/blogs/save-draft', { ...data, id });
  //     } else {
  //       const res = await API.post('/blogs/save-draft', data);
  //       navigate(`/editor/${res.data._id}`);
  //     }
  //     toast.info('Draft auto-saved!');
  //   } catch (error) {
  //     // console.error('Auto-save failed', error);
  //   }
  // };

  // const publishBlog = async () => {
  //   try {
  //     const data = { title, content, tags: tags.split(',').map((t) => t.trim()) };
  //     await API.post('/blogs/publish', id ? { ...data, id } : data);
  //     toast.success('Blog published!');
  //     navigate('/home');
  //   } catch (error) {
  //     toast.error('Publish failed!');
  //   }
  // };

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
    <div className="container">
      <h2>Blog Editor</h2>
      <input type="text" placeholder="Title" value={blog.title} onChange={handleChange('title')} />
      <textarea placeholder="Content" rows={10} value={blog.content} onChange={handleChange('content')}></textarea>
      <input type="text" placeholder="Tags (comma separated)" value={blog.tags} onChange={handleChange('tags')} />
      <div>
        <button onClick={saveDraft}>Save Draft</button>
        <button onClick={publishBlog}>Publish</button>
      </div>
    </div>
  );
};

export default BlogEditorPage;
