const async = require('async');

const Category = require('../models/category');
const Subcategory = require('../models/subcategory');
const Item = require('../models/item');

exports.categoryList = function (req, res, next) {
  Category.find({}, 'name')
    .sort([['name', 'ascending']])
    .exec(function (err, result) {
      if (err) {
        next(err);
      }
      async.map(
        result,
        function (item, callback) {
          Subcategory.find({
            parentCategory: item._id,
          }).exec(callback);
        },
        function (err, results) {
          if (err) {
            next(err);
          }
          res.render('categoryList', {
            title: 'Browse categories',
            categories: result,
            subcategories: results,
          });
        },
      );
    });
};

exports.categoryDetail = function (req, res, next) {
  async.parallel(
    {
      category: function (callback) {
        Category.findById(req.params.id).exec(callback);
      },
      subcategories: function (callback) {
        Subcategory.find({ parentCategory: req.params.id })
          .sort([['name', 'ascending']])
          .exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        next(err);
      }
      async.concat(
        results.subcategories,
        function (item, callback) {
          Item.find({ subcategory: item._id })
            .populate('subcategory')
            .populate('manufacturer')
            .populate('comments')
            .exec(callback);
        },
        function (err, result) {
          if (err) {
            next(err);
          }
          res.render('itemList', {
            title: results.category.name,
            description: results.category.description,
            subcategories: results.subcategories,
            items: result.sort((a, b) => b.rating - a.rating),
          });
        },
      );
    },
  );
};

exports.categoryCreateGet = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Category create GET');
};

exports.categoryCreatePost = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Category Create POST');
};

exports.categoryDeleteGet = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Category Delete GET');
};

exports.categoryDeletePost = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Category Delete POST');
};

exports.categoryUpdateGet = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Category Update GET');
};

exports.categoryUpdatePost = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Category Update POSTs');
};
