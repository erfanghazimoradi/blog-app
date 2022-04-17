const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  blogger: {
    ref: process.env.BLOGGER_COLLECTION,
    type: String,
    required: true
  },
  bloggerAvatar: {
    type: String,
    required: true
  },
  article: {
    ref: process.env.BLOGGER_COLLECTION,
    type: mongoose.Types.ObjectId,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(process.env.COMMENT_COLLECTION, CommentSchema);
