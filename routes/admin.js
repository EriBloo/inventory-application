const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');
const manufacturerController = require('../controllers/manufacturerController');
const subcategoryController = require('../controllers/subcategoryController');
const categoryController = require('../controllers/categoryController');

router.get('/', function (req, res, next) {
  res.render('admin');
});

module.exports = router;
