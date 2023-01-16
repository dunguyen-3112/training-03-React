import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import React, { useCallback, useContext, useEffect } from "react";

import { Logo } from "@components";
import { API_ENDPOINT } from "@constants/api";
import { FormLogin } from "./components";
import classes from "./index.module.sass";
import { login } from "@services/auth";
import { Context } from "@context";
import {
  OK,
  TICKET_ROUTE,
  BAD_REQUEST,
  UNAUTHORIZED,
  MESSAGE_LOGIN_BAD_REQUEST,
  MESSAGE_LOGIN_UNAUTHORIZED,
} from "@constants";
import { ME_ROUTE } from "@src/constants";

export default function LoginPage() {
  const { user, setUser } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) navigate(`/${TICKET_ROUTE}`);
  }, [navigate, user]);

  const handleLogin = useCallback(
    async (email, password) => {
      const responseLogin = await login(email, password);
      if (responseLogin.status === BAD_REQUEST) {
        return { email: MESSAGE_LOGIN_BAD_REQUEST };
      }
      if (responseLogin.status === UNAUTHORIZED) {
        return { password: MESSAGE_LOGIN_UNAUTHORIZED };
      }

      const { accessToken } = responseLogin.data;
      const responseMe = await axios.get(`${API_ENDPOINT}/${ME_ROUTE}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (responseMe.status !== OK) {
        console.log("Please check internet connection of your!");
      }
      const user = responseMe.data;
      setUser(user);
    },
    [setUser]
  );

  return (
    <section className={classes["login-page"]}>
      <header className={classes["header"]}>
        <Logo col />
        <h1 className={classes["header__title"]}>Log In to Dashboard Kit</h1>
        <h3 className={classes["header__subTitle"]}>
          Enter your email and password below
        </h3>
      </header>
      <FormLogin onSubmit={handleLogin} />
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
