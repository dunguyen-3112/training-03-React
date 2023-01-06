import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./LoginPage.module.sass";
import { FormLogin } from "./FormLogin";
import { Logo } from "../../components/Uis/Logo";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    // const { response, error, isLoading } = useFetch("/login", {
    //     method: "POST",
    //     body: JSON.stringify({ email, password }),
    // });

    const handleLogin = (email, password) => {
        // setEmail(email)
        // setPassword(password)
        console.log("OK");
        navigate("/");
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
