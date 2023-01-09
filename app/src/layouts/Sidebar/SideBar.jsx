import React, { memo } from "react";

import { SidebarItem } from "./SidebarItem";
import { Logo } from "../../components/Uis/Logo";
import classes from "./Sidebar.module.sass";
import { routes } from "../../routes/routes";
import { useState } from "react";
import { useEffect } from "react";

const SideBar = () => {
    const pages = routes.filter((route) => route.icon);

    const [pageIndex, setPage] = useState(0);

    const sibarList = pages.map((page, index) => (
        <SidebarItem
            path={page.path}
            icon={page.icon}
            title={page.title}
            key={index}
            active={index === pageIndex}
            onClick={() => setPage(index)}
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

export default memo(SideBar);
