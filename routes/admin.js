const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/', adminController.adminList);

router.post('/add-item', adminController.itemCreatePost);

module.exports = router;
