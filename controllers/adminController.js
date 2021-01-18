const async = require('async');

const Item = require('../models/item');
const Subcategory = require('../models/subcategory');
const Category = require('../models/category');
const Manufacturer = require('../models/manufacturer');

exports.adminList = function (req, res, next) {
  async.parallel(
    {
      items: function (callback) {
        Item.find().sort([['name', 'ascending']]).populate('manufacturer').exec(callback);
      },
      subcategories: function (callback) {
        Subcategory.find().sort([['name', 'ascending']]).populate('parentCategory').exec(callback);
      },
      categories: function (callback) {
        Category.find().sort([['name', 'ascending']]).exec(callback);
      },
      manufacturers: function (callback) {
        Manufacturer.find().sort([['name', 'ascending']]).exec(callback);
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
