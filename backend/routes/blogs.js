// server/routes/blogs.js
const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// List with pagination
router.get('/', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1'));
    const limit = Math.max(1, parseInt(req.query.limit || '12'));
    const skip = (page - 1) * limit;
    const total = await Blog.countDocuments();
    const blogs = await Blog.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
    res.json({ blogs, page, pages: Math.ceil(total / limit), total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/recent', async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: 1 }) // newest first
      .limit(3)
      .lean();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single by slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug }).lean();
    if (!blog) return res.status(404).json({ message: 'Not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Protected create/update/delete (simple header token)
function requireAdmin(req, res, next) {
  if (process.env.ADMIN_TOKEN && req.headers['x-admin-token'] !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
}

router.post('/', requireAdmin, async (req, res) => {
  try {
    const b = new Blog(req.body);
    await b.save();
    res.status(201).json(b);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!blog) return res.status(404).json({ message: 'Not found' });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
