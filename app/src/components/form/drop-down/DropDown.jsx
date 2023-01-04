import React from 'react'
import PropTypes from 'prop-types'

function DropDown({ label, options }) {
    return (
        <select>
            <option value="">{label}</option>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}

DropDown.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
}

export default DropDown
