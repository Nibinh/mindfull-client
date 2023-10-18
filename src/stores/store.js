import { configureStore } from "@reduxjs/toolkit";
import getAuth from "./authSlice";
import getUser from "./userSlice";

export const store = configureStore({
  reducer: {
    auths: getAuth,
    users: getUser,
  },
});
