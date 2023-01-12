import React, { useRef, useState, memo, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import classes from "./Navbar.module.sass";
import { Modal, Button } from "@components/Uis";
import { SearchIcon } from "@components/Uis/Icon";
import { routes } from "@routes";
import { Context } from "@context/ContextProvider";
import * as API from "@utils/api";
import { useCallback } from "react";
import { TICKET_ROUTE } from "@constants/routes";
import { Search } from "@components/Forms";

const NavBar = ({ handleLogout }) => {
  const [isActive, setIsActive] = useState(false);
  const { page } = useContext(Context);

  const navigate = useNavigate();

  const handleSelect = useCallback((id) => {
    const route = location.pathname.split("/").at(1);
    switch (route) {
      case TICKET_ROUTE:
        navigate(`/${TICKET_ROUTE}/edit_ticket/${id}`);
        break;
      default:
        break;
    }
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  const searchRef = useRef();

  const [isSearch, setIsSearch] = useState(false);

  const handleClick = () => {
    setIsSearch((prev) => !prev);
  };

  const handleSearch = useCallback(async (query) => {
    const response = await API.get(`/tickets?_ticket_name=${query}`);
    const results = response.data;
    return results;
  }, []);

  if (isSearch && searchRef.current) searchRef.current.focus();

  const handleShowInfo = () => setIsActive((prev) => !prev);

  return (
    <span className={classes.navbar}>
      <h1 className={classes["nav__title"]}>
        {routes.filter((route) => route.icon).at(page).title}
      </h1>
      <span className={classes["nav-menu"]}>
        {isSearch && <Search onSearch={handleSearch} onSelect={handleSelect} />}
        <span className={classes["menu-icon"]} onClick={handleClick}>
          <SearchIcon />
        </span>
        <div className={classes.line}></div>
        <span
          className={classes["menu-info"]}
          onClick={handleShowInfo}
          onMouseLeave={() => setIsActive(false)}
        >
          <h3 className={classes["userName"]}>{`${user.name}`}</h3>
          <figure className={classes.avatar}>
            <img src={user.avatar} alt="avatar" />
          </figure>
          <Modal active={isActive}>
            <Button outline>
              <img src={user.avatar} alt="avatar" width={20} />
              <span className={classes["menu__item__title"]}>Profile</span>
            </Button>
            <Button outline onClick={handleLogout}>
              <span className={classes["menu__item__title"]}>Logout</span>
            </Button>
          </Modal>
        </span>
      </span>
    </span>
  );
};

NavBar.propTypes = {
  handleLogout: PropTypes.func,
};

export default memo(NavBar);
