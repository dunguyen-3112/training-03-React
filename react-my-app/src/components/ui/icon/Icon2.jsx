import React from 'react'
import PropTypes from 'prop-types'

import classes from './Icon.module.css'

function Icon2({ icon, pos, width, height, }) {

    return (
        <i
            style={
                {
                    backgroundImage: `url(${icon})`,
                    backgroundPosition: `0 ${pos * width}px`,
                    width: `${width}px`,
                    height: `${height || width}px`
                }
            }
        ></i>
    )
}

Icon2.propTypes = {
    icon: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number,
    pos: PropTypes.number
}

export default Icon2
