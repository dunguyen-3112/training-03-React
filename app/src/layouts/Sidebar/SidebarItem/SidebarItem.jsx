import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import classes from "./SidebarItem.module.sass";

const SidebarItem = ({ title, icon, path, active, onClick }) => {
    return (
        <Link
            className={classes.sidebar__item}
            to={path}
            data-active={active}
            onClick={onClick}
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
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
    index: PropTypes.number,
};

export default SidebarItem;
