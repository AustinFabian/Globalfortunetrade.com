/* eslint-disable */
import axios from "axios";

var alertUs = document.querySelector(".err");

export const signup = async (
  name,
  userName,
  email,
  btcAddress,
  ethAddress,
  usdtAddress,
  password,
  passwordConfirm
) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/signup",
      data: {
        name,
        userName,
        email,
        btcAddress,
        ethAddress,
        usdtAddress,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === "Success") {
      window.setTimeout(() => {
        location.assign("/after-signup");
      }, 1000);
    }
  } catch (err) {
    var msg = err.response.data.message;
    console.log(msg);
    if (msg.includes("email_1 dup key")) {
      alertUs.textContent = "Email is already used";
    } else if (msg.includes("userName_1 dup key")) {
      alertUs.textContent = "user name is already used";
    } else if (msg.includes("passwords are not the same")) {
      alertUs.textContent = "Passwords do not match";
    } else if (msg.includes("is shorter than the minimum allowed length")) {
      alertUs.textContent = "Password is too short, less than 5 characters";
    } else {
      alertUs.textContent = err.response.data.message;
    }
    alertUs.style.display = "block";

    window.setTimeout(() => {
      alertUs.style.display = "none";
    }, 5000);
  }
};
