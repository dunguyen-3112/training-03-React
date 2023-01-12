import React from "react";
import PropTypes from "prop-types";

import classes from "./LoginPage.module.sass";
import { FormLogin } from "./FormLogin";
import { Logo } from "../../components/Uis/Logo";

import { API_ENDPOINT } from "../../constants/api";
import { HandleLogin } from "../../services/auth";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { OK } from "../../constants/statusCodes";

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    const responseLogin = await HandleLogin(email, password);
    if (responseLogin.status !== OK) return navigate("/not_found");
    const data = responseLogin.data;
    localStorage.setItem("refresh_token", data.refreshToken);
    const response = await axios.get(`${API_ENDPOINT}/users/${data.id}`, {
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
      },
    });

    const data1 = response.data;
    localStorage.setItem("user", JSON.stringify(data1));
    onLogin ? onLogin() : navigate("/tickets");
  };

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
