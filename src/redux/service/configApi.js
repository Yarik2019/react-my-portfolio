import axios from "axios";

export const aquaDevApi = axios.create({
  baseURL: "https://aquadev-back.onrender.com",
  // baseURL: 'http://localhost:3000',

  headers: {
    "Content-Type": "application/json",
  },

  withCredentials: true,
});

export const setAuthHeader = (token) => {
  aquaDevApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};
