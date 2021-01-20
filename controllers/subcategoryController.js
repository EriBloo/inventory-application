const async = require('async');

const Subcategory = require('../models/subcategory');
const Item = require('../models/item');

exports.subcategoryDetail = function (req, res, next) {
  async.parallel(
    {
      subcategory: function (callback) {
        Subcategory.findById(req.params.subcatId)
          .populate('parentCategory')
          .exec(callback);
      },
      items: function (callback) {
        Item.find({ subcategory: req.params.subcatId })
          .populate('manufacturer')
          .populate('subcategory')
          .populate('comments')
          .exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        next(err);
      }
      res.render('itemList', {
        title: results.subcategory.parentCategory.name,
        subtitle: results.subcategory.name,
        description: results.subcategory.description,
        items: results.items.sort((a, b) => b.rating - a.rating),
      });
    },
  );
};

exports.subcategoryCreateGet = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Subcategory create GET');
};

exports.subcategoryCreatePost = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Subcategory Create POST');
};

exports.subcategoryDeleteGet = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Subcategory Delete GET');
};

exports.subcategoryDeletePost = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Subcategory Delete POST');
};

exports.subcategoryUpdateGet = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Subcategory Update GET');
};

exports.subcategoryUpdatePost = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Subcategory Update POSTs');
};
