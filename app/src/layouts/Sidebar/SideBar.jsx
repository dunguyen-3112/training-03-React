import React from "react";
import PropTypes from "prop-types";

import { PAGES } from "../../constants/constants";
import { SidebarItem } from "./SidebarItem";

import { Logo } from "../../components/Uis/Logo";

import classes from "./Sidebar.module.sass";

const SideBar = () => {
    const sibarList = PAGES.map((page, i) => (
        <SidebarItem
            path={page.path}
            icon={page.icon}
            title={page.label}
            index={i}
            key={i}
        />
    ));

    return (
        <nav className={classes.sidebar}>
            <Logo />
            {sibarList}
        </nav>
    );
};

SideBar.propTypes = {};

export default SideBar;
