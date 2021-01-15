const { body, validationResult } = require('express-validator');

const Item = require('../models/item');
const Comment = require('../models/comment');

exports.itemList = function (req, res, next) {
  Item.find()
    .sort([['name', 'ascending']])
    .populate('subcategory')
    .populate('manufacturer')
    .populate('comments')
    .exec(function (err, result) {
      if (err) {
        return next(err);
      }
      res.render('itemList', {
        title: 'Browse all products',
        currentUrl: req.url,
        items: result.sort((a, b) => b.rating - a.rating),
      });
    });
};

exports.itemDetail = function (req, res, next) {
  Item.findById(req.params.id)
    .populate('manufacturer')
    .populate('subcategory')
    .populate('comments')
    .exec(function (err, result) {
      if (err) {
        return next(err);
      }
      res.render('itemDetail', {
        title: `${result.manufacturer.name} ${result.name}`,
        item: result,
      });
    });
};

exports.commentCreatePost = [
  body('author')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Author must be specified')
    .isAlphanumeric()
    .withMessage('Author contains non-alphanumeric characters'),
  body('content')
    .trim()
    .isLength({ min: 5 })
    .escape()
    .withMessage('Comment must be at least of length 5'),
  body('rating').escape().toInt(),

  (req, res, next) => {
    Item.findById(req.params.id)
      .populate('manufacturer')
      .populate('subcategory')
      .populate('comments')
      .exec(function (err, result) {
        if (err) {
          next(err);
        }
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          res.render('itemDetail', {
            title: `${result.manufacturer.name} ${result.name}`,
            item: result,
            tab: 'comments',
            newComment: req.body,
            errors: errors.array(),
          });
          return;
        } else {
          const comment = new Comment({
            author: req.body.author,
            content: req.body.content,
            rating: req.body.rating,
          });
          comment.save(function (err) {
            if (err) {
              next(err);
            }
            result.comments.push(comment);
            result.save(function (err) {
              if (err) {
                next(err);
              }
              res.render('itemDetail', {
                title: `${result.manufacturer.name} ${result.name}`,
                item: result,
                tab: 'comments',
              });
            });
          });
        }
      });
  },
];

exports.itemCreateGet = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Item create GET');
};

exports.itemCreatePost = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Item Create POST');
};

exports.itemDeleteGet = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Item Delete GET');
};

exports.itemDeletePost = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Item Delete POST');
};

exports.itemUpdateGet = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Item Update GET');
};

exports.itemUpdatePost = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Item Update POSTs');
};
