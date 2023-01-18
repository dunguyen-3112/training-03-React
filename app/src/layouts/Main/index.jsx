import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useLayoutEffect } from "react";

import ContextProvider from "@context";
import * as API from "@utils/api";
import { routes } from "@routes";
import { Notification } from "@components";
import { Header, Sidebar } from "..";
import { LOGIN_ROUTE, ME_ROUTE, OK } from "@constants";
import classes from "./index.module.sass";
import { TICKET_ROUTE } from "@src/constants";

function MainLayout() {
  const [page, setPage] = useState(1);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [notifi, setNotifi] = useState();
  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    async function refreshLogin() {
      const response = await API.get(ME_ROUTE);
      if (response?.status === OK) {
        const user = response.data;
        setUser(user);
        if (location.pathname === "/") navigate(`/${TICKET_ROUTE}`);
      } else navigate(`/${LOGIN_ROUTE}`);
    }
    user === null && refreshLogin();
  }, [user, page, navigate]);

  useLayoutEffect(() => {
    const timeID = setTimeout(() => {
      if (notifi?.time > 0)
        setNotifi((prev) => ({ ...prev, time: prev?.time - 1 }));
    }, 1000);
    return () => clearInterval(timeID);
  }, [notifi]);

  useEffect(() => {
    async function refreshLogin() {
      const response = await API.get(ME_ROUTE);
      if (response?.status === OK) {
        const user = response.data;
        setUser(user);
      } else navigate(`/${LOGIN_ROUTE}`);
    }
    user === null && refreshLogin();
  }, [user, navigate, setUser]);

  useLayoutEffect(() => {
    const timeID = setTimeout(() => {
      if (notifi?.time > 0)
        setNotifi((prev) => ({ ...prev, time: prev?.time - 1 }));
    }, 1000);
    return () => clearInterval(timeID);
  }, [notifi]);

  return (
    <ContextProvider
      value={{
        page,
        setPage,
        user,
        setUser,
        setNotifi,
        inputSearch,
        setInputSearch,
      }}
    >
      <main
        className={classes.main__container}
        data-authenticated={user !== null}
      >
        {user && (
          <>
            <Sidebar />
            <Header />
            <Notification
              type={notifi?.type}
              message={notifi?.message}
              time={notifi?.time || 0}
            />
          </>
        )}
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Routes>
      </main>
    </ContextProvider>
  );
}

export default MainLayout;
