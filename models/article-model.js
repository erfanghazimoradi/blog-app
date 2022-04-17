const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  blogger: {
    ref: process.env.BLOGGER_COLLECTION,
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    required: true,
    maxLength: 2147483647
  },
  picture: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(process.env.ARTICLE_COLLECTION, ArticleSchema);
