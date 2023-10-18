import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  loading: "",
  filter: "",
  page: "",
  search: "",
  deleteMsg: "",
  addUserMsg: "",
  addUserError: "",
  user: "",
  editUserMsg: "",
};

// const GET_USER_URL = `http://localhost:8000`;
const GET_USER_URL = `https://mindfull-server.onrender.com`;

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ filter, page, search }) => {
    try {
      const response = await axios.get(`${GET_USER_URL}/user/getall`, {
        params: { sort: filter, page: page, search: search },
      });
      return response.data.users;
    } catch (err) {
      console.log(err.response);
      throw new Error(err.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  try {
    const response = await axios.delete(`${GET_USER_URL}/user/delete/` + id);
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err.response);
  }
});

export const addUsers = createAsyncThunk("users/addUsers", async (values) => {
  try {
    const response = await axios.post(`${GET_USER_URL}/user/add`, values);
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err.response);
    throw new Error(err.response.data);
  }
});

export const getUser = createAsyncThunk("users/getUser", async (id) => {
  try {
    const response = await axios.get(`${GET_USER_URL}/user/getuser/` + id);
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err.response);
    throw new Error(err.response.data);
  }
});

export const editUser = createAsyncThunk(
  "users/editUser",
  async ({ id, values }) => {
    try {
      const response = await axios.put(
        `${GET_USER_URL}/user/edit/` + id,
        values
      );
      console.log(response);
      return response.data;
    } catch (err) {
      console.log(err.response);
      throw new Error(err.response.data);
    }
  }
);

const getUserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    filterAdded(state, action) {
      state.filter = action.payload;
    },
    pageAdded(state, action) {
      state.page = action.payload;
    },
    searchAdded(state, action) {
      state.search = action.payload;
    },
    deleteMsgDis(state, action) {
      state.deleteMsg = "";
    },
    addUserMsgDis(state, action) {
      state.addUserMsg = "";
    },
    addUserErrorDis(state, action) {
      state.addUserError = "";
    },
    editUserMsgDis(state, action) {
      state.editUserMsg = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = "pending";
        console.log("penmding");
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = "fulfilled";

        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = "rejected";
        console.log("rejected", action.error);
        state.users = [];
      })
      .addCase(deleteUser.pending, (state) => {
        console.log("penmding");
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deleteMsg = action.payload;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        console.log("rejected", action.error);
      })
      .addCase(addUsers.pending, (state) => {
        console.log("penmding");
      })
      .addCase(addUsers.fulfilled, (state, action) => {
        state.addUserMsg = action.payload;
      })
      .addCase(addUsers.rejected, (state, action) => {
        console.log("rejected", action.error);
        state.addUserError = action.error.message;
      })
      .addCase(getUser.pending, (state) => {
        console.log("penmding");
      })
      .addCase(getUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state, action) => {
        console.log("rejected", action.error);
      })
      .addCase(editUser.pending, (state) => {
        console.log("penmding");
      })
      .addCase(editUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.editUserMsg = action.payload.message;
      })
      .addCase(editUser.rejected, (state, action) => {
        console.log("rejected", action.error);
      });
  },
});
export const {
  filterAdded,
  pageAdded,
  searchAdded,
  deleteMsgDis,
  addUserErrorDis,
  addUserMsgDis,
  editUserMsgDis,
} = getUserSlice.actions;

export default getUserSlice.reducer;
