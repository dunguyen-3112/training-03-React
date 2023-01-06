import axios from "axios";

import { API_ENDPOINT } from "../constants/api";
import * as methods from "../constants/methods";

export async function makeRequest(method, path, data) {
    try {
        if (path === "/logout") {
            const refreshToken = localStorage.getItem("refresh_token");
            return await axios.post(
                API_ENDPOINT + path,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${refreshToken}`,
                    },
                }
            );
        }
        const accessToken = await getAccessToken();
        if (path === "/login") {
            return await axios.post(API_ENDPOINT + path, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
        if (accessToken) {
            switch (method) {
                case methods.GET:
                    return await axios.get(`${API_ENDPOINT}${path}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken.data.access_token}`,
                        },
                    });
                case methods.POST:
                    return await axios.post(`${API_ENDPOINT}${path}`, data, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${accessToken.data.access_token}`,
                        },
                    });
                case methods.PUT:
                    return await axios.put(`${API_ENDPOINT}${path}`, data, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${accessToken.data.access_token}`,
                        },
                    });
                case methods.DELETE:
                    return await axios.delete(`${API_ENDPOINT}${path}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken.data.access_token}`,
                        },
                    });
                default:
                    throw new Error(`Invalid method: ${method}`);
            }
        }
    } catch (e) {
        return null;
    }
}

async function getAccessToken() {
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) {
        const accessToken = await axios.get(
            `${API_ENDPOINT}/token`,
            refreshToken
        );

        console.log(accessToken);
        return accessToken;
    }
    return null;
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
