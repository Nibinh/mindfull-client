import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  logMsg: "",
  logError: "",
  logMail: "",
  logId: "",
  logfullDetails: "",
  regMsg: "",
  regError: "",
  regMail: "",
  regLoading: "",
  otpVerificationMsg: "",
  otpVerificationError: "",
  logoutMsg: "",
};

const GET_USER_URL = `http://localhost:8000`;

export const login = createAsyncThunk("auths/login", async (values) => {
  try {
    const response = await axios.post(`${GET_USER_URL}/auth/login`, values);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err.response);
    throw new Error(err.response.data);
  }
});

export const register = createAsyncThunk("auths/register", async (values) => {
  try {
    const response = await axios.post(`${GET_USER_URL}/auth/register`, values);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err.response);
    throw new Error(err.response.data);
  }
});

export const getAdminDetails = createAsyncThunk(
  "auths/getAdminDetails",
  async (id) => {
    try {
      const response = await axios.get(`${GET_USER_URL}/auth/getadmin/` + id);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err.response);
      throw new Error(err.response.data);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auths/verifyEmail",
  async (values) => {
    try {
      const response = await axios.post(
        `${GET_USER_URL}/auth/verifyotp`,
        values
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err.response);
      throw new Error(err.response.data);
    }
  }
);

export const AdminLogout = createAsyncThunk("auths/AdminLogout", async (id) => {
  try {
    const response = await axios.post(`${GET_USER_URL}/auth/logout`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err.response);
    throw new Error(err.response.data);
  }
});

const getAuthSlice = createSlice({
  name: "auths",
  initialState,
  reducers: {
    logErrorMsg(state, action) {
      state.logError = "";
    },
    logMsgDis(state, action) {
      state.logMsg = "";
    },
    regErrorMsg(state, action) {
      state.regError = "";
    },
    regMsgDis(state, action) {
      state.regMsg = "";
    },
    otpVerificationErrorMsg(state, action) {
      state.otpVerificationError = "";
    },
    otpVerificationMsgDis(state, action) {
      state.otpVerificationMsg = "";
    },
    logoutMsgDis(state, action) {
      state.logoutMsg = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, () => {
        console.log("pending");
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("fullfilled login", action.payload);
        state.logMsg = action.payload.message;
        state.logId = action.payload.id;
      })
      .addCase(login.rejected, (state, action) => {
        console.log("rejected login");
        state.logError = action.error.message;
        // state.logfullDetails=
      })
      .addCase(register.pending, (state) => {
        console.log("pending regster");
        state.regLoading = "pending";
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log("fullfilled register", action.payload);
        state.regMsg = action.payload.message;
        state.regMail = action.payload.mail;
        state.regLoading = "register";
      })
      .addCase(register.rejected, (state, action) => {
        console.log("rejected register");
        state.regError = action.error.message;
        state.regLoading = "rejected";
      })
      .addCase(verifyEmail.pending, (state) => {
        console.log("pending verifyEmail");
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        console.log("fullfilled verifyEmail", action.payload);
        state.otpVerificationMsg = action.payload;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        console.log("rejected verifyEmail");
        state.otpVerificationError = action.error.message;
      })
      .addCase(getAdminDetails.pending, (state) => {
        console.log("pending verifyEmail");
      })
      .addCase(getAdminDetails.fulfilled, (state, action) => {
        console.log("fullfilled getAdminDetails", action.payload);
        state.logfullDetails = action.payload;
      })
      .addCase(getAdminDetails.rejected, (state, action) => {
        console.log("rejected verifyEmail");
      })
      .addCase(AdminLogout.pending, (state) => {
        console.log("pending verifyEmail");
      })
      .addCase(AdminLogout.fulfilled, (state, action) => {
        console.log("fullfilled AdminLogout", action.payload);
        state.logoutMsg = action.payload;
      })
      .addCase(AdminLogout.rejected, (state, action) => {
        console.log("rejected verifyEmail");
      });
  },
});

export const {
  logErrorMsg,
  logMsgDis,
  regErrorMsg,
  regMsgDis,
  otpVerificationErrorMsg,
  otpVerificationMsgDis,
  logoutMsgDis,
} = getAuthSlice.actions;

export default getAuthSlice.reducer;
