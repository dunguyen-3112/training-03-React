import PropTypes from 'prop-types'

import { memo } from 'react'

import classes from './Box.module.css'

function Box({ children, col, className }) {

    className = className || ''
    return (
        <div className={`${classes.box} ${col ? `${classes['box-column']}` : ''} ${className}`}>{children}</div>
    )
}

Box.propTypes = {
    children: PropTypes.node,
    col: PropTypes.bool,
    className: PropTypes.string,
}

export default memo(Box)
