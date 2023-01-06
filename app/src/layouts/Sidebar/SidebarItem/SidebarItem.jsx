import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import classes from "./SidebarItem.module.sass";

import { Context } from "../../../context/Context";

const SidebarItem = ({ title, icon, path, index }) => {
    const { page, setPage } = useContext(Context);

    const handleClick = () => {
        setPage(index);
    };

    return (
        <Link
            className={classes.sidebar__item}
            to={path}
            data-active={index === page}
            onClick={handleClick}
        >
            {icon}
            <span className={classes["sidebar__item__title"]}>{title}</span>
        </Link>
    );
};

SidebarItem.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.node,
    path: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
};

export default SidebarItem;
