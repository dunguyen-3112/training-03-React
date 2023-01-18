import React, { memo, useContext } from "react";

import { routes } from "@routes";
import { Context } from "@context";
import { Logo } from "@components";
import classes from "./index.module.sass";
import { SidebarItem } from "./components";

const SideBar = () => {
  const pages = routes.filter((route) => route.icon);
  const { page, setPage } = useContext(Context);

  const sibarList = pages.map((_page, index) => (
    <SidebarItem
      path={_page.path}
      icon={_page.icon(page === index)}
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
