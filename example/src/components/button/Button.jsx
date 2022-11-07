import React from 'react'
import classes from './Button.module.css'

function Button(props) {
    return (
        <button onClick={props.handleClick} className={classes.btn}>
            {props.children}
        </button>
    )
}

export default Button