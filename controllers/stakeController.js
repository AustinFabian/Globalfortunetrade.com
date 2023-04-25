const Transactions = require("./../model/transactionsModel");
const handler = require("./../controllers/handlerFactory");
const catchAsync = require("./../utils/catchAsync");
const User = require("./../model/userModel");
const AppError = require("./../utils/AppError");
const Email = require("./../utils/adminEmails");
const UserEmail = require("./../utils/email");

// createStake function
exports.createStake = catchAsync(async (req, res, next) => {
  var user = await User.findOne({ _id: req.body.userId });
  if(req.body.paymentFrom == "fromCrypto"){
    const doc = await Transactions.create({
      plan: req.body.plan,
      userId: req.body.userId,
      address: req.body.address,
      amount: req.body.amount,
      time: req.body.time,
      ROI: req.body.ROI,
      duration: req.body.duration,
      crypto: req.body.crypto,
      userEmail : req.body.userEmail
    });
  }else{

    var amount = req.body.amount;

    var sum = (user.balance -= amount);

      await User.findByIdAndUpdate(
        user.id,
        { balance: sum },
        {
          new: true,
        }
      );

    const doc = await Transactions.create({
      plan: req.body.plan,
      userId: req.body.userId,
      address: req.body.address,
      amount: req.body.amount,
      time: req.body.time,
      ROI: req.body.ROI,
      duration: req.body.duration,
      crypto: req.body.crypto,
      userEmail : req.body.userEmail
    });
  }

  const url = `${req.protocol}://${req.get("host")}/transaction-history`;

  var admin = await User.findOne({ role: "admin" });

  admin.newTransactionWallet = req.body.address;
  admin.paymentFrom = req.body.userEmail;
  admin.paymentTo = req.body.crypto;
  admin.paymentAmount = req.body.amount;

  await new Email(admin, url).sendNewTransaction();

  res.status(201).json({
    status: "success",
  });
});

// update Status function
exports.updateTransactionStatus = catchAsync(async (req, res, next) => {
  if (req.body.status === "successful") {

    var document = await Transactions.find({ _id: req.params.id });

    var documentStatus = document[0].status;

    if (documentStatus === req.body.status) {
      return next(new AppError("Transaction SuccessFul already", 404));
    }
  } else if (req.body.status === "rejected") {
    var document = await Transactions.find({ _id: req.params.id });

    var documentStatus = document[0].status;

    if (documentStatus === req.body.status) {
      return next(new AppError("Transaction Rejected already", 404));
    }
  } else if (req.body.status === "pending") {
    var document = await Transactions.find({ _id: req.params.id });

    var documentStatus = document[0].status;

    if (documentStatus === req.body.status) {
      return next(new AppError("Transaction pending already", 404));
    }
  }

  if (req.body.status === "successful") {
    var transaction = await Transactions.find({ _id: req.params.id });


    const doc = await Transactions.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    var user = await User.find({ _id: transaction[0].userId });

    var sum = (user[0].balance += transaction[0].amount);

    var userNewbalance = await User.findByIdAndUpdate(
      user[0].id,
      { balance: sum },
      {
        new: true,
      }
    );

    const url = `${req.protocol}://www.${req.get("host")}/operationStaking`;

    user[0].withdrawalAmount = transaction[0].amount;

    // Send success Mail to the User
    await new UserEmail(user[0], url).sendWithdrawalSuccessful();

    res.status(200).json({
      status: "success",
    });
  }

  if (req.body.status === "rejected") {
    var transaction = await Transactions.find({ _id: req.params.id });

    if (transaction[0].status === "successful") {
      var user = await User.find({ _id: transaction[0].userId });

      var sum = (user[0].balance -= transaction[0].amount);

      var userNewbalance = await User.findByIdAndUpdate(
        user[0].id,
        { balance: sum },
        {
          new: true,
        }
      );
    }
    // update
    const doc = await Transactions.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    const url = `${req.protocol}://www.${req.get("host")}/operationStaking`;

    user[0].withdrawalAmount = transaction[0].amount;

    // Send rejected Mail to the User
    await new UserEmail(user[0], url).sendWithdrawalRejected();

    res.status(200).json({
      status: "success",
    });
  }

  if (req.body.status === "pending") {
    var transaction = await Transactions.find({ _id: req.params.id });

    if (transaction[0].status === "successful") {
      var user = await User.find({ _id: transaction[0].transId });

      var sum = (user[0].balance -= transaction[0].equal);

      var userNewbalance = await User.findByIdAndUpdate(
        user[0].id,
        { balance: sum },
        {
          new: true,
        }
      );
    }
    // update
    const doc = await Transactions.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    const url = `${req.protocol}://www.${req.get("host")}/operationStaking`;

    user[0].withdrawalAmount = transaction[0].equal;

    // Send Pending Mail to the User
    await new UserEmail(user[0], url).sendWithdrawalPending();

    res.status(200).json({
      status: "success",
    });
  }
});

// delete stake function
exports.deleteTransaction = handler.deleteOne(Transactions);
