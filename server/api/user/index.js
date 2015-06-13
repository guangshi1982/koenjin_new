'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id/token', controller.token);
router.post('/:id/purchases', controller.purchase);

module.exports = router;