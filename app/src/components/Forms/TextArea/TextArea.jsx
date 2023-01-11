import React from "react";
import PropTypes from "prop-types";
import "../base.sass";

import classes from "./TextArea.module.sass";

import "../base.sass";

function TextArea({ title, message, value, onChange, tabIndex }) {
  const classList = ["form-group", classes["text-Area"]];

  const name = title.replace(" ", "_").toLowerCase();
  return (
    <label className={classList.join(" ")}>
      <span className="form-label__title">{title}</span>
      <textarea
        cols="30"
        rows="5"
        name={name}
        value={value}
        className="form-control"
        onChange={onChange}
        tabIndex={tabIndex}
      ></textarea>
      <span className="form-message">{message}</span>
    </label>
  );
}

TextArea.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  tabIndex: PropTypes.number,
};

export default TextArea;
