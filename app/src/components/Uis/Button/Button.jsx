import React from "react";
import PropTypes from "prop-types";

import classes from "./Button.module.sass";

const Button = ({ children, onClick, outline, tabIndex, type }) => {
  return (
    <button
      onClick={onClick}
      className={classes.btn}
      data-outline={outline}
      tabIndex={tabIndex}
      type={type}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onClick: PropTypes.func,
  outline: PropTypes.bool,
  tabIndex: PropTypes.number,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};

export default Button;
