import PropTypes from 'prop-types'
import { memo } from 'react'

import classes from './Button.module.css'

function Button({ children, onClick, variant, size }) {

    variant = variant || 'default'
    size = size || 'sm'
    return (
        <button
            onClick={onClick}
            type="button"
            className={`${classes.btn} ${classes[`btn-${variant}`]} ${classes[`btn-${size}`]}`}
        >
            {children}
        </button>
    )
}

Button.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node,
    variant: PropTypes.string,
    size: PropTypes.string,
}

export default memo(Button)
