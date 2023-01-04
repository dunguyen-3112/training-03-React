import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import classes from './SidebarItem.module.sass'

import { Context } from '../../../context/Context';


const SidebarItem = ({ title, icon, path, index }) => {

    const { page, setPage } = useContext(Context);

    const handleClick = event => {
        event.preventDefault();
        setPage(index)
    };

    return (
        <a className={classes.sidebar__item}
            href={path}
            data-active={index === page}
            onClick={handleClick}
        >
            {icon(page === index)}
            <span className={classes['sidebar__item__title']}>
                {title}
            </span>
        </a>
    );
};


SidebarItem.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.func,
    path: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired
};


export default SidebarItem;
