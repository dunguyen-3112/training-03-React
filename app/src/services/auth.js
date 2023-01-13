import axios from "axios";

import { LOGIN_ROUTE, OK, API_ENDPOINT } from "@constants";

export async function login(username, password) {
  const response = await axios.post(`${API_ENDPOINT}/${LOGIN_ROUTE}`, {
    username,
    password,
  });
  if (response.status === OK) {
    const data = response.data;
    localStorage.setItem("refresh_token", data.refreshToken);
    return data.accessToken;
  }
  return null;
}

export async function logout() {
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
}

export async function refresh() {
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
}
