const fs = require('fs');
const path = require('path');

const Article = require('../models/article-model');
const Comment = require('../models/comment-model');

// render blogger article page
const articleDashboard = (request, response) => {
  Article.find({ blogger: request.session.blogger.username }, (err, articles) => {
    if (err) return console.log(err.message);

    response.render(path.join(__dirname, '../', 'views', 'account', 'article-page.ejs'), {
      blogger: request.session.blogger,
      articles
    });
  });
};

// find article by title, blogger username
const articleByTitle = (request, response) => {
  Article.findOne(
    {
      blogger: request.session.blogger.username,
      title: request.params.articleTitle
    },
    (err, article) => {
      if (err) return console.log('find article by ID: ' + err.message);

      if (!article)
        return response.render(
          path.join(__dirname, '..', 'views', 'error', '404-page.ejs')
        );

      Comment.find({ article: article._id }, (err, comments) => {
        if (err) return console.log('comments find: ' + err.message);

        response.render(
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

// edit article by title, blogger username
const articleEdit = (request, response) => {
  Article.findOneAndUpdate(
    {
      blogger: request.session.blogger.username,
      title: request.params.articleTitle
    },
    request.body,
    { new: true },
    (err, article) => {
      if (err) return console.log('update article: ' + err.message);

      if (!article)
        return response.render(
          path.join(__dirname, '..', 'views', 'error', '404-page.ejs')
        );

      response.send('updated');
    }
  );
};

// remove article by title, blogger username
const articleRemove = (request, response) => {
  Article.findOneAndDelete(
    {
      blogger: request.session.blogger.username,
      title: request.params.articleTitle
    },
    (err, article) => {
      if (err) return console.log('remove article: ' + err.message);

      if (!article)
        return response.render(
          path.join(__dirname, '..', 'views', 'error', '404-page.ejs')
        );

      fs.unlink(
        path.join(
          __dirname,
          '..',
          'public',
          'images',
          'articles',
          request.session.blogger.username,
          article.picture
        ),
        err => {
          if (err) return console.log('unlink picture(remove) ' + err.message);

          return response.send('deleted');
        }
      );
    }
  );
};

module.exports = {
  articleDashboard,
  articleByTitle,
  articleEdit,
  articleRemove
};
