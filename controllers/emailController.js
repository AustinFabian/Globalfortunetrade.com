const catchAsync = require("./../utils/catchAsync");
const User = require("./../model/userModel");
const Email = require("./../utils/supportEmails");

exports.sendMail = catchAsync(async (req, res, next) => {
  try {
    var admin = await User.findOne({ role: "admin" });

    var sender = {};

    sender.email = req.body.email;
    sender.name = req.body.name;
    sender.message = req.body.message;

    if (req.url === "/") {
      sender.registered = "Not registered User";
    } else {
      sender.registered = "Registered User";
    }

    await new Email(admin, sender).sendSupportEmail();

    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    console.log(`Email Error🔥🔥: ${err}`);
  }
});
