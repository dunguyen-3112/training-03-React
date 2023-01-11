import axios from "axios";
import { API_ENDPOINT } from "../constants/api";

const refreshToken = localStorage.getItem("refresh_token");

export async function HandleLogin(username, password) {
  const response = await axios.post(`${API_ENDPOINT}/login`, {
    username,
    password,
  });
  const data = response.data;
  const refreshToken = data.refreshToken;
  const accessToken = data.accessToken;
  localStorage.setItem("refresh_token", refreshToken);
  return accessToken;
}

export async function HandleLogout() {
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

export async function HandleRefresh() {
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
