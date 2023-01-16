import React from "react";
import PropTypes from "prop-types";

import classes from "./index.module.sass";

function Alert({ title, message, onConfirm }) {
  return (
    <section className={classes["alert__container"]}>
      <div className={`${classes["alert__content"]} flex`}>
        <div className={`${classes["alert__info"]} flex`}>
          <h1 className={classes["alert__title"]}>{title}</h1>
          <p className={classes["alert__message"]}>{message}</p>
        </div>
        <span className={classes["alert__action"]}>
          <button
            className={classes["alert__btn"]}
            onClick={() => onConfirm(1)}
          >
            Confirm
          </button>
          <button
            className={classes["alert__btn"]}
            onClick={() => onConfirm(0)}
          >
            Cancel
          </button>
        </span>
      </div>
    </section>
  );
}

Alert.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func,
};

export default Alert;
