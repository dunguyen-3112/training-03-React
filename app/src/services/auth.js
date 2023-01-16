import axios from "axios";

import { LOGIN_ROUTE, OK, API_ENDPOINT } from "@constants";

export async function login(data) {
  try {
    const response = await axios.post(`${API_ENDPOINT}/${LOGIN_ROUTE}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === OK) {
      const data = response.data;
      localStorage.setItem("refresh_token", data.refreshToken);
      return response;
    }
  } catch (error) {
    const { response } = error;
    return response;
  }
}

export async function logout() {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    return await axios.post(
      API_ENDPOINT + "/logout",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
  } catch (error) {
    return error;
  }
}

export async function refresh() {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken === null) return;
    return await axios.post(
      API_ENDPOINT + "/token",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
  } catch (error) {
    return error;
  }
}
