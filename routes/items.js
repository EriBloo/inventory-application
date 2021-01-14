const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/', itemController.itemList);

router.get('/:id', itemController.itemDetail);

router.post('/:id', itemController.commentCreatePost);

module.exports = router;