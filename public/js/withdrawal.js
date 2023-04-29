/* eslint-disable */
import axios from "axios";
var success = document.querySelector(".success")

export const withdraw = async (transactionId, address,payment,amount,date) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/withdrawals",
      data: {
        transactionId,
        address,
        payment,
        amount,
        date
      },
    });

    if (res.data.status === "success") {
      success.style.display = "flex"
      window.setTimeout(() => {
        location.assign("/dashboard");
      }, 5000);
    }
  } catch (err) {
    console.log(err)
  }
};

// DELETING WthdrawTransaction ENGINE
export const deleteWithdraw = async (Id) => {

  const url = `/api/v1/withdrawals/${Id}`;

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
