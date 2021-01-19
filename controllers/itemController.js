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
    const errors = validationResult(req);

    const newComment = new Comment({
      author: req.body.author,
      content: req.body.content,
      rating: req.body.rating,
    });

    Item.findById(req.params.id)
      .populate('manufacturer')
      .populate('subcategory')
      .populate('comments')
      .exec(function (err, result) {
        if (err) {
          next(err);
        }

        if (!errors.isEmpty()) {
          res.render('itemDetail', {
            title: `${result.manufacturer.name} ${result.name}`,
            item: result,
            tab: 'comments',
            newComment: newComment,
            errors: errors.array(),
          });
          return;
        } else {
          newComment.save(function (err) {
            if (err) {
              next(err);
            }
            result.comments.push(newComment);
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
