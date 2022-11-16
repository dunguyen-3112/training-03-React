import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Context } from '../../../store/ContextProvider'

import { Icon2 } from '../icon'
import { Text } from '../text'

import classes from './Bar.module.css'

function Bar(
    {
        icon,
        children,
        wIcon,
        hIcon,
        pos,
        href,
        isSelected,
        onClick
    }) {

    const context = useContext(Context)

    const [isHover, setIsHover] = useState(false)

    const classList = [classes.bar]
    isSelected && classList.push(classes.selected)

    return (
        <div className={classList.join(' ')}
            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={onClick}
        >
            <div className={classes['bar-bg']}></div>
            <Icon2 pos={(isHover || isSelected) ? pos + 1 : pos} icon={icon} width={wIcon} height={hIcon} />
            <Link to={href || '/'}>
                {children}
            </Link>
        </div>
    )
}

Bar.propTypes = {
    icon: PropTypes.string,
    children: PropTypes.string,
    wIcon: PropTypes.number,
    hIcon: PropTypes.number,
    pos: PropTypes.number,
    href: PropTypes.string,
    isSelected: PropTypes.bool.isRequired,
    onClick: PropTypes.func
}

export default Bar
