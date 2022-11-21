import { useState, useContext, memo } from 'react'

import PropTypes from 'prop-types'
import { Button } from '../button'
import ContextProvider, { Context } from '../../../store/ContextProvider'

import classes from './DropDown.module.css'

function DropDown({ children }) {

    const [isDown, setIsDown] = useState(false);

    const handleDown = (event) => {
        event.preventDefault();

        if (!(event.target instanceof HTMLButtonElement)) {
            console.log(event.target.href);
        }

        setIsDown(prev => !prev)
    }

    return (
        <div className={classes.dropdown}>
            <ContextProvider value={{ value: isDown, handle: handleDown }}>
                {children}
            </ContextProvider>
        </div>)

}

function Menu({ children }) {

    const context = useContext(Context)

    return (
        <nav
            className={`${classes[`dropdown-menu`]} ${context.value ? '' : `${classes['hide']}`}`}
        >
            {children}
        </nav>
    )
}

Menu.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node),
}

function Item({ children, href }) {

    const context = useContext(Context)

    return (
        <a
            href={href}
            className={classes['dropdown-item']}
            onClick={context.handle}
        >
            {children}
        </a>
    )
}

Item.propTypes = {
    href: PropTypes.string,
    children: PropTypes.string
}

function Toggle({ variant, children, size }) {

    const context = useContext(Context)

    return (
        <Button
            onClick={context.handle}
            variant={variant}
            size={size}
        >
            {children}
        </Button>
    )
}

Toggle.propTypes = {
    variant: PropTypes.string,
    children: PropTypes.string,
    onClick: PropTypes.func,
    size: PropTypes.string
}


DropDown.Item = memo(Item)
DropDown.Toggle = memo(Toggle)
DropDown.Menu = memo(Menu)

DropDown.propTypes = {
    children: PropTypes.node
}

export default DropDown
