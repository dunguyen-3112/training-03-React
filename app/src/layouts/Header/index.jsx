import React, { useState, memo, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import classes from "./index.module.sass";
import { routes } from "@routes";
import { Context } from "@context/ContextProvider";
import * as API from "@utils/api";
import { useCallback } from "react";
import { TICKET_ROUTE } from "@constants/routes";
import { Search } from "@components/Forms";
import { Button, Modal } from "@components/Uis";

const Header = () => {
  const { page, user, setUser } = useContext(Context);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const handleSelect = useCallback(
    (id) => {
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

  const handleLogout = useCallback(() => {
    setUser(null);
    localStorage.clear();
  }, [setUser]);

  const handleSearch = useCallback(async (query) => {
    const response = await API.get(`/tickets?_ticket_name=${query}`);
    const results = response.data;
    console.log(results);
    return results;
  }, []);

  return (
    <header className={`${classes.header} flex`}>
      <h1 className={classes["header__title"]}>
        {routes.filter((route) => route.icon).at(page).title}
      </h1>

      <span className={`${classes["header__user-action"]} flex`}>
        <Search onSearch={handleSearch} onSelect={handleSelect} />
        <div className={classes.line}></div>
        <span
          className={`${classes["header-user-info"]} flex`}
          onClick={() => setIsVisible((prev) => !prev)}
          onMouseLeave={() => setIsVisible(false)}
        >
          <h3
            className={classes["header-user-info__name"]}
          >{`${user?.name}`}</h3>
          <figure className={classes["header-user-info__avatar"]}>
            <img src={user?.avatar} alt="avatar" />
          </figure>
          <Modal active={isVisible}>
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
