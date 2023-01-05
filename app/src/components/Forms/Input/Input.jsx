import React, { forwardRef, useState } from "react";
import PropTypes from "prop-types";

import classes from "./Input.module.sass";

import icon from "../../../assets/images/active.png";
import icon1 from "../../../assets/images/inactive.png";

import "../base.sass";

const Input = forwardRef(
    ({ title, value, message, placeholder, onChange, type }, ref) => {
        const [hide, setHide] = useState(true);

        return (
            <label className="form-group">
                <span className="form-label">
                    <span className="form-label__title">{title}</span>
                    {type === "password" && (
                        <a href="/">
                            <span className="form-lable__password">
                                Forgot password?
                            </span>
                        </a>
                    )}
                </span>
                <input
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    type={hide ? type : "text"}
                    className="form-control"
                    ref={ref}
                />
                {type === "password" && (
                    <img
                        src={hide ? icon1 : icon}
                        height={20}
                        width={20}
                        className="hide"
                        onClick={() => setHide((prev) => !prev)}
                    />
                )}

                <span className="form-message">{message}</span>
            </label>
        );
    }
);

Input.displayName = "Input";

Input.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
    message: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.oneOf(["text", "email", "password"]),
};

export default Input;