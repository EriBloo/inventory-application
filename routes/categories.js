const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const subcategoryController = require('../controllers/subcategoryController');

router.get('/', categoryController.categoryList);

router.get('/:id', categoryController.categoryDetail);

router.get('/:catId/:subcatId', subcategoryController.subcategoryDetail);

module.exports = router;