import React, { useEffect, memo } from "react";
import PropTypes from "prop-types";

import classes from "./index.module.sass";

function Notification({ message, time, type }) {
  type = type || "message";

  return (
    <div
      className={`${classes.notification} ${classes[type]} flex`}
      data-visible={time > 0}
      data-type={type}
    >
      <div className={classes.notification__close}></div>
      <div className={`${classes.notification__content} flex`}>
        <header>
          <h3 className={classes.notification__title}>{type}</h3>
        </header>
        <p className={classes.notification__message}>{message}</p>
      </div>
    </div>
  );
}

Notification.propTypes = {
  message: PropTypes.string,
  time: PropTypes.number,
  type: PropTypes.oneOf(["error", "warning", "info", "success", "message"]),
};

export default memo(Notification);
