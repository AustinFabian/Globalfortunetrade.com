const express = require('express');
const authController = require('./../controllers/authController');
const roiController = require('./../controllers/roiController');

const router = express.Router();

router
.route('/')
// .get(roiController.getTours)
.post(authController.isLoggedIn,authController.restrictTo('admin'),roiController.createroi);

router
.route('/:id')
// .get(tourController.getTour)
.patch(authController.isLoggedIn
  ,authController.restrictTo('admin')
  ,roiController.updateroi)
.delete(authController.isLoggedIn
    ,authController.restrictTo('admin')
    ,roiController.deleteroi)

module.exports = router;