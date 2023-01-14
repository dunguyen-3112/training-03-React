import React from "react";
import PropTypes from "prop-types";
import { SELECT_OPTIONS_DEFAULT } from "@src/constants/default";

function DropDown({ title, options, valid, value, tabIndex, onChange }) {
  const { message, status } = valid || {};

  return (
    <label className={`form-group ${status === true ? "invalid" : ""}`}>
      <span className="form-label__title">{title}</span>
      <select
        className="form-control"
        value={value}
        onChange={onChange}
        tabIndex={tabIndex}
      >
        <option value={SELECT_OPTIONS_DEFAULT}>{title}</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      {message && status && <span className="form-message">{message}</span>}
    </label>
  );
}

DropDown.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
  valid: PropTypes.exact({
    message: PropTypes.string,
    status: PropTypes.bool,
  }),
  value: PropTypes.any,
  onChange: PropTypes.func,
  tabIndex: PropTypes.number,
};

export default DropDown;
