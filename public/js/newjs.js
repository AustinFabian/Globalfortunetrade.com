import "@babel/polyfill";
import { login } from "./login";
import { logOut } from "./login";
import { signup } from "./signup";
import { updateStatus } from "./transactions";
import { walletStake } from "./walletStake";
import { newWallet } from "./walletStake";
import { updateWallet } from "./walletStake";
import { deleteWallet } from "./walletStake";
import { createRoi } from "./walletStake";
import { deleteRoi } from "./walletStake";

import { newTransaction } from "./transactions";
import { updateSettings } from "./updateSettings";
import { updateUserData } from "./updateSettings";
import { sendMail } from "./mail";
import { deleteTransaction } from "./transactions";
import { deleteClient } from "./updateSettings";
import { notifyClient } from "./notifications";
import { deleteNotification } from "./notifications";
// import {deactivateSelf} from './updateSettings'

// DOM ELEMENTS
const loginForm = document.querySelector(".form--login");
const signupForm = document.querySelector(".form--signup");
const logOutBtn = document.querySelectorAll(".nav__el--logout");
const createCoinForm = document.querySelector(".form-create-coin");
const createRoiForm = document.querySelector(".form-create-roi");

const deposit = document.querySelector(".form-deposit");
const userUpdateForm = document.querySelector(".form-user-update");
const errorMsg = document.querySelector(".alertMsg-danger");
const alertMsg = document.querySelector(".alertMsg-danger");
const success = document.getElementById("popSuccess");
const userPasswordForm = document.getElementById("form-user-password");
const fundAccount = document.querySelector("#fund-account");
// -----------------------------------------------------
const support = document.querySelector(".contacts-form");

// DELEGATION

if (loginForm)
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const loginName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;
    login(loginName, password);
  });

if (signupForm)
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const userName = document.getElementById("userName").value;
    const email = document.getElementById("email").value;
    const confirmEmail = document.getElementById("confirmEmail").value;
    const btcAddress = document.getElementById("btcAddress").value;
    const ethAddress = document.getElementById("ethAddress").value;
    const usdtAddress = document.getElementById("usdtAddress").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    const check = document.getElementById("check");

    if (password !== passwordConfirm) {
      alert("Passwords do not match");
    } else if (email !== confirmEmail) {
      alert("Emails do not match");
    } else if (check.checked == false) {
      alert("To sign up you must agree to terms and conditions");
    } else {
      signup(
        name,
        userName,
        email,
        btcAddress,
        ethAddress,
        usdtAddress,
        password,
        passwordConfirm
      );
    }
  });

if (logOutBtn) {
  logOutBtn.forEach((element) => {
    element.addEventListener("click", logOut);
  });
}

if (createCoinForm)
  $(".create-coin").click(function () {
    var coinName = $("#coinName").val();
    var address = $("#coinAddress").val();

    if (coinName == "" || address == "") {
      alert("Input both coin name and coin address");
    } else {
      $(this).val("Creating....");
      newWallet(coinName, address);
    }
  });

$(".updateCoin").click(function () {
  var coinName = $(this).parent().siblings(".coinName").find("input").val();
  var address = $(this).parent().siblings(".address").find("input").val();
  var coinId = $(this).attr("coinId");

  updateWallet(coinName, address, coinId);
});

$(".deleteCoin").click(function () {
  var coinId = $(this).attr("coinId");
  deleteWallet(coinId);
});

if (createRoiForm)
  createRoiForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var planName = $("#planName").val();
    var roi = $("#roi").val();
    var duration = $("#duration").val();
    var minAmount = $("#max-amount").val();
    var maxAmount = $("#min-amount").val();

    createRoi(planName, roi, duration, minAmount, maxAmount);
  });

$(".updateROI").click(function () {
  var planName = $(this).parent().siblings(".plan").find("input").val();
  var roi = $(this).parent().siblings(".roi").find("input").val();
  var duration = $(this).parent().siblings(".duration").find("input").val();
  var minAmount = $(this).parent().siblings(".min-amount").find("input").val();
  var maxAmount = $(this).parent().siblings(".max-amount").find("input").val();
  var roiId = $(this).attr("ROIId");

  createRoi(planName, roi, duration, minAmount, maxAmount, roiId);
});

$(".deleteROI").click(function () {
  var roiId = $(this).attr("ROIId");
  deleteRoi(roiId);
});

// UPDATE USER
$(".updateUser").click(function () {
  var name = $(this).parent().siblings(".userName").find("input").val();
  var email = $(this).parent().siblings(".userEmail").find("input").val();
  var role = $(this)
    .parent()
    .siblings(".userRole")
    .find("input")
    .val()
    .toLowerCase();
  var password = $(this).parent().siblings(".userPassword").find("input").val();
  var balance = $(this).parent().siblings(".userBalance").find("input").val();
  var accNumber = $(this)
    .parent()
    .siblings(".accountNumber")
    .find("input")
    .val();
  var joined = $(this).parent().siblings(".joined").find("input").val();
  var trans = $(this).parent().siblings(".trans").find("input").val();
  var iD = $(this).attr("userId");

  var data = {
    login: name,
    email: email,
    password: password,
    passwordConfirm: password,
    role: role,
    balance: balance,
    accountNumber: accNumber,
    dateJoined: joined,
    transactions: trans,
  };
  updateUserData(iD, data);
});

// USER UPDATE PROFILE
if($(".userProfile"))
    $(".submit").click(function(){
      var name = $(".user-name").val();
      var address = $(".address").val();
      var city = $(".city").val();
      var state = $(".state").val();
      var zip = $(".zip").val();

      const select = document.getElementById("country");
      const country = select.options[select.selectedIndex].textContent;

      var passwordConfirm = $(".confirm-password").val();
      var password = $(".password").val();
      var btcAdress = $(".btc-adress").val();
      var ethAddress = $(".eth-address").val();
      var usdtAddress = $(".usdt-address").val();
      var email = $(".email").val();
      var id = $(this).attr("userId");
      
      if(password === passwordConfirm){
        var data = {name,address,city,state,zip,passwordConfirm,btcAdress,ethAddress,usdtAddress,email,country}
        updateUserData(id,data)
      }else{
        alert("Passwords are not the same")
      }
      
    })

$(".notification_dropdown").click(function () {
  $(".nav-link").addClass("nav-link-remove-dot");
});

// NOTIFY USER
$(".notify").click(function () {
  var id = $(this).attr("userId");
  var notification = $(this)
    .parent()
    .siblings(".notification")
    .find("textarea")
    .val();
  var img = $(this).attr("img");
  var login = $(this).attr("login");
  var data = {
    userId: id,
    createdAt: new Date().toUTCString(),
    notification: notification,
    userImg: img,
    userLogin: login,
  };

  notifyClient(data);
});

// DELETE NOTIFICATION
$(".delNot").click(function () {
  var iD = $(this).attr("mongoId");
  deleteNotification(iD);
});

// DELETE USER

$(".deleteUser").click(function () {
  var iD = $(this).attr("userId");
  deleteClient(iD);
});

// alertMsgS
$(".alertMsg-button").click(function () {
  if ($(this).parent().siblings().find("input").val("")) {
    alertMsg.textContent = "Please Fill every input";
    alertMsg.style.display = "flex";
    window.setTimeout(() => {
      alertMsg.style.display = "none";
    }, 7000);
  } else {
    success.style.display = "block";
    window.setTimeout(() => {
      location.reload(true);
    }, 1000);
  }
});

// FOR CREATING NEW deposit

if (deposit) {
  $(".details").click(function () {
    var plan = $(this).attr("plan");
    var amount = $(this).attr("amount");
    var ROI = $(this).attr("ROI");
    var duration = $(this).attr("duration");

    $(".depositDetails").attr("plan", plan);
    $(".depositDetails").attr("amount", amount);
    $(".depositDetails").attr("ROI", ROI);
    $(".depositDetails").attr("duration", duration);

    $(".toSpend").val(`${amount}.00`);

    $(".depositButton").removeAttr("disabled");
  });

  $(".wallet").click(function () {
    var crypto = $(this).attr("crypto");
    var address = $(this).attr("address");
    $(".depositDetails").attr("crypto", crypto);
    $(".depositDetails").attr("address", address);
    $(".depositDetails").attr("paymentFrom", "fromCrypto");
  });

  $(".fromBalance").click(function () {
    var userBalance = $(".depositDetails").attr("userBalance");
    var amount = $(".depositDetails").attr("amount");

    if(!$(".details").is(":checked")){
      alert("Choose a plan please")
      $(this).prop( "checked", false );
    }else{

      if(parseInt(userBalance) < parseInt(amount)){
        alert("Your Balance is less than amount")
        $(this).prop( "checked", false );
      }
      $(".depositDetails").attr("paymentFrom", "fromBalance");
    }

  });

  deposit.addEventListener("submit", function (e) {
    e.preventDefault();

    var plan = $(".depositDetails").attr("plan");
    var amount = $(".depositDetails").attr("amount");
    var ROI = $(".depositDetails").attr("ROI");
    var duration = $(".depositDetails").attr("duration");
    var userId = $(".depositDetails").attr("userId");
    var address = $(".depositDetails").attr("address");
    var crypto = $(".depositDetails").attr("crypto");
    var userEmail = $(".depositDetails").attr("userEmail");
    var depositFrom = $(".depositDetails").attr("paymentFrom");
    var time = new Date().toISOString();

    if (!$(".wallet").is(":checked") && !$(".fromBalance").is(":checked")) {
      alert("select payment method");
    } else {
      
        walletStake(plan, userId, address, amount, time, ROI, duration, crypto, userEmail,depositFrom);
  
    }
  });
}

// FOR RUND ACCOUNT
if (fundAccount) {
  fundAccount.addEventListener("submit", function (e) {
    e.preventDefault();

    var generalPin = 1234;

    var transId = this.getAttribute("transactionId");
    var transType = this.getAttribute("transactionType");
    var transUser = this.getAttribute("user");
    var userImg = this.getAttribute("image");
    var email = this.getAttribute("email");
    var amount = document.getElementById("amount").value;
    var pin = document.getElementById("pin").value;

    if (parseInt(pin) === generalPin) {
      var data = {
        transactionId: transId,
        type: transType,
        userName: transUser,
        userImg: userImg,
        userEmail: email,
        amount: amount,
      };
      newTransaction(data);
    } else {
      errorMsg.textContent = "Incorrect Pin";
      errorMsg.style.display = "flex";
      window.setTimeout(() => {
        errorMsg.style.display = "none";
      }, 5000);
    }
  });
}
// ***********************************

// CHANGE TRANSACTION STATUS
$(".status").click(function () {
  var id = $(this).attr("id");
  var state = $(this).text();

  updateStatus(id, state);
});

// DELETE TRANSACTION
$(".delete").click(function () {
  var id = $(this).attr("id");
  deleteTransaction(id);
  console.log(id);
});

if (userUpdateForm) {
  userUpdateForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const form = new FormData();
    form.append("login", document.getElementById("login").value);
    form.append("email", document.getElementById("email").value);
    form.append("id", document.getElementById("userId").getAttribute("userId"));
    form.append("photo", document.querySelector(".photo").files[0]);
    updateSettings(form, "data");
  });
}

// SUPPORT
if (support) {
  support.addEventListener("submit", function (e) {
    e.preventDefault();

    var email = document.getElementById("email").value;
    var name = document.getElementById("name").value;
    var message = document.getElementById("message").value;
    var who = "";

    
      sendMail({ email, name, message },who);
  });
}

// // FOR UPDATE PASSWORD
if (userPasswordForm) {
  userPasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();

    document.querySelector(".button--save-password").innerHTML = "UPDATING...";
    const passwordCurrent = document.getElementById("password-current").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.querySelector(".password-confirm").value;
    const id = document.getElementById("userId").getAttribute("userId");
    updateSettings(
      { passwordCurrent, password, passwordConfirm, id },
      "password"
    );
  });
}
