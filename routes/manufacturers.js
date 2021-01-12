const express = require('express');
const router = express.Router();
const manufacturerController = require('../controllers/manufacturerController');

router.get('/', manufacturerController.manufacturerList);

router.get('/:id', manufacturerController.manufacturerDetail);

module.exports = router;