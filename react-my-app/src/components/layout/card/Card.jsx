import { useContext } from 'react'
import { Context } from '../../../store/ContextProvider'

import classes from './Card.module.css'

import PropTypes from 'prop-types';

function Card({ children, col }) {

    const context = useContext(Context)

    return (
        <div
            className={`${classes.card} ${col ? `${classes['card-column']}` : ''} ${classes[`card-${context.theme}`]}`}
        >
            {children}
        </div>
    )
}

Card.propTypes = {
    children: PropTypes.any,
    col: PropTypes.bool
}

export default Card