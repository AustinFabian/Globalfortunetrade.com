const express = require("express");
const router = express.Router();
const viewController = require("./../controllers/viewController");
const authController = require("./../controllers/authController");

router.get("/", viewController.getOverview);
router.get("/login", viewController.getLogin);
router.get("/signup", viewController.getSignup);
router.get("/after-signup", viewController.getAfterSignup);
router.get("/about", viewController.getAbout);
router.get("/faqs", viewController.getFaqs);
router.get("/contact-us", viewController.getContact);
router.get("/terms", viewController.getTerms);
router.get("/plans", viewController.getPlans);
router.get("/dashboard", authController.isLoggedIn, viewController.getDash);
router.get("/deposit", authController.isLoggedIn, viewController.getDeposit);
router.get("/deposit-history", authController.isLoggedIn, viewController.getDepositHistory);
router.get("/earnings", authController.isLoggedIn, viewController.getEarningtHistory);
router.get("/withdraw-history", authController.isLoggedIn, viewController.getWithdrawtHistory);
router.get("/deposit-list", authController.isLoggedIn, viewController.getDepositList);
router.get("/profile", authController.isLoggedIn, viewController.getProfile);
router.get("/edit-account", authController.isLoggedIn, viewController.getProfile);
router.get("/transfer", authController.isLoggedIn, viewController.getTransfer);
router.get("/withdraw", authController.isLoggedIn, viewController.getWithdraw);
router.get("/referals", authController.isLoggedIn, viewController.getReferals);
router.get("/referallinks", authController.isLoggedIn, viewController.getTools);
router.get("/security", authController.isLoggedIn, viewController.getSecurity);
router.get("/invoice", authController.isLoggedIn, viewController.getInvoice);
router.get(
  "/createCoinAddress",
  authController.isLoggedIn,
  authController.restrictTo("admin"),
  viewController.getCreateCoin
);

router.get(
  "/roi",
  authController.isLoggedIn,
  authController.restrictTo("admin"),
  viewController.getRoi
);

router.get(
  "/transaction-history",
  authController.isLoggedIn,
  authController.restrictTo("admin"),
  viewController.getTransactions
);
router.get(
  "/users",
  authController.isLoggedIn,
  authController.restrictTo("admin"),
  viewController.getUserManager
);

router.get(
  "/airtime",
  authController.isLoggedIn,
  viewController.getUserAirtime
);

router.get("/fund", authController.isLoggedIn, viewController.getFundAccount);

router.get(
  "/loan-apply",
  authController.isLoggedIn,
  viewController.getLoanApply
);

router.get(
  "/order-card",
  authController.isLoggedIn,
  viewController.getOrderCard
);

router.get(
  "/international",
  authController.isLoggedIn,
  viewController.getInternational
);


router.get(
  "/all-notifications",
  authController.isLoggedIn,
  authController.restrictTo("admin"),
  viewController.getAllNotification
);

module.exports = router;
