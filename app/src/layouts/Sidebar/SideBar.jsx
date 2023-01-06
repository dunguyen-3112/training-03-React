import React from "react";

import { SidebarItem } from "./SidebarItem";
import { Logo } from "../../components/Uis/Logo";
import classes from "./Sidebar.module.sass";
import { routes } from "../../routes/routes";

const SideBar = () => {
    const pages = routes.filter((route) => route.icon);

    const sibarList = pages.map((page, i) => (
        <SidebarItem
            path={page.path}
            icon={page.icon}
            title={page.title}
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
