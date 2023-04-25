const express = require("express");
const authController = require("./../controllers/authController");
const stakeController = require("./../controllers/stakeController");

const router = express.Router();

router
  .route("/")
  // .get(coinController.getTours)
  .post(authController.isLoggedIn, stakeController.createStake);

router
  .route("/:id")
  // .get(tourController.getTour)
  .patch(
    authController.isLoggedIn,
    authController.restrictTo("admin"),
    stakeController.updateTransactionStatus
  )
  .delete(
    authController.isLoggedIn,
    authController.restrictTo("admin"),
    stakeController.deleteTransaction
  );

module.exports = router;
