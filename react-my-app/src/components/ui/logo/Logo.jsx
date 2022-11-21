import PropTypes from 'prop-types'
import { memo } from 'react'

import classes from './Logo.module.css'

import { THEME_LIGHT } from '../../../constants'

function Logo({ src, size, title, theme }) {

    const className = theme.localeCompare(THEME_LIGHT) === 0 ? classes.logo_text : classes[`logo_text-light`]

    return (
        <figure className={classes.logo}>
            {src && <img
                src={src}
                alt={title}
                width={`${size}px`}
            />}
            <figcaption className={className}>{title}</figcaption>
        </figure>
    )
}

Logo.propTypes = {
    src: PropTypes.string,
    size: PropTypes.number,
    title: PropTypes.string.isRequired,
    theme: PropTypes.string
}

export default memo(Logo)
