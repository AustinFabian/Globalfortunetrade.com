const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const User = require("./../model/userModel");
const Transactions = require("./../model/transactionsModel");
const Withdrawals = require("./../model/withdrawalsModel");
const Coins = require("./../model/coinAddressModel");
const Roi = require("./../model/roiModel");
const dotenv = require("dotenv");
dotenv.config({ path: "./../config.env" });

exports.getOverview = catchAsync(async (req, res, next) => {
  var rois = await Roi.find();

  res.status(200).render("index", {
    rois
  });
});

exports.getLogin = catchAsync(async (req, res, next) => {
  res.status(200).render("sign_in", {});
});

exports.getSignup = catchAsync(async (req, res, next) => {
  res.status(200).render("sign_up", {});
});

exports.getAfterSignup = catchAsync(async (req, res, next) => {
  res.status(200).render("after-signup", {});
});

exports.getAbout = catchAsync(async (req, res, next) => {
  res.status(200).render("about", {});
});

exports.getFaqs = catchAsync(async (req, res, next) => {
  res.status(200).render("faqs", {});
});

exports.getContact = catchAsync(async (req, res, next) => {
  res.status(200).render("contact-us", {});
});

exports.getTerms = catchAsync(async (req, res, next) => {
  res.status(200).render("terms", {});
});

exports.getPlans = catchAsync(async (req, res, next) => {
  res.status(200).render("plans", {});
});

exports.getDash = catchAsync(async (req, res, next) => {
  var allWithdrawal = await Withdrawals.find({ transactionId: req.user.id });
  var allTransaction = await Transactions.find({ userId: req.user.id });
  var pending = [];
  var pendingBalance = 0;
  var successful = [];
  var successBalance = 0;

  var transPending = [];

  var transSuccessful = [];
  var onBalance = 0;


  allWithdrawal.forEach(e => {
    if(e.status === "pending"){
      pending.push(e);
    }else if(e.status === "successful"){
      successful.push(e);
    }
  });

  allTransaction.forEach(e => {
    if(e.status === "pending"){
      transPending.push(e);
    }else if(e.status === "successful"){
      transSuccessful.push(e);
    }
  });

  pending.forEach(e => {
    var a = e.amount;
    pendingBalance += a;
  });

  successful.forEach(e => {
    var a = e.amount;
    successBalance += a;
  });

  transSuccessful.forEach(e => {
    var a = e.amount;
    onBalance += a;
  });
  

  res.status(200).render("dashboard", {
    pendingBalance,
    successBalance,
    onBalance
  });
});

exports.getDeposit = catchAsync(async (req, res, next) => {

  var rois = await Roi.find();
  var coins = await Coins.find();
  
  res.status(200).render("deposit", {
    rois,
    coins
  });
});

exports.getWithdraw = catchAsync(async (req, res, next) => {
  res.status(200).render("withdraw", {});
});

exports.getDepositHistory = catchAsync(async (req, res, next) => {
  res.status(200).render("deposit-history", {});
});

exports.getEarningtHistory = catchAsync(async (req, res, next) => {
  res.status(200).render("earning-history", {});
});

exports.getWithdrawtHistory = catchAsync(async (req, res, next) => {
  res.status(200).render("withdrawals", {});
});

exports.getDepositList = catchAsync(async (req, res, next) => {
  var rois = await Roi.find();
  var coins = await Coins.find();
  
  res.status(200).render("deposit-list", {
    rois,
    coins
  });
});

exports.getProfile = catchAsync(async (req, res, next) => {
  res.status(200).render("profile", {});
});

exports.getReferals = catchAsync(async (req, res, next) => {
  res.status(200).render("referals", {});
});

exports.getTools = catchAsync(async (req, res, next) => {
  res.status(200).render("tools", {});
});

exports.getSecurity = catchAsync(async (req, res, next) => {
  res.status(200).render("security", {});
});

exports.getInvoice = catchAsync(async (req, res, next) => {
  var allTransaction = await Transactions.find({ userId: req.user.id });
  var user = await User.findById(req.user.id);
  var transaction = allTransaction[allTransaction.length - 1];

  res.status(200).render("invoice", {
    user,
    transaction,
  });
});

exports.getCreateCoin = catchAsync(async (req, res, next) => {
  const coins = await Coins.find();
  res.status(200).render("createWallet", {
    coins,
  });
});

exports.getRoi = catchAsync(async (req, res, next) => {
  const rois = await Roi.find();
  res.status(200).render("roi", {
    rois,
  });
});

exports.getTransfer = catchAsync(async (req, res, next) => {
  var balance = req.user.balance;
  var line;
  var color;
  if (balance === 0) {
    line = 5;
    color = "red";
  } else {
    line = 70;
    color = "#f3cafd";
  }
  res.status(200).render("transfer", {
    line,
    color,
  });
});

exports.getUserAirtime = catchAsync(async (req, res, next) => {
  var balance = req.user.balance;
  var line;
  var color;
  if (balance === 0) {
    line = 5;
    color = "red";
  } else {
    line = 70;
    color = "#f3cafd";
  }
  res.status(200).render("airtime", {
    line,
    color,
  });
});

exports.getFundAccount = catchAsync(async (req, res, next) => {
  var balance = req.user.balance;
  var line;
  var color;
  if (balance === 0) {
    line = 5;
    color = "red";
  } else {
    line = 70;
    color = "#f3cafd";
  }
  res.status(200).render("fund", {
    line,
    color,
  });
});

exports.getTransactions = catchAsync(async (req, res, next) => {
  var allTransaction = await Transactions.find();
  var allWithdrawal = await Withdrawals.find()

  res.status(200).render("transactions", {
    allTransaction,
    allWithdrawal
  });
});

// LOAN PAGE RENDER

exports.getLoanApply = catchAsync(async (req, res, next) => {
  var balance = req.user.balance;
  var line;
  var color;
  if (balance === 0) {
    line = 5;
    color = "red";
  } else {
    line = 70;
    color = "#f3cafd";
  }
  res.status(200).render("loan", {
    line,
    color,
  });
});

exports.getOrderCard = catchAsync(async (req, res, next) => {
  res.status(200).render("order-credit-card", {});
});

exports.getInternational = catchAsync(async (req, res, next) => {
  var balance = req.user.balance;
  var line;
  var color;
  if (balance === 0) {
    line = 5;
    color = "red";
  } else {
    line = 70;
    color = "#f3cafd";
  }

  res.status(200).render("international", {
    line,
    color,
  });
});

exports.getAccount = catchAsync(async (req, res, next) => {
  var user = await User.findById(req.user.id);
  res.status(200).render("account", {
    user,
  });
});

exports.getUserManager = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).render("users", {
    users,
  });
});

exports.getUserData = catchAsync(async (req, res, next) => {
  const user = await User.find({ _id: req.params.id });

  var userData = user[0];

  res.status(200).render("userData", {
    userData,
  });
});

exports.getUserTransaction = catchAsync(async (req, res, next) => {
  const transactions = await Transactions.find({
    transactionId: req.params.id,
  });
  res.status(200).render("userTransactions", {
    transactions,
  });
});

exports.getAllNotification = catchAsync(async (req, res, next) => {
  const notifications = await Notifications.find();
  res.status(200).render("all-notification", {
    notifications,
  });
});
