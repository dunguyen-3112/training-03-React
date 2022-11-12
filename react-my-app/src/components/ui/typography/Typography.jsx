import PropTypes from 'prop-types'
import { useContext } from 'react'

import classes from './Typography.module.css'

import { Context } from '../../../store/ContextProvider'
import { themeToColor } from '../../../helpers/theme'

function Typography({ text }) {

    const color = useContext(Context)

    const textColor = themeToColor(color)

    return (
        <p className={`${classes.text} ${classes[textColor]}`}>{text}</p>
    )
}

Typography.propTypes = {
    text: PropTypes.string
}

export default Typography
