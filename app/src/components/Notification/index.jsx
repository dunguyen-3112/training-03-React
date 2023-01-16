import React, { useLayoutEffect, useState, memo } from "react";
import PropTypes from "prop-types";

import classes from "./index.module.sass";

function Notification({ message, time, type }) {
  const [timeDuration, setTimeDuration] = useState(time);

  type = type || "message";

  useLayoutEffect(() => {
    const timeId = setInterval(() => {
      if (timeDuration > 0) setTimeDuration((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timeId);
  }, [timeDuration]);

  return (
    <div
      className={`${classes.notification} ${classes[type]} flex`}
      data-time={timeDuration}
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
