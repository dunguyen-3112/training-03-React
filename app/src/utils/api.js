import axios from "axios";

import { API_ENDPOINT } from "../constants/api";
import * as methods from "../constants/methods";
import { BAD_REQUEST, OK } from "../constants/statusCodes";

export async function makeRequest(method, path, data) {
  try {
    const accessToken = await getAccessToken();
    let response;
    if (accessToken) {
      switch (method) {
        case methods.GET:
          response = await axios.get(`${API_ENDPOINT}${path}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          return {
            data: response.data,
            status: response.status,
          };
        case methods.POST:
          response = await axios.post(`${API_ENDPOINT}${path}`, data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          });
          return {
            data: response.data,
            status: response.status,
          };
        case methods.PUT:
          response = await axios.put(`${API_ENDPOINT}${path}`, data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          });
          return {
            data: response.data,
            status: response.status,
          };
        case methods.DELETE:
          response = await axios.delete(`${API_ENDPOINT}${path}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          return {
            data: response.data,
            status: response.status,
          };
        default:
          return {
            status: BAD_REQUEST,
          };
      }
    }
  } catch (e) {
    return {
      status: BAD_REQUEST,
      message: e.message,
    };
  }
}

async function getAccessToken() {
  const refreshToken = localStorage.getItem("refresh_token");
  if (refreshToken) {
    const response = await axios.post(
      `${API_ENDPOINT}/token`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    if (response.status !== OK) {
      localStorage.clear();
      return;
    }
    return response.data.accessToken;
  }
  return;
}

export function create(path, data) {
  return makeRequest(methods.POST, path, data);
}

export function update(path, data) {
  return makeRequest(methods.PUT, path, data);
}

export function remove(path) {
  return makeRequest(methods.DELETE, path);
}

export function get(path) {
  return makeRequest(methods.GET, path);
}
