const async = require('async');

const Manufacturer = require('../models/manufacturer');
const Item = require('../models/item');

exports.manufacturerList = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Manufacturers List');
};

exports.manufacturerDetail = function (req, res, next) {
  async.parallel(
    {
      manufacturer: function (callback) {
        Manufacturer.findById(req.params.id).exec(callback);
      },
      items: function (callback) {
        Item.find({ manufacturer: req.params.id })
          .populate('subcategory')
          .populate('manufacturer')
          .populate('comments')
          .exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        next(err);
      }
      res.render('itemList', {
        title: `Products by ${results.manufacturer.name}`,
        items: results.items.sort((a, b) => b.rating - a.rating),
      });
    },
  );
};

exports.manufacturerCreateGet = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Manufacturer create GET');
};

exports.manufacturerCreatePost = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Manufacturer Create POST');
};

exports.manufacturerDeleteGet = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Manufacturer Delete GET');
};

exports.manufacturerDeletePost = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Manufacturer Delete POST');
};

exports.manufacturerUpdateGet = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Manufacturer Update GET');
};

exports.manufacturerUpdatePost = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Manufacturer Update POSTs');
};
