/* eslint-disable */
import axios from "axios";
const success = document.getElementById("popSuccess");
const alert = document.querySelector(".alert-danger");

export const newTransaction = async (data) => {
  
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/transactions",
      data
    });

    if (res.data.status === "success") {
      success.style.display = "block"
      window.setTimeout(() => {
        location.reload(true);
      }, 1000);
    }
  } catch (err) {
    console.log(err)
  }
};

// 
export const otpEmail = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/transactions/otp",
      data
    });

    // if (res.data.status === "success") {
    //   success.style.display = "block"
    //   window.setTimeout(() => {
    //     location.reload(true);
    //   }, 1000);
    // }

  } catch (err) {
    console.log(err)
  }
};

// Fund account Engine
export const fund = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/transactions",
      data
    });

    if (res.data.status === "success") {
      success.style.display = "block"
      window.setTimeout(() => {
        location.reload(true);
      }, 1000);
    }
  } catch (err) {
    console.log(err)
  }
};

// UPDATING TOUR ENGINE
export const updateStatus = async (Id, status,type) => {

  var url
  switch (type) {
    case "s":
      url = `/api/v1/stakes/${Id}`;
      break;
    case "w":
      url = `/api/v1/withdrawals/${Id}`;
      break;
    default:
      console.log("Not a transaction");
      break;
  }

  try {
    const res = await axios({
      method: "PATCH",
      url,
      data: {
        status,
      },
    });

    if (res.data.status === "success") {
      location.reload(true);
    }
  } catch (err) {
    alert.textContent = err.response.data.message
    alert.style.display = "flex";
    window.setTimeout(() => {
      alert.style.display = "none";
    }, 5000);
  }
};



// DELETING TRANSACTION ENGINE
export const deleteTransaction = async (Id) => {

  const url = `/api/v1/stakes/${Id}`;

  try {
    const res = await axios({
      method: 'DELETE',
      url
    });

    if(res.data.status === 'success'){
        location.reload(true)
    }
  } catch (err) {
    console.log('error',err.response.data.message);
  }
};
