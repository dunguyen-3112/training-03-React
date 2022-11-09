import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import classes from './Navigation.module.css'

function Navigation() {

    return (
        <>
            <nav className={classes.nav}>
                <Link className={classes.nav_item} to='/'>Home</Link>
                <Link className={classes.nav_item} to='/products'>Product</Link>
            </nav>
            <Outlet />
        </>
    )
}

export default Navigation