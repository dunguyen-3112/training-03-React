import React from 'react'
import classes from './Button.module.css'

function Button({ children, onClick, style }) {
    return (
        <button onClick={onClick} className={classes.btn + " " + style}>
            {children}
        </button>
    )
}

export default Button