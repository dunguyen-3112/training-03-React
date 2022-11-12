import { useContext } from 'react'
import PropTypes from 'prop-types'

import classes from './Title.module.css'

import { Context } from '../../../store/ContextProvider'
import { themeToColor } from '../../../helpers/theme'

function Title({ text }) {

    const color = useContext(Context)

    const textColor = themeToColor(color)

    return (
        <h1
            className={`${classes.text} ${classes[textColor]}`}
        >
            {text}
        </h1>
    )
}

Title.propTypes = {
    text: PropTypes.string
}

export default Title