const async = require('async');
const { body, validationResult } = require('express-validator');

const Item = require('../models/item');
const Subcategory = require('../models/subcategory');
const Category = require('../models/category');
const Manufacturer = require('../models/manufacturer');

exports.adminList = function (req, res, next) {
  async.parallel(
    {
      items: function (callback) {
        Item.find()
          .sort([['name', 'ascending']])
          .populate('manufacturer')
          .exec(callback);
      },
      subcategories: function (callback) {
        Subcategory.find()
          .sort([['name', 'ascending']])
          .populate('parentCategory')
          .exec(callback);
      },
      categories: function (callback) {
        Category.find()
          .sort([['name', 'ascending']])
          .exec(callback);
      },
      manufacturers: function (callback) {
        Manufacturer.find()
          .sort([['name', 'ascending']])
          .exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        next(err);
      }
      res.render('admin', {
        title: 'Admin controls',
        items: results.items,
        subcategories: results.subcategories,
        categories: results.categories,
        manufacturers: results.manufacturers,
      });
    },
  );
};

exports.itemCreatePost = [
  body('item-name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Name must be specified'),
  body('item-description')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Description must be specified'),
  body('item-price').escape().toInt(),
  body('item-stock').escape().toInt(),

  (req, res, next) => {
    const errors = validationResult(req);

    const newItem = new Item({
      name: req.body['item-name'],
      description: req.body['item-description'],
      subcategory: req.body['item-subcategory'],
      manufacturer: req.body['item-manufacturer'],
      price: req.body['item-price'],
      stock: req.body['item-stock'],
    });

    if (!errors.isEmpty()) {
      async.parallel(
        {
          items: function (callback) {
            Item.find()
              .sort([['name', 'ascending']])
              .populate('manufacturer')
              .exec(callback);
          },
          subcategories: function (callback) {
            Subcategory.find()
              .sort([['name', 'ascending']])
              .populate('parentCategory')
              .exec(callback);
          },
          categories: function (callback) {
            Category.find()
              .sort([['name', 'ascending']])
              .exec(callback);
          },
          manufacturers: function (callback) {
            Manufacturer.find()
              .sort([['name', 'ascending']])
              .exec(callback);
          },
        },
        function (err, results) {
          if (err) {
            next(err);
          }
          res.render('admin', {
            title: 'Admin controls',
            items: results.items,
            subcategories: results.subcategories,
            categories: results.categories,
            manufacturers: results.manufacturers,
            newItem: newItem,
            errors: errors.array(),
          });
          return;
        },
      );
    } else {
      newItem.save(function (err) {
        if (err) {
          next(err);
        }
        res.redirect(newItem.url);
      });
    }
  },
];
