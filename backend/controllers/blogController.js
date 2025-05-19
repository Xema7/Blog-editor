const Blog = require('../models/Blog');

exports.saveDraft = async (req, res) => {
    try {
        const { id, title, content, tags } = req.body;
        const userId = req.userId;
        let blog;
        if (id) {
            blog = await Blog.findOneAndUpdate(
                { _id: id, userId },
                { title, content, tags, status: 'draft' },
                { new: true }
            );
        } else {
            blog = await Blog.create({
                userId,
                title,
                content,
                tags,
                status: 'draft',
            });
        }
        res.json(blog);
    } catch (err) {
        res.status(400).json({ error: 'Failed to save draft' });
    }
};



exports.publish = async (req, res) => {
    try {
        const { id, title, content, tags } = req.body;
        let blog;
        if (id) {
            blog = await Blog.findOneAndUpdate(
                { _id: id, userId: req.userId },
                { title, content, tags, status: 'published' },
                { new: true }
            );
        } else {
            blog = await Blog.create({
                userId: req.userId,
                title,
                content,
                tags,
                status: 'published',
            });
        }
        res.json(blog);
    } catch (err) {
        res.status(400).json({ error: 'Failed to publish blog' });
    }
};

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ userId: req.userId }).sort({ updatedAt: -1 });
        res.json(blogs);
    } catch (err) {
        res.status(400).json({ error: 'Failed to get blogs' });
    }
};

exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findOne({ _id: req.params.id, userId: req.userId });
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.json(blog);
    } catch (err) {
        res.status(400).json({ error: 'Failed to get blog' });
    }
};
