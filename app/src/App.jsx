import { React, useState, useEffect } from "react";
import "./App.css";
import ContextProvider from "./context/Context";
import { Navbar } from "./layouts/Navbar";
import SideBar from "./layouts/Sidebar/SideBar";

import { Routes, Route, useNavigate } from "react-router-dom";
import { routes } from "./routes/routes";
import { LoginPage } from "./pages/Login";
import { HandleLogout } from "./services/auth";

function App() {
    const [isAuthentication, setIsAuthentication] = useState(false);
    const index = routes.findIndex(
        (route) =>
            route.icon && route.path.includes(location.href.split("/").at(3))
    );
    const [page, setPage] = useState(index);
    const navigate = useNavigate();

    useEffect(() => {
        const refreshToken = localStorage.getItem("refresh_token");
        refreshToken && setIsAuthentication(true);
    }, [navigate, isAuthentication]);

    const handleLogin = () => {
        setIsAuthentication(true);
    };

    const handleLogout = async () => {
        const response = await HandleLogout();
        console.log(response);
        localStorage.clear();
        setIsAuthentication(false);
    };

    if (!isAuthentication) return <LoginPage onLogin={handleLogin} />;

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
