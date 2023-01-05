import React, { useEffect } from "react";
import PropTypes from "prop-types";

import classes from "./LoginPage.module.sass";
import { FormLogin } from "./form-login";

import { Logo } from "../../components/ui/logo";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { response, error, isLoading } = useFetch("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });

    const handleLogin = (email, password) => {
        // setEmail(email)
        // setPassword(password)
        onLogin();
    };

    return (
        <main data-login="false" className={classes["login-page"]}>
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
        </main>
    );
};

LoginPage.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default LoginPage;
