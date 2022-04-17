const Comment = require('../models/comment-model');

// create comment
const create = (request, response, next) => {
  new Comment({
    blogger: request.session.blogger.username,
    bloggerAvatar: request.session.blogger.avatar,
    article: request.body.article,
    content: request.body.content
  }).save(err => {
    if (err) return console.log('save comment: ' + err.message);

    response.send('commented');
  });
};

// remove comment
const remove = (request, response, next) => {
  Comment.findByIdAndDelete({ _id: request.params.commentID }, (err, comment) => {
    if (err) return console.log('remove comment: ' + err.message);

    response.send('removed');
  });
};

module.exports = { create, remove };
