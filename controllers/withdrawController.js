const Withdrawals = require("./../model/withdrawalsModel");
const handler = require("./../controllers/handlerFactory");
const catchAsync = require("./../utils/catchAsync");
const User = require("./../model/userModel");
const AppError = require("./../utils/AppError");
const Email = require("./../utils/adminEmails");
const UserEmail = require("./../utils/email");

// createWithdrawal function
exports.createWithdrawal = catchAsync(async (req, res, next) => {
  var user = await User.findOne({ _id: req.body.transactionId });
  const doc = await Withdrawals.create({
    transactionId: req.body.transactionId,
    userEmail: user.email,
    payment: req.body.payment,
    address: req.body.address,
    amount: req.body.amount,
    date: req.body.date,
  });

  const url = `${req.protocol}://${req.get("host")}/transactions`;

  var admin = await User.findOne({ role: "admin" });

  admin.newTransactionWallet = req.body.address;
  admin.paymentFrom = user.email;
  admin.paymentTo = req.body.payment;
  admin.paymentAmount = req.body.amount;

  await new Email(admin,url).sendNewWithdrawal();

  res.status(201).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

// update withdrawal Status function
exports.updateWithdrawalStatus = catchAsync(async (req, res, next) => {
  if (req.body.status === "successful") {
    var document = await Withdrawals.find({ _id: req.params.id });

    var documentStatus = document[0].status;

    if (documentStatus === req.body.status) {
      return next(new AppError("Transaction SuccessFul already", 404));
    }
  } else if (req.body.status === "rejected") {
    var document = await Withdrawals.find({ _id: req.params.id });

    var documentStatus = document[0].status;

    if (documentStatus === req.body.status) {
      return next(new AppError("Transaction Rejected already", 404));
    }
  } else if (req.body.status === "pending") {
    var document = await Withdrawals.find({ _id: req.params.id });

    var documentStatus = document[0].status;

    if (documentStatus === req.body.status) {
      return next(new AppError("Transaction pending already", 404));
    }
  }

  // when transaction is scuccesful

  if (req.body.status === "successful") {
    var withdrawal = await Withdrawals.find({ _id: req.params.id });

    const doc = await Withdrawals.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    var user = await User.find({ _id: withdrawal[0].transactionId });

    var sum = (user[0].balance -= withdrawal[0].amount);

    var userNewbalance = await User.findByIdAndUpdate(
      user[0].id,
      { balance: sum },
      {
        new: true,
      }
    );

    const url = `${req.protocol}://www.${req.get("host")}/operationsWithdrawal`;

    user[0].withdrawalAmount = withdrawal[0].amount;

    // Send success Mail to the User
    await new UserEmail(user[0]).sendWithdrawalSuccessful();
  }

  // when transaction is rejected

  if (req.body.status === "rejected") {
    var withdrawal = await Withdrawals.find({ _id: req.params.id });

    if (withdrawal[0].status === "successful") {
      var user = await User.find({ _id: withdrawal[0].transactionId });

      var sum = (user[0].balance += withdrawal[0].amount);

      var userNewbalance = await User.findByIdAndUpdate(
        user[0].id,
        { balance: sum },
        {
          new: true,
        }
      );
    }
    // update
    const doc = await Withdrawals.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    const url = `${req.protocol}://www.${req.get("host")}/operationsWithdrawal`;

    user[0].withdrawalAmount = withdrawal[0].amount;

    // Send rejected Mail to the User
    await new UserEmail(user[0]).sendWithdrawalRejected();
  }

  // when transaction is pended

  if (req.body.status === "pending") {
    var withdrawal = await Withdrawals.find({ _id: req.params.id });

    if (withdrawal[0].status === "successful") {
      var user = await User.find({ _id: withdrawal[0].transactionId });

      var sum = (user[0].balance += withdrawal[0].amount);

      var userNewbalance = await User.findByIdAndUpdate(
        user[0].id,
        { balance: sum },
        {
          new: true,
        }
      );
    }
    // update
    const doc = await Withdrawals.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    const url = `${req.protocol}://www.${req.get("host")}/operationsWithdrawal`;

    user[0].withdrawalAmount = withdrawal[0].amount;

    // Send Pending Mail to the User
    await new UserEmail(user[0]).sendWithdrawalPending();
  }

  res.status(200).json({
    status: "success",
  });
});


// delete withdrawal function
exports.deleteTransaction = handler.deleteOne(Withdrawals);