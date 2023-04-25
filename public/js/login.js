/* eslint-disable */
import axios from "axios";

var alertUs = document.querySelector(".sign-error");

export const login = async (userName, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/login",
      data: {
        userName,
        password,
      },
    });
    if (res.data.status === "Success") {
      // alertUs.style.background = "#4743c9";
      // alertUs.textContent = `Welcome Back ${res.data.data.user.login}`;
      // alertUs.style.display = "flex";
      window.setTimeout(() => {
        location.assign("/dashboard");
      }, 1000);
    }
  } catch (err) {
    $(".err").text(err.response.data.message);
    $(".err").fadeIn(5000,function () {
      $(".err").css({display: "none"})
    })
  }
};

// For logging  out users
export const logOut = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/users/logOut",
    });
    if (res.data.status === "Success") {
      location.reload(true);
      location.assign("/");
    }
  } catch (err) {
    showAlert("error", "Error logging out! Try again.");
  }
};
