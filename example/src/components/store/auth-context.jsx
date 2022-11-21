import React from 'react';
import { useState } from 'react';


const AuthContext = React.createContext({
    isLoggedIn: false,
    handlerLogin: (email, password) => { },
    handlerLogout: () => { }
});

export function AuthContextProvider(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'))
    const handlerLogin = (email, password) => {
        const check = email.localeCompare("admin") === 0 && password.localeCompare("admin") === 0;
        setIsLoggedIn(check);
        localStorage.setItem('isLoggedIn', check);
    }
    const handlerLogout = () => {
        localStorage.setItem("isLoggedIn", false);
        setIsLoggedIn(false);
    }
    return (
        <AuthContext.Provider
            value={{ isLoggedIn: isLoggedIn, handlerLogin: handlerLogin, handlerLogout: handlerLogout }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
