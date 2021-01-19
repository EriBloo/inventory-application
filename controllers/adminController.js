const async = require('async');
const { body, validationResult } = require('express-validator');

const Item = require('../models/item');
const Subcategory = require('../models/subcategory');
const Category = require('../models/category');
const Manufacturer = require('../models/manufacturer');
const Comment = require('../models/comment');

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
      comments: [],
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

exports.subcategoryCreatePost = [
  body('subcategory-name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Name must be specified'),
  body('subcategory-description')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Description must be specified'),

  (req, res, next) => {
    const errors = validationResult(req);

    const newSubcategory = new Subcategory({
      name: req.body['subcategory-name'],
      description: req.body['subcategory-description'],
      parentCategory: req.body['subcategory-parent'],
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
            newSubcategory: newSubcategory,
            errors: errors.array(),
          });
          return;
        },
      );
    } else {
      newSubcategory.save(function (err) {
        if (err) {
          next(err);
        }
        res.redirect(newSubcategory.url);
      });
    }
  },
];

exports.categoryCreatePost = [
  body('category-name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Name must be specified'),
  body('category-description')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Description must be specified'),

  (req, res, next) => {
    const errors = validationResult(req);

    const newCategory = new Category({
      name: req.body['category-name'],
      description: req.body['category-description'],
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
            newCategory: newCategory,
            errors: errors.array(),
          });
          return;
        },
      );
    } else {
      newCategory.save(function (err) {
        if (err) {
          next(err);
        }
        res.redirect(newCategory.url);
      });
    }
  },
];

exports.manufacturerCreatePost = [
  body('manufacturer-name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Name must be specified'),

  (req, res, next) => {
    const errors = validationResult(req);

    const newManufacturer = new Manufacturer({
      name: req.body['manufacturer-name'],
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
            newManufacturer: newManufacturer,
            errors: errors.array(),
          });
          return;
        },
      );
    } else {
      newManufacturer.save(function (err) {
        if (err) {
          next(err);
        }
        res.redirect(newManufacturer.url);
      });
    }
  },
];

exports.itemUpdatePost = [
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

    const editItem = new Item({
      name: req.body['item-name'],
      description: req.body['item-description'],
      subcategory: req.body['item-subcategory'],
      manufacturer: req.body['item-manufacturer'],
      price: req.body['item-price'],
      stock: req.body['item-stock'],
      comments: [],
      _id: req.params.id,
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
            editItem: editItem,
            errors: errors.array(),
          });
          return;
        },
      );
    } else {
      Item.findByIdAndUpdate(
        req.params.id,
        editItem,
        {},
        function (err, updatedItem) {
          if (err) {
            next(err);
          }
          res.redirect(updatedItem.url);
        },
      );
    }
  },
];

exports.itemDeletePost = function (req, res, next) {
  Item.findById(req.params.id).exec(function (err, result) {
    if (err) {
      next(err);
    }
    if (result.comments.length > 0) {
      result.comments.map((comment) => {
        Comment.findByIdAndDelete(comment, {}, function (err) {
          if (err) {
            next(err);
          }
        });
      });
    }
    Item.findByIdAndDelete(req.params.id, {}, function (err) {
      if (err) {
        next(err);
      }
      res.redirect('/admin');
    });
  });
};
