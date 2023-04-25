const dotenv = require("dotenv");
const pug = require("pug");
const htmlToText = require("html-to-text");
dotenv.config({ path: "./../config.env" });

const nodemailer = require("nodemailer");

module.exports = class UserEmail {
  constructor(user) {
    this.to = user.email;
    this.from = "Support";
    this.user = user;

    // this.account = user.accountType;
    // this.accountNumber = user.accountNumber;
    // this.amount = user.transactionAmount;
    // this.type = user.transactionType;
    // this.bank = user.sentTo;
    // this.date = user.TransactionDate;
    // this.status = user.TransactionStatus;
    // this.sourceCode = user.sortCode;
    // this.recipient = user.recipient;
    // this.otp = user.otp;
  }

  newTransport() {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template

    var recieptDetails = {
      userName: this.user.userName,
      // amount: this.amount,
      // type: this.type,
      // bank: this.bank,
      // date: this.date,
      // status: this.status,
      // sortCode: this.sourceCode,
      // recipient: this.recipient,
    };

    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      recieptDetails,
      userName: this.user.name,
      password: this.user.password,
      user: this.user,
      // accountNumber: this.accountNumber,
      // account: this.account,
      // otp: this.otp,
      subject,
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions, (err, success) => {
      if (err) {
        console.log(err);
      } else {
        console.log("sent");
      }
    });
  }



  async sendWith(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      userName: this.user.name,
      user: this.user,
      url: this.url,
      subject,
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions, (err, success) => {
      if (err) {
        console.log(err);
      } else {
      }
    });
  }

  async sendWelcome() {
    await this.send("welcome", "Registration Complete");
  }

  async sendWithdrawalSuccessful() {
    await this.sendWith("withdrawSuccess", "Transaction Successful");
  }

  async sendWithdrawalRejected() {
    await this.sendWith("withdrawReject", "Transaction Rejected");
  }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Your password reset token (valid for only 10 minutes)"
    );
  }
};
