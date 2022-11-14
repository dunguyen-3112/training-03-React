import { useContext } from 'react'
import PropTypes from 'prop-types'

import classes from './Title.module.css'

import { Context } from '../../../store/ContextProvider'
import { themeToColor } from '../../../helpers/theme'

function Title({ text, className }) {

    className = className || '';

    const context = useContext(Context)

    const textColor = themeToColor(context.theme)

    return (
        <h1
            className={`${classes.text} ${classes[textColor]} ${className}`}
        >
            {text}
        </h1>
    )
}

Title.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string,
}

export default Title