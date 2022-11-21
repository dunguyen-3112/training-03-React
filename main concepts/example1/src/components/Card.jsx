import React from 'react'
import './Card.css'

function Card({ className, children, onClick, id }) {

    const classes = `card${(className ? " " + className : "")}`;

    return (
        <div className={classes} data-id={id} onClick={onClick}>
            {children}
        </div>
    )
}

export default Card