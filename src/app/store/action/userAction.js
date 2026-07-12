import axios from "@/app/utils/axios";
import {
  loginuser,
  logoutuser,
  iserror,
  removeerror,
  currentuser,
  editUser,
} from "../reducer/customerReducer";

// SEND OTP
export const sendOtp = (mobileNumber) => async (dispatch) => {
  try {
    dispatch(removeerror());

    const { data } = await axios.post("/user/send-otp", {
      mobileNumber,
    });

    return {
      success: true,
      payload: data,
    };
  } catch (error) {
    const message = error.response?.data?.message || "Failed to send OTP";

    dispatch(iserror(message));

    return {
      success: false,
      message,
    };
  }
};

// VERIFY OTP
export const verifyOtp =
  ({ mobileNumber, otp }) =>
  async (dispatch) => {
    try {
      dispatch(removeerror());

      const { data } = await axios.post("/user/verify-otp", {
        mobileNumber,
        otp,
      });

    if (data.token) {
  localStorage.setItem("userToken", data.token);
}
 console.log({data});

 console.log({user: data.admin});
 
 
dispatch(
  loginuser({
    user: data.admin,
    token: data.token,
  })
);
console.log("Login Action Dispatched");

      return {
        success: true,
        payload: data,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "OTP verification failed";

      dispatch(iserror(message));

      return {
        success: false,
        message,
      };
    }
  };
