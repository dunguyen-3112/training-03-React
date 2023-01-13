import PropTypes from "prop-types";
import React, { useRef, useState } from "react";

import { Input } from "@components/Forms";
import { Button } from "@components/Uis";
import classes from "./FormLogin.module.sass";

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
      setEmail("");
      setPassword("");
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
        inputRef={emailRef}
        type="email"
        onChange={(event) => setEmail(event.target.value)}
      />
      <Input
        message=""
        placeholder="Password"
        title="Password"
        value={password}
        inputRef={passwordRef}
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
