import React from "react";
import PropTypes from "prop-types";

import classes from "./index.module.sass";

const Button = ({ children, onClick, outline, tabIndex, type, disabled }) => {
  return (
    <button
      tabIndex={tabIndex}
      onClick={onClick}
      className={classes.btn}
      data-outline={outline}
      type={type}
      disabled={disabled}
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
  disabled: PropTypes.bool,
};

export default Button;
