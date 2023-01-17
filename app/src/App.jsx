import { Routes, Route, useNavigate } from "react-router-dom";
import { React, useState, useEffect } from "react";

import ContextProvider from "@context/ContextProvider";
import Header from "@layouts/Header";
import SideBar from "@layouts/Sidebar";
import * as API from "@utils/api";
import { routes } from "@routes";
import { LOGIN_ROUTE, ME_ROUTE, OK, TICKET_ROUTE } from "./constants";
import { Notification } from "./components";
import { useLayoutEffect } from "react";

function App() {
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
        navigate(`/${TICKET_ROUTE}`);
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
      <main data-authenticated={user !== null}>
        {user && (
          <>
            <SideBar />
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

export default App;
