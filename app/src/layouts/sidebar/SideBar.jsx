import React from 'react';
import PropTypes from 'prop-types';

import { PAGES } from '../../data/constants';
import { SidebarItem } from './sidebarItem';

import { Logo } from '../../components/ui/logo'

import classes from './Sidebar.module.sass';


const SideBar = () => {

    const sibarList = PAGES.map((page, i) => (<SidebarItem
        path={page.path}
        pos={page.icon}
        title={page.label}
        index={i}
        key={i} />))

    return (
        <nav className={classes.sidebar}>
            <Logo />
            {sibarList}
        </nav>
    );
};


SideBar.propTypes = {

};


export default SideBar;
