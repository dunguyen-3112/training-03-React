import { memo, useContext } from 'react'
import PropTypes from 'prop-types'

import { Icon1 } from '../icon'

import classes from './Navigation.module.css'
import ContextProvider, { Context } from '../../../store/ContextProvider'
import { Box } from '../box'
import { useState } from 'react'

function Navigation({ children, src, size }) {

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
            <ContextProvider value={{ src, size, theme: context.theme, handle: handleSelect, page: context.page }}>
                {children}
            </ContextProvider>
        </nav>
    )
}

function Item({ pos, children }) {

    const context = useContext(Context)

    const [isHover, setIsHover] = useState(false)

    const handleMouseOver = () => {
        setIsHover(true)
    }

    const handleMouseLeave = () => {
        setIsHover(false)
    }

    return (
        <Box className={`${classes.navItem}  ${pos === context.page ? `${classes.selected}` : ''}`}>
            <a
                className={classes.navItem_link}
                onClick={context.handle}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
            >
                {children}
            </a>
            <Icon1
                src={context.src}
                size={context.size}
                pos={pos}
                className={classes.navItem_icon}
                isHover={isHover}
            />
        </Box>
    )
}

Item.propTypes = {
    pos: PropTypes.number.isRequired,
    children: PropTypes.string
}

Navigation.Item = memo(Item)

Navigation.propTypes = {
    children: PropTypes.array.isRequired,
    src: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
}

export default Navigation
