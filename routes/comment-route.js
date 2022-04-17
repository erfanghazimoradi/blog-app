const express = require('express');
const router = express.Router();

const comment = require('../controllers/comment-controller');

// create comment
router.post('/', comment.create);

// remove comment
router.delete('/:commentID', comment.remove);

module.exports = router;
