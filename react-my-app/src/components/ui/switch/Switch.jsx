import { useContext } from 'react'
import PropTypes from 'prop-types'

import { Context } from '../../../store/ContextProvider'

import classes from './Switch.module.css'
import { themeToColor } from '../../../helpers/theme'

function Switch({ onClick }) {

    const theme = useContext(Context)

    return (
        <div className={`${classes.switch} ${classes[theme]}`} onClick={() => onClick()}>
            <span className={classes[theme]}></span>
        </div>
    )
}

Switch.propTypes = {
    onClick: PropTypes.func
}

export default Switch
