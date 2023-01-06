import { React, useState, useEffect } from "react";
import "./App.css";
import ContextProvider from "./context/Context";
import { Navbar } from "./layouts/Navbar";
import SideBar from "./layouts/Sidebar/SideBar";

import { Routes, Route, useNavigate } from "react-router-dom";
import { routes } from "./routes/routes";
import { LoginPage } from "./pages/Login";
import * as API from "./utils/api";

function App() {
    const [isAuthentication, setIsAuthentication] = useState(false);
    const [page, setPage] = useState(1);

    const navigate = useNavigate();
    const refreshToken = localStorage.getItem("refresh_token");

    useEffect(() => {
        function getPage() {
            const href = location.href.split("/").at(-1);
            const index = routes.findIndex((route) =>
                route.path.includes(href)
            );
            setPage(index);
        }
        getPage();
        if (refreshToken === null) {
            return navigate("/login");
        }
        setIsAuthentication(true);
    }, [isAuthentication, refreshToken, navigate]);

    const handleLogout = async () => {
        const response = await API.create("/logout");
        console.log(response);
        localStorage.clear();
        setIsAuthentication(false);
    };

    if (!isAuthentication) return <LoginPage />;

    return (
        <ContextProvider value={{ isLogin: isAuthentication, page, setPage }}>
            <main className="main-container">
                <SideBar />
                <div className="main-section">
                    <Navbar handleLogout={handleLogout} />
                    <Routes>
                        {routes.map((route) => (
                            <Route key={route.path} {...route} />
                        ))}
                    </Routes>
                </div>
            </main>
        </ContextProvider>
    );
}

export default App;
