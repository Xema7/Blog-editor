const express = require('express');
const { saveDraft, publish, getAllBlogs, getBlogById } = require('../controllers/blogController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.post('/save-draft', saveDraft);
router.post('/publish', publish);
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);

module.exports = router;
