import { React, useState, useEffect } from "react";
import "./App.css";
import ContextProvider from "./context/Context";
import { Navbar } from "./layouts/Navbar";
import SideBar from "./layouts/Sidebar/SideBar";

import { Routes, Route, useNavigate } from "react-router-dom";
import { routes } from "./routes/routes";
import { LoginPage } from "./pages/Login";

function App() {
    const [isAuthentication, setIsAuthentication] = useState(true);
    const [page, setPage] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthentication) {
            return navigate("/");
        }
        return navigate("/login");
    }, [isAuthentication]);

    // const handleLogout = () => {
    //     localStorage.setItem("isLogin", false);
    //     setIsLogin(false);
    // };

    // const handleLogin = () => {
    //     localStorage.setItem("isLogin", true);
    //     setIsLogin(true);
    // }

    if (!isAuthentication) return <LoginPage />;

    return (
        <ContextProvider value={{ isLogin: isAuthentication, page, setPage }}>
            <main className="main-container">
                <SideBar />
                <div className="main-section">
                    <Navbar />
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
