import axios from "axios";

import { API_ENDPOINT } from "../constants/api";
import * as methods from "../constants/methods";

export async function makeRequest(method, path, data) {
    try {
        const accessToken = await getAccessToken();
        let response;
        if (accessToken) {
            switch (method) {
                case methods.GET:
                    response = await axios.get(`${API_URL}${path}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken.data.access_token}`,
                        },
                    });
                case methods.POST:
                    return axios.post(`${API_URL}${path}`, data, {
                        headers: {
                            Authorization: `Bearer ${accessToken.data.access_token}`,
                        },
                    });
                case methods.PUT:
                    return axios.put(`${API_URL}${path}`, data, {
                        headers: {
                            Authorization: `Bearer ${accessToken.data.access_token}`,
                        },
                    });
                case methods.DELETE:
                    return axios.delete(`${API_URL}${path}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken.data.access_token}`,
                        },
                    });
                default:
                    throw new Error(`Invalid method: ${method}`);
            }
        }
        return response.data;
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
    return makeRequest(methods.DELETE, path, data);
}

export function get(path) {
    return makeRequest(methods.GET, path, data);
}
