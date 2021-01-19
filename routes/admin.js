const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/', adminController.adminList);

router.post('/add-item', adminController.itemCreatePost);

router.post('/add-subcategory', adminController.subcategoryCreatePost);

router.post('/add-category', adminController.categoryCreatePost);

router.post('/add-manufacturer', adminController.manufacturerCreatePost);

router.post('/edit-item/:id', adminController.itemUpdatePost);

module.exports = router;
