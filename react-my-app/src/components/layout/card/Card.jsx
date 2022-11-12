import { useContext } from 'react'
import { Context } from '../../../store/ContextProvider'

import classes from './Card.module.css'

import PropTypes from 'prop-types';

function Card({ children }) {

    const color = useContext(Context)

    return (
        <div className={`${classes.card} ${color}`}>{children}</div>
    )
}

Card.propTypes = {
    children: PropTypes.any
}

export default Card