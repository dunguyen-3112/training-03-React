import React, { memo, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import classes from "./index.module.sass";

const Modal = ({ children, active, onMouseDownOutSide }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleMouseClickOutside = (event) => {
      if (
        active &&
        modalRef &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      )
        onMouseDownOutSide();
    };
    document.addEventListener("mousedown", handleMouseClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleMouseClickOutside);
    };
  }, [active, onMouseDownOutSide]);

  return (
    <div className={classes.modal} data-active={active} ref={modalRef}>
      {children}
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  active: PropTypes.bool,
  onMouseDownOutSide: PropTypes.func,
};

export default memo(Modal);
