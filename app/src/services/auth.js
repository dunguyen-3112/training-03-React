import axios from "axios";
import { API_ENDPOINT } from "../constants/api";

export async function HandleLogin(username, password) {
  const response = await axios.post(`${API_ENDPOINT}/login`, {
    username,
    password,
  });
  return response;
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
