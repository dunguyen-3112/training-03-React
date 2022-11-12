import PropTypes from 'prop-types'
import { memo } from 'react'

import classes from './Button.module.css'

function Button({ children, onClick, color, bg, size }) {

    console.log("re-render", size)

    color = color || 'default'
    return (
        <button
            onClick={onClick}
            className={`${classes.btn} ${classes[`btn${bg ? '-bg' : ''}-${color}`]}`}
        >
            {children}
        </button>
    )
}

Button.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node,
    color: PropTypes.string,
    bg: PropTypes.bool,
    size: PropTypes.number
}

export default memo(Button)
