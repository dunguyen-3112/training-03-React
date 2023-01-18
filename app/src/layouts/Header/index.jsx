import React, { useState, memo, useContext, useCallback } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { TICKET_ROUTE } from "@constants";
import { Context } from "@context";
import { routes } from "@routes";
import classes from "./index.module.sass";
import { Button, Modal, Search } from "@components";

const Header = () => {
  const { page, user, setUser, setInputSearch } = useContext(Context);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const handleSelect = useCallback(
    ({ id }) => {
      const route = location.pathname.split("/").at(1);
      switch (route) {
        case TICKET_ROUTE:
          navigate(`/${TICKET_ROUTE}/edit_ticket/${id}`);
          break;
        default:
          break;
      }
    },
    [navigate]
  );

  const handleMouseDownOutSide = useCallback(() => setIsVisible(false), []);

  const handleLogout = useCallback(() => {
    setUser(null);
    localStorage.clear();
  }, [setUser]);

  const handleSearch = useCallback(
    (query) => {
      setInputSearch(query);
    },
    [setInputSearch]
  );

  const handleClickShowInfo = useCallback(
    () => setIsVisible((prev) => !prev),
    []
  );

  return (
    <header className={`${classes.header} flex`}>
      <h1 className={classes["header__title"]}>
        {routes.filter((route) => route.icon).at(page).title}
      </h1>

      <span className={`${classes["header__user-action"]} flex`}>
        <Search onSearch={handleSearch} onSelect={handleSelect} isIcon />
        <div className={classes.line}></div>
        <span
          className={`${classes["header-user-info"]} flex`}
          onClick={handleClickShowInfo}
        >
          <h3
            className={classes["header-user-info__name"]}
          >{`${user?.name}`}</h3>
          <figure className={classes["header-user-info__avatar"]}>
            <img src={user?.avatar} alt="avatar" />
          </figure>
          <Modal active={isVisible} onMouseDownOutSide={handleMouseDownOutSide}>
            <Button outline onClick={handleLogout}>
              Logout
            </Button>
          </Modal>
        </span>
      </span>
    </header>
  );
};

Header.propTypes = {
  handleLogout: PropTypes.func,
};

export default memo(Header);
