const express = require('express');
const router = express.Router();

const admin = require('../controllers/admin-controller');

// admin panel
router.get('/', admin.panel);

// admin panel blogger articles
router.get('/:username', admin.bloggerArticles);

// admin panel blogger password recovery
router.patch('/:username', admin.passwordRecovery);

// admin panel blogger article direct remove
router.delete('/:username', admin.removeBlogger);

// admin panel blogger article remove
router.delete('/:username/:articleTitle', admin.articleRemove);

module.exports = router;
