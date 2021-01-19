const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/', adminController.adminList);

router.post('/add-item', adminController.itemCreatePost);

router.post('/add-subcategory', adminController.subcategoryCreatePost);

router.post('/add-category', adminController.categoryCreatePost);

router.post('/add-manufacturer', adminController.manufacturerCreatePost);

router.post('/edit-item/:id', adminController.itemUpdatePost);

router.post('/delete-item/:id', adminController.itemDeletePost);

router.post('/edit-subcategory/:id', adminController.subcategoryUpdatePost);

router.post('/delete-subcategory/:id', adminController.subcategoryDeletePost);

module.exports = router;
