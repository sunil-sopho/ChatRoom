/**
 * Created by sunil on 3/10/17.
 */
var express = require('express');
var mainController = require('../controllers/MainController');
var router = express.Router();
var app = require('../../ApplicationInstance');


router.route('/').get(mainController.home);
router.route('/admin').get(mainController.admin);
router.route('/message').post(mainController.message);


module.exports = router;