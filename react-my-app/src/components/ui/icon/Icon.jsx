import PropTypes from 'prop-types'
import classes from './Icon.module.css'
import { memo } from 'react'

function Icon({ src, size, className }) {

    className = className || ''

    return (
        <figure className={`${size ? `${classes.icon} ${classes[`icon-${size}`]}` : classes.icon} ${className}`}>
            <img src={src} />
        </figure>
    )
}

Icon.propTypes = {
    src: PropTypes.string.isRequired,
    size: PropTypes.string,
    className: PropTypes.string
}

export default memo(Icon)
