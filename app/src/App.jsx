import { Routes, Route, useNavigate } from "react-router-dom";
import { React, useState, useEffect } from "react";

import ContextProvider from "@context/ContextProvider";
import Header from "@layouts/Header";
import SideBar from "@layouts/Sidebar";
import * as API from "@utils/api";
import { routes } from "@routes";
import { LOGIN_ROUTE, ME_ROUTE, OK } from "./constants";

function App() {
  const [page, setPage] = useState(1);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function refreshLogin() {
      const response = await API.get(`/${ME_ROUTE}`);
      if (response?.status === OK) {
        const user = response.data;
        setUser(user);
      } else navigate(`/${LOGIN_ROUTE}`);
    }
    user === null && refreshLogin();
  }, [user, page, navigate]);

  return (
    <ContextProvider value={{ page, setPage, user, setUser }}>
      <main data-authenticated={user !== null}>
        {user && (
          <>
            <SideBar />
            <Header />
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
