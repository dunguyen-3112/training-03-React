import React, { useState, memo } from "react";
import PropTypes from "prop-types";

import Active from "../../../assets/images/active.svg";
import NotActive from "../../../assets/images/View.svg";
import "../base.sass";

const Input = ({
  title,
  value,
  placeholder,
  type,
  onChange,
  inputRef,
  onFocus,
  tabIndex,
  disabled,
  onBlur,
}) => {
  const [hide, setHide] = useState(true);

  const name = title?.replace(" ", "_").toLowerCase();
  return (
    <label className="form-group">
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
        type={hide ? type : "text"}
        className="form-control"
        ref={inputRef}
        name={name}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        tabIndex={tabIndex}
      />
      {type === "password" && (
        <img
          src={!hide ? Active : NotActive}
          height={20}
          width={20}
          className="hide"
          onClick={() => setHide((prev) => !prev)}
        />
      )}
      <span className="form-message"></span>
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
  type: PropTypes.oneOf(["text", "email", "password", "date"]),
};

export default memo(Input);
