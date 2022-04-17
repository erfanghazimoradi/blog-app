const express = require('express');
const router = express.Router();

const explore = require('../controllers/explore-controller');

// explore page
router.get('/', explore.articles);

// explore blogger article by title
router.get('/:username/:articleTitle', explore.article);

module.exports = router;
