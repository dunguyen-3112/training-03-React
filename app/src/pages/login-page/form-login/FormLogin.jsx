import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import classes from "./FormLogin.module.sass";

import { Input } from "../../../components/form/input";
import { Button } from "../../../components/ui/button";

const FormLogin = ({ onLogin }) => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event) => {
        event.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (email && password) {
            onLogin(email, password);
        } else {
            emailRef.current.value = "";
            passwordRef.current.value = "";
            emailRef.current.focus();
        }
    };
    return (
        <form className={classes["form-login"]}>
            <Input
                message=""
                placeholder="Email address"
                title="Email"
                value={email}
                ref={emailRef}
                type="email"
                onChange={(event) => setEmail(event.target.value)}
            />
            <Input
                message=""
                placeholder="Password"
                title="Password"
                value={password}
                ref={passwordRef}
                type="password"
                onChange={(event) => setPassword(event.target.value)}
            />
            <Button onClick={handleLogin}>Log In</Button>
        </form>
    );
};

FormLogin.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default FormLogin;
