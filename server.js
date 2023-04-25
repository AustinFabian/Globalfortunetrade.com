const app = require("./app.js");
const mongoose = require("mongoose");
const Transaction = require("./model/transactionsModel");
const User = require("./model/userModel");
var cron = require("node-cron");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database Connected Successfully");
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, function () {
  console.log("App started at port 3000");
});

// UnhandledRejection handler
process.on("unhandledRejection", function (err) {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", function (err) {
  console.log(err.name, err.message);
  console.log("SIGTERM recieved 💥 Shutting down gracefully...");
  server.close(() => {
    console.log(" process terminated");
  });
});

var updateTransaction = async (req, res) => {
  try {
    // addPercentage function
    var addPercentage = async function (amount, userId, itemId) {
      var user = await User.find({ _id: userId });

      if (user.length > 0) {
        var payBack = user[0].balance + amount;
        await User.findByIdAndUpdate(
          userId,
          { balance: payBack},
          {
            new: true,
          }
        );

        await Transaction.findByIdAndUpdate(
          itemId,
          { status: "Payed"},
          {
            new: true,
          }
        );
      }
    };

    var allTransaction = await Transaction.find();

    var success = [];

    if (allTransaction.length > 0) {
      allTransaction.forEach((item) => {
        if (item.status === "successful") {
          success.push(item);
        }
      });
    }

    if (success.length > 0) {
      success.forEach((item) => {
        var transTime = new Date(item.time);
        var payHour = transTime.setHours(
          transTime.getHours() + parseInt(item.duration)
        );
        var payHour = new Date(payHour).toUTCString().slice(0, 19);
        var now = new Date().toUTCString().slice(0, 19);

        if (now == payHour) {
          var roi = (item.ROI / 100) * item.amount;
          addPercentage(roi, item.userId, item.id);
        }
      });
    }

    // console.log(`Schedule was ran today ${new Date()}`);
  } catch (err) {
    console.log(err);
  }
};

cron.schedule("*/15 * * * * *", updateTransaction);
