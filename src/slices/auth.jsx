import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

export const registerUser = createAsyncThunk(
  "/register",
  async ({ fullname, username, phone_number,  password }, thunkAPI) => {
    try {
      const result = await AuthService.register(fullname, username, phone_number,  password);
      return result;
    } catch (error) {
      const message =
        (error.result &&
          error.result.data &&
          error.result.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk(
  "/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const result = await AuthService.login(username, password);
      // return { user: result };
      return result ;
    } catch (error) {
      const message =
        (error.result &&
          error.result.data &&
          error.result.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk("/logout", async () => {
  await AuthService.logout();
});

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    [registerUser.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [registerUser.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
