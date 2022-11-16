import { memo, useContext, useState } from 'react'
import PropTypes from 'prop-types'

import { Icon1 } from '../icon'

import classes from './Navigation.module.css'
import ContextProvider, { Context } from '../../../store/ContextProvider'
import { Box } from '../box'
import { Link } from 'react-router-dom'

function Navigation({ children }) {

    const context = useContext(Context)

    const handleSelect = event => {

        const element = event.target;

        const nav = element.parentElement.parentElement.parentElement

        let listNav = Array.from(nav.querySelectorAll('a'))

        let prevItem = listNav.find(item => item.parentElement.classList.contains(classes.selected)).parentElement;
        prevItem.classList.remove(classes.selected);

        element.classList.add(classes.selected);

        let currentIndex = listNav.findIndex(item => item === element)
        context.handleChangePage(currentIndex)
    }

    return (
        <nav className={classes.nav}>
            {children}
        </nav>
    )
}

Navigation.propTypes = {
    children: PropTypes.array,
}

export default Navigation
