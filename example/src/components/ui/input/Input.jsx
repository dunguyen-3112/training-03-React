import React from 'react'
import { memo } from 'react'
import classes from './Input.module.css'

function Input({ label, type, value, placeholder, onChange }) {
    return (
        <label className={classes.form_group}>
            <span className={classes.form_label}>{label}</span>
            {type?.localeCompare("textarea") !== 0 ? <input
                className={classes.form_control}
                type={type ? type : 'text'}
                placeholder={placeholder ? placeholder : ''}
                onChange={(event) => onChange(event)}
                value={value ? value : ''}
            /> : <textarea
                className={classes.form_control}
                type={type ? type : 'text'}
                placeholder={placeholder ? placeholder : ''}
                onChange={(event) => onChange(event)}
                value={value ? value : ''}
            />}
        </label>
    )
}

export default memo(Input)