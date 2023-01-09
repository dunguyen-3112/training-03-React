import React from "react";
import PropTypes from "prop-types";
import { memo } from "react";

function DropDown({ title, options, message, value, onChange }) {
    const name = title.replace(" ", "_").toLowerCase();

    return (
        <label className="form-group">
            <span className="form-label__title">{title}</span>
            <select
                className="form-control"
                name={name}
                value={value}
                onChange={onChange}
            >
                <option value="">{title}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
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
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
};

export default memo(DropDown);
