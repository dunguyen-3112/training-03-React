import React, { useCallback } from "react";
import PropTypes from "prop-types";

import classes from "./index.module.sass";
import { memo } from "react";

function TextArea({
  label,
  value,
  onChange,
  tabIndex,
  field,
  onFocus,
  onBlur,
  errorMessage,
}) {
  const formLabelClass =
    `form__group ${classes["text-Area"]}` + ` ${errorMessage ? "invalid" : ""}`;

  const handleChangeInput = useCallback((event) => {
    onChange(event.target.value, field);
  }, []);

  const handleBlurInput = useCallback((event) => {
    onBlur && onBlur(event.target.value, field);
  }, []);

  const handleFocusInput = useCallback((event) => {
    onFocus && onFocus(event.target.value, field);
  }, []);

  return (
    <label className={formLabelClass}>
      <span className="form__label__text">{label}</span>
      <textarea
        cols="30"
        rows="5"
        onBlur={handleBlurInput}
        onFocus={handleFocusInput}
        value={value}
        className="form__control"
        onChange={handleChangeInput}
        tabIndex={tabIndex}
      ></textarea>
      {errorMessage && <span className="form__message">{errorMessage}</span>}
    </label>
  );
}

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  message: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  tabIndex: PropTypes.number,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  field: PropTypes.string,
  errorMessage: PropTypes.string,
};

export default memo(TextArea);
