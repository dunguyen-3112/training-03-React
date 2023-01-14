import PropTypes from "prop-types";
import React, { useRef, useState, memo } from "react";

import { Input } from "@components/Forms";
import { Button } from "@components/Uis";
import classes from "./index.module.sass";

const FormLogin = ({ onLogin }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email && password) return onLogin(email, password);

    setEmail("");
    setPassword("");
    emailRef.current.focus();
  };

  return (
    <form className={`${classes["form-login"]} flex`}>
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

export default memo(FormLogin);
