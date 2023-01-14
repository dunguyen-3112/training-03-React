import React, { useState } from "react";
import PropTypes from "prop-types";

import Active from "@assets/images/active.svg";
import NotActive from "@assets/images/View.svg";

const Input = ({
  title,
  value,
  placeholder,
  type,
  onChange,
  inputRef,
  onFocus,
  onKeyDown,
  tabIndex,
  disabled,
  valid,
  onBlur,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { status, message } = valid || {};

  return (
    <label className={`form-group ${status ? "invalid" : ""}`}>
      <span className="form-label">
        <span className="form-label__title">{title}</span>
        {type === "password" && (
          <a href="/">
            <span className="form-lable__password">Forgot password?</span>
          </a>
        )}
      </span>
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={!isVisible ? type : "text"}
        className="form-control"
        ref={inputRef}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        tabIndex={tabIndex}
      />
      {type === "password" && (
        <img
          src={!isVisible ? Active : NotActive}
          height={20}
          width={20}
          className="hide"
          onClick={() => setIsVisible((prev) => !prev)}
        />
      )}
      {status && message && <span className="form-message">{message}</span>}
    </label>
  );
};

Input.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  inputRef: PropTypes.object,
  tabIndex: PropTypes.number,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  onKeyDown: PropTypes.func,
  valid: PropTypes.exact({
    status: PropTypes.bool,
    message: PropTypes.string,
  }),
  type: PropTypes.oneOf(["text", "email", "password", "date", "search"]),
};

export default Input;
