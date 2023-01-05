import React from "react";
import PropTypes from "prop-types";

import classes from "./Modal.module.sass";

const Modal = ({ children, active }) => {
    return (
        <div className={classes.modal} data-active={active}>
            {children}
        </div>
    );
};

Modal.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    active: PropTypes.bool,
};

export default Modal;
