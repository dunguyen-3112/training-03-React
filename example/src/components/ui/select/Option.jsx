import React from 'react'
import classes from './Option.module.css'

function Option({ option }) {
    const { text, value } = option;
    return (
        <>
            <option className={classes.option} value={value}>{text}</option>
        </>
    )
}

export default Option