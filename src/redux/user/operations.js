import { createAsyncThunk } from "@reduxjs/toolkit";
import { errToast, successfullyToast } from "../../utils/toast.js";
import { aquaDevApi, setAuthHeader } from "../service/configApi.js";
import i18next from "i18next";

export const getAllUsersCount = createAsyncThunk(
  "user/getAllUsersCount",
  async (_, thunkAPI) => {
    try {
      const response = await aquaDevApi.get("/users/count");
      return response.data.usersAmount.usersAmount;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch users count"
      );
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async ({ credentials, navigate }, thunkApi) => {
    try {
      const { data } = await aquaDevApi.post("/users/register", credentials);
      if (data.status === 201) {
        successfullyToast(i18next.t("toast.registeredSuccess"));
        navigate("/signin");
      }
      return data;
    } catch (error) {
      if (error.status === 409) {
        errToast(i18next.t("toast.emailInUse"));
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "user/login",
  async (credentials, thunkApi) => {
    try {
      const { data } = await aquaDevApi.post("/users/login", credentials);

      if (data.status === 200) {
        setAuthHeader(data.data.accessToken);
        successfullyToast(i18next.t("toast.loggedInSuccess"));
      }

      return data.data.accessToken;
    } catch (error) {
      if (error.status === 404) {
        errToast(i18next.t("toast.noUser"));
        return thunkApi.rejectWithValue("No such user exists");
      }

      if (error.status === 401) {
        errToast(i18next.t("toast.invalidPwd"));
        return thunkApi.rejectWithValue("Invalid password");
      }
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async (_, thunkApi) => {
  try {
    const { data } = await aquaDevApi.post("/users/logout");
    if (data.status === 204) {
      setAuthHeader();
    }
    successfullyToast(i18next.t("toast.bye"));
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const updateUser = createAsyncThunk(
  "user/update",
  async (credentials, thunkApi) => {
    try {
      const { data } = await aquaDevApi.patch("/users/update", credentials, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      successfullyToast(i18next.t("toast.userUpdated"));

      return data.data;
    } catch (error) {
      const status = error.response?.status;
      const message =
        status === 404
          ? "User not found!"
          : status === 500
          ? "Server error. Please try again later."
          : error.response?.message || error.message;

      errToast(message);

      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getUserData = createAsyncThunk(
  "user/getDataUser",
  async (_, thunkApi) => {
    const token = thunkApi.getState().user.token;
    if (!token) {
      return thunkApi.rejectWithValue("Token not found");
    }

    setAuthHeader(token);
    try {
      const { data } = await aquaDevApi.get("/users/info");

      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  "user/refreshUser",
  async (_, thunkApi) => {
    try {
      const { data } = await aquaDevApi.post("/users/refresh");
      setAuthHeader(data.data.accessToken);
      return data.data.accessToken;
    } catch (error) {
      if (error.status === 401) {
        errToast(i18next.t("toast.noToken"));

        return thunkApi.rejectWithValue("Token not found");
      }
      return thunkApi.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const googleLoginUrl = createAsyncThunk(
  "user/googleLoginUrl",
  async (_, thunkApi) => {
    try {
      const response = await aquaDevApi.get("/users/auth/google/url");

      return response.data.data.url;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
