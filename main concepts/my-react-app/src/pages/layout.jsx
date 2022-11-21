import React from 'react'
import { Outlet, Link } from "react-router-dom";

function Layout() {
    return (
        <>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/contact'>Contact</Link>
            </nav>
            <Outlet />
        </>
    )
}

export default Layout