import React, { memo, useContext } from "react";

import { SidebarItem } from "./SidebarItem";
import { Logo } from "../../components/Uis/Logo";
import classes from "./Sidebar.module.sass";
import { routes } from "../../routes/routes";
import { Context } from "../../context/Context";

const SideBar = () => {
  const pages = routes.filter((route) => route.icon);

  const { page, setPage } = useContext(Context);

  const sibarList = pages.map((_page, index) => (
    <SidebarItem
      path={_page.path}
      icon={_page.icon}
      title={_page.title}
      key={index}
      active={index === page}
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
