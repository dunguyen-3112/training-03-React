import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import React, { useCallback, useContext, useEffect } from "react";

import { Logo } from "@components/Uis";
import { API_ENDPOINT } from "@constants/api";
import FormLogin from "./FormLogin";
import classes from "./LoginPage.module.sass";
import { login } from "@src/services/auth";
import { Context } from "@context";
import { OK, TICKET_ROUTE } from "@src/constants";

export default function LoginPage() {
  const { user, setUser } = useContext(Context);
  const navigate = useNavigate();
  const handleLogin = useCallback(async (email, password) => {
    const accessToken = await login(email, password);
    if (accessToken) {
      const response = await axios.get(`${API_ENDPOINT}/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === OK) setUser(response.data);
    }
  }, []);

  useEffect(() => {
    if (user !== null) navigate(`/${TICKET_ROUTE}`);
  }, [user]);

  return (
    <section data-login="false" className={classes["login-page"]}>
      <header className={classes["header"]}>
        <Logo col />
        <h1 className={classes["header__title"]}>Log In to Dashboard Kit</h1>
        <h3 className={classes["header__subTitle"]}>
          Enter your email and password below
        </h3>
      </header>
      <FormLogin onLogin={handleLogin} />
      <footer className={classes.footer}>
        <span className={classes["footer__message"]}>
          Don&apos;t have an account?
        </span>
        <a href="/signup">Sign Up</a>
      </footer>
    </section>
  );
}

LoginPage.propTypes = {
  onLogin: PropTypes.func,
};
