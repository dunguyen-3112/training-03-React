import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import classes from "./LoginPage.module.sass";
import { FormLogin } from "./FormLogin";
import { Logo } from "../../components/Uis/Logo";
import { useState } from "react";

import * as API from "../../utils/api"
import { API_ENDPOINT } from "../../constants/api";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (email, password) => {
        console.log(email, password);
        let response = await API.create("/login", {
            email: email,
            password: password,
        });
        let data = response.data;
        localStorage.setItem("refresh_token", data.refresh_token);
        response = await axios.get(`${API_ENDPOINT}/users`, {
            headers: {
                Authorization: `Bearer ${data.access_token}`,
            },
        });
        data = response.data;
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/tickets");
    };

    return (
        <section data-login="false" className={classes["login-page"]}>
            <header className={classes["header"]}>
                <Logo col />
                <h1 className={classes["header__title"]}>
                    Log In to Dashboard Kit
                </h1>
                <h3 className={classes["header__subTitle"]}>
                    Enter your email and password below
                </h3>
            </header>
            <FormLogin onLogin={handleLogin} />
            <footer className={classes.footer}>
                <span className={classes["footer__message"]}>
                    Don't have an account?
                </span>
                <a href="/signup">Sign Up</a>
            </footer>
        </section>
    );
}
