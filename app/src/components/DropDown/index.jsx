import React, { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { SELECT_OPTIONS_DEFAULT } from "@src/constants/default";

function DropDown({
  label,
  options,
  errorMessage,
  field,
  value,
  tabIndex,
  onChange,
  onBlur,
  onFocus,
}) {
  const handleChange = useCallback((event) => {
    onChange && onChange(event.target.value, field);
  }, []);

  const handleFocus = useCallback((event) => {
    onFocus && onFocus(event.target.value, field);
  }, []);

  const handleBlur = useCallback((event) => {
    onBlur && onBlur(event.target.value, field);
  }, []);

  return (
    <label className={`form__group ${errorMessage ? "invalid" : ""}`}>
      <span className="form__label">
        <span className="form__label__text">{label}</span>
      </span>
      <select
        className="form__control"
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={tabIndex}
      >
        <option value={SELECT_OPTIONS_DEFAULT}></option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      {errorMessage && <span className="form__message">{errorMessage}</span>}
    </label>
  );
}

DropDown.propTypes = {
  label: PropTypes.string,
  field: PropTypes.string,
  options: PropTypes.array,
  errorMessage: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  tabIndex: PropTypes.number,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

export default memo(DropDown);
