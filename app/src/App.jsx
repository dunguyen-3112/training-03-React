import { Routes, Route, useNavigate } from "react-router-dom";
import { React, useState, useEffect } from "react";

import ContextProvider from "@context/ContextProvider";
import Header from "@layouts/Header";
import SideBar from "@layouts/Sidebar";
import * as API from "@utils/api";
import { routes } from "@routes";
import { LOGIN_ROUTE, ME_ROUTE, OK, TICKET_ROUTE } from "./constants";

function App() {
  console.log("APP");
  const [page, setPage] = useState(0);
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
    user === null ? refreshLogin() : navigate(`/${TICKET_ROUTE}`);
  }, [user]);

  return (
    <ContextProvider value={{ page, setPage, user, setUser }}>
      <main className="flex" data-authenticated="true">
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
