import React from "react";
import PropTypes from "prop-types";

function DropDown({ label, options }) {
    return (
        <label className="form-group">
            <span className="form-label__title">{label}</span>
            <select className="form-control">
                <option value="">{label}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    );
}

DropDown.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
};

export default DropDown;
