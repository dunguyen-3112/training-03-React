import React from 'react'
import Option from './Option'
import classes from './DropDown.module.css'
import Input from '../input/Input'

function DropDown({ options, label, style }) {

    const listSelect = options.map(option => <Option option={option} key={option.value} />)

    const handleChange = event => console.log(event.target.value)
    return (
        <label className={style.group}>
            <span className={style.label}>{label}</span>
            <select onChange={handleChange} className={style.control}>
                <Option option={{ text: 'select', value: -1 }} />
                {listSelect}
            </select>
        </label>
    )
}

export default DropDown