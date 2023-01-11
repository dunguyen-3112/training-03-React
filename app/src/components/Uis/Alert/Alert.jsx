import React from "react";
import PropTypes from "prop-types";

import "./Alert.sass";

function Alert({ title, message, onConfirm }) {
  return (
    <section className="alert__container">
      <div className="alert__content flex">
        <div className="alert__info flex">
          <h1 className="alert__title">{title}</h1>
          <p className="alert__message">{message}</p>
        </div>
        <span className="alert__action">
          <button className="alert__btn" onClick={() => onConfirm(1)}>
            Confirm
          </button>
          <button className="alert__btn" onClick={() => onConfirm(0)}>
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
