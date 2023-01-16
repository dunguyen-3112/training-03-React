import React, { useState, memo, useCallback } from "react";
import PropTypes from "prop-types";

import Active from "@assets/images/active.svg";
import NotActive from "@assets/images/View.svg";
import { INPUT_EMPTY_DEFAULT } from "@constants/default";

const Input = ({
  label,
  value,
  field,
  errorMessage,
  placeholder,
  type,
  onChange,
  inputRef,
  onFocus,
  tabIndex,
  disabled,
  onBlur,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleVisible = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

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
    <label className={`form__group ${errorMessage ? "invalid" : ""}`}>
      <span className="form__label">
        <span className="form__label__text">{label}</span>
        {type === "password" && (
          <a href="/">
            <span className="form__lable__password">Forgot password?</span>
          </a>
        )}
      </span>
      <input
        placeholder={placeholder}
        value={value || INPUT_EMPTY_DEFAULT}
        onChange={handleChangeInput}
        type={!isVisible ? type : "text"}
        className="form__control"
        ref={inputRef}
        maxLength={20}
        onFocus={handleFocusInput}
        onBlur={handleBlurInput}
        disabled={disabled}
        tabIndex={tabIndex}
      />
      {type === "password" && (
        <img
          src={!isVisible ? Active : NotActive}
          height={20}
          width={20}
          className="hide"
          onClick={handleVisible}
        />
      )}
      {errorMessage && <span className="form__message">{errorMessage}</span>}
    </label>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  field: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  inputRef: PropTypes.object,
  tabIndex: PropTypes.number,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  type: PropTypes.oneOf(["text", "email", "password", "date", "search"]),
};

export default memo(Input);
