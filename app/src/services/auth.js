import axios from "axios";
import { API_ENDPOINT } from "../constants/api";

const refreshToken = localStorage.getItem("refresh_token");

export async function HandleLogin(path, data) {
    return await axios.post(API_ENDPOINT + path, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
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
