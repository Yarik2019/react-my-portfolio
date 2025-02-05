import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getAllUsersCount,
  logout,
  logIn,
  register,
  refreshUser,
  getUserData,
  updateUser,
} from "./operations";

const initialState = {
  isLoggedIn: false,
  user: {
    name: null,
    email: null,
    gender: null,
    weight: null,
    timeActive: null,
    dailyNorma: null,
    avatar: null,
  },
  usersCount: 0,
  token: null,
  isRefreshing: false,
  error: false,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload;
      })
      .addCase(logout.fulfilled, () => initialState)
      .addCase(getAllUsersCount.fulfilled, (state, action) => {
        state.usersCount = action.payload;
      })
      .addCase(refreshUser.rejected, () => initialState)
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
      })
      .addMatcher(
        isAnyOf(
          logIn.pending,
          register.pending,
          logout.pending,
          refreshUser.pending,
          getUserData.pending,
          getAllUsersCount.pending,
          updateUser.pending
        ),
        (state) => {
          state.isRefreshing = true;
          state.error = false;
        }
      )
      .addMatcher(
        isAnyOf(
          register.rejected,
          logIn.rejected,
          logout.rejected,
          getUserData.rejected,
          getAllUsersCount.rejected,
          updateUser.rejected
        ),
        (state) => {
          state.isRefreshing = false;
          state.error = true;
        }
      )
      .addMatcher(
        isAnyOf(
          register.fulfilled,
          logIn.fulfilled,
          logout.fulfilled,
          refreshUser.fulfilled,
          getUserData.fulfilled,
          getAllUsersCount.fulfilled,
          updateUser.fulfilled
        ),
        (state) => {
          state.isRefreshing = false;
          state.error = false;
        }
      );
  },
});

export const { setUser } = slice.actions;

export const userReducer = slice.reducer;
