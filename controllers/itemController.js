const Item = require('../models/item');

exports.itemList = function (req, res, next) {
  Item.find()
    .sort([['name', 'ascending']])
    .populate('subcategory')
    .populate('manufacturer')
    .exec(function (err, result) {
      if (err) {
        return next(err);
      }
      res.render('itemList', { title: 'Browse all items', currentUrl: req.url, items: result });
    });
};

exports.itemDetail = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Item Detail');
};

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
