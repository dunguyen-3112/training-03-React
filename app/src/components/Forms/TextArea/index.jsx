import React from "react";
import PropTypes from "prop-types";

import classes from "./index.module.sass";

function TextArea({ title, value, onChange, tabIndex, valid, onKeyDown }) {
  const { status, message } = valid || {};
  return (
    <label
      className={`form-group ${classes["text-Area"]} ${
        status ? "invalid" : ""
      }`}
    >
      <span className="form-label__title">{title}</span>
      <textarea
        cols="30"
        rows="5"
        onKeyDown={onKeyDown}
        value={value}
        className="form-control"
        onChange={onChange}
        tabIndex={tabIndex}
      ></textarea>
      {status && message && <span className="form-message">{message}</span>}
    </label>
  );
}

TextArea.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  tabIndex: PropTypes.number,
  onKeyDown: PropTypes.func,
  valid: PropTypes.exact({
    status: PropTypes.bool,
    message: PropTypes.string,
  }),
};

export default TextArea;
