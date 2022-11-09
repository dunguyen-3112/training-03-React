import React, { memo } from 'react'
import classes from './Header.module.css'

function Header() {
    console.log("rerender");
    return (
        <header className={classes.header}>
            <h1>React is easy!</h1>
        </header>
    )
}

export default memo(Header)