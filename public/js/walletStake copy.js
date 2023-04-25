/* eslint-disable */
import axios from "axios";

export const walletStake = async (transactionId, address, payment, amount,date,equal,percent,duration,img) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/stakes",
      data: {
        transactionId,
        address,
        payment,
        amount,
        date,
        equal,
        percent,
        duration,
        img
      },
    });

    if (res.data.status === "success") {
      window.setTimeout(() => {
        location.assign("/transaction");
      }, 1000);
    }
  } catch (err) {
    console.log(err)
  }
};

// DELETING StakeTransaction ENGINE
export const deleteStake = async (Id) => {

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
