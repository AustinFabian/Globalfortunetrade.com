/* eslint-disable */
import axios from "axios";

export const walletStake = async (
  plan,
  userId,
  address,
  amount,
  time,
  ROI,
  duration,
  crypto,
  userEmail,
  depositFrom
) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/stakes",
      data: {
        plan,
        userId,
        address,
        amount,
        time,
        ROI,
        duration,
        crypto,
        userEmail,
        depositFrom
      },
    });

    if (res.data.status === "success") {
      window.setTimeout(() => {
        location.assign("/invoice");
      }, 1000);
    }
  } catch (err) {
    console.log(err);
  }
};

// CREATING WALLET ENGINE
export const newWallet = async (coinName, address) => {
  const url = `/api/v1/coins`;

  try {
    const res = await axios({
      method: "POST",
      url,
      data: {
        coinName,
        address,
      },
    });

    if (res.data.status === "success") {
      location.reload();
    }
  } catch (err) {
    console.log("error", err.response.data.message);
  }
};

// CREATING WALLET ENGINE
export const createRoi = async (
  planName,
  roi,
  duration,
  minAmount,
  maxAmount,
  roiId
) => {

  var url = roiId == undefined ? `/api/v1/roi` : `/api/v1/roi/${roiId}`;

  var method = roiId == undefined ? "POST" : "PATCH";

  try {
    const res = await axios({
      method: method,
      url,
      data: {
        planName,
        roi,
        duration,
        minAmount,
        maxAmount,
      },
    });

    if (res.data.status === "success") {
      location.reload();
    }
  } catch (err) {
    console.log("error", err.response.data.message);
  }
};

// UPDATING WALLET ENGINE
export const updateWallet = async (coinName, address, coinId) => {
  const url = `/api/v1/coins/${coinId}`;

  try {
    const res = await axios({
      method: "PATCH",
      url,
      data: {
        coinName,
        address,
      },
    });

    if (res.data.status === "success") {
      location.reload(true);
    }
  } catch (err) {
    console.log("error", err.response.data.message);
  }
};

export const deleteRoi = async (ROIId) => {
  const url = `/api/v1/roi/${ROIId}`;

  try {
    const res = await axios({
      method: "DELETE",
      url,
    });

    if (res.data.status === "success") {
      location.reload(true);
    }
  } catch (err) {
    console.log("error", err.response.data.message);
  }
};

// DELETE USER ENGINE
export const deleteWallet = async (coinId) => {
  const url = `/api/v1/coins/${coinId}`;

  try {
    const res = await axios({
      method: "DELETE",
      url,
    });

    if (res.data.status === "success") {
      location.reload(true);
    }
  } catch (err) {
    console.log("error", err.response.data.message);
  }
};

// DELETING StakeTransaction ENGINE
export const deleteStake = async (Id) => {
  const url = `/api/v1/stakes/${Id}`;

  try {
    const res = await axios({
      method: "DELETE",
      url,
    });

    if (res.data.status === "success") {
      location.reload(true);
    }
  } catch (err) {
    console.log("error", err.response.data.message);
  }
};
