import { useContext, memo } from 'react'
import PropTypes from 'prop-types'

import { Context } from '../../../store/ContextProvider'

import classes from './Switch.module.css'

function Switch({ onClick }) {

    const context = useContext(Context)

    return (
        <div className={`${classes.switch} ${classes[context.theme]}`} onClick={onClick}>
            <span className={classes[context.theme]}></span>
        </div>
    )
}

Switch.propTypes = {
    onClick: PropTypes.func
}

export default memo(Switch)
