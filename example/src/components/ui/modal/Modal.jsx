import React from 'react'
import Button from '../button/Button'
import classes from './Modal.module.css'

function Modal({ children }) {
    return (
        <div className={classes.modal}>
            <Button style={classes.btnClose}><span className={classes.iconClose}></span></Button>
            {children}
        </div>
    )
}

export default Modal