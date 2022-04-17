const path = require('path');

const Article = require('../models/article-model');
const Comment = require('../models/comment-model');

// find all articles
const articles = (request, response, next) => {
  Article.find({})
    .sort({ createdAt: -1 })
    .exec((err, articles) => {
      if (err) return console.log('explore articles ' + err.message);

      return response.render(
        path.join(__dirname, '..', 'views', 'explore', 'articles-page.ejs'),
        {
          blogger: request.session.blogger,
          articles
        }
      );
    });
};

// find article by blogger username, title
const article = (request, response, next) => {
  Article.findOne(
    { blogger: request.params.username, title: request.params.articleTitle },
    (err, article) => {
      if (err) return console.log('explore article ' + err.message);

      if (!article) return response.send('404: article not found!');

      // blogger find own article
      if (request.session.blogger && article.blogger === request.session.blogger.username)
        return response.redirect(`/account/article/${article.title}`);

      Comment.find({ article: article._id }, (err, comments) => {
        if (err) return console.log('comments find: ' + err.message);

        return response.render(
          path.join(__dirname, '..', 'views', 'account', 'article-detail-page.ejs'),
          {
            blogger: request.session.blogger,
            article,
            comments
          }
        );
      });
    }
  );
};

module.exports = { articles, article };
