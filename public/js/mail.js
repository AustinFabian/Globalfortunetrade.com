/* eslint-disable */
import axios from "axios";

var success = document.querySelector(".mailSuccess")

export const sendMail = async (data,who) => {
  const url = who === "" ? `/api/v1/emails` : `/api/v1/emails/${who}`;
  try {
    const res = await axios({
      method: "POST",
      url,
      data,
    });

    if (res.data.status === "success") {

      success.style.display = "block"
      window.setTimeout(() => {
        location.reload();
      }, 3000);
    }
  } catch (err) {
    console.log(err);
  }
};
