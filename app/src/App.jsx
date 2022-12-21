import { React, useState, useEffect } from "react";
import "./App.css";
import ContextProvider from "./context/Context";
import { Navbar } from "./layouts/navbar";
import SideBar from "./layouts/sidebar/SideBar";
import { TicketPage } from "./pages/home-page";
import { LoginPage } from "./pages/login-page";

function App() {


    const [isLogin, setIsLogin] = useState(false)
    const [page, setPage] = useState(1)

    useEffect(() => {
        const _isLogin = localStorage.getItem('isLogin');

        setIsLogin(_isLogin === 'true');
    }, [isLogin])

    const handleLogout = () => {
        localStorage.setItem('isLogin', false);
        setIsLogin(false)
    }

    const handleLogin = () => {
        localStorage.setItem('isLogin', true)
        setIsLogin(true)
    };

    return (
        <ContextProvider value={{ isLogin, page, setPage }}>
            {isLogin ?
                <main data-login={isLogin}>
                    <SideBar />
                    <div className="main-container">
                        <Navbar handleLogout={handleLogout} />
                        <TicketPage />
                    </div>
                </main> :
                <LoginPage onLogin={handleLogin} />}
        </ContextProvider>
    );
}

export default App;
