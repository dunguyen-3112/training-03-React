import React from "react";
import PropTypes from "prop-types";
import { memo } from "react";

function DropDown({ title, options, message, value, tabIndex, onChange }) {
  const name = title.replace(" ", "_").toLowerCase();
  return (
    <label className="form-group">
      <span className="form-label__title">{title}</span>
      <select
        className="form-control"
        name={name}
        value={value}
        onChange={onChange}
        tabIndex={tabIndex}
      >
        <option value="">{title}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      <span className="form-message">{message}</span>
    </label>
  );
}

DropDown.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  message: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  tabIndex: PropTypes.number,
};

export default memo(DropDown);
