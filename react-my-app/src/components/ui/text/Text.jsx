import React from 'react'
import PropTypes from 'prop-types'

import classes from './Text.module.css'
import { memo } from 'react'

function Text(
    {
        type,
        size,
        fontWeight,
        dark,
        light,
        children
    }
) {



    const classList = [classes.text]

    dark && classList.push(classes.dark)
    light && classList.push(classes.light)


    classList.push(classes["text" +
        `${size ?
            `-${size}`
            : ''
        }` +
        `${fontWeight ?
            `-${fontWeight}` :
            ''
        }`])


    const element = React.createElement(type || 'p', { className: classList.join(" ") }, children)

    return (
        <>
            {element}
        </>
    )
}

Text.propTypes = {
    type: PropTypes.string,
    size: PropTypes.number,
    fontWeight: PropTypes.number,
    children: PropTypes.string,
    dark: PropTypes.bool,
    light: PropTypes.bool,
}


export default memo(Text)
