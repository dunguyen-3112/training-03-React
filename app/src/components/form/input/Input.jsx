import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';

import classes from './Input.module.sass'
import { Text } from '../../ui/text';

import icon from '../../../assets/images/active.png'
import icon1 from '../../../assets/images/inactive.png'

import Type from '../../../data/TextType.json'


const Input = forwardRef(({ title, value, message, placeholder, onChange, type }, ref) => {
    const [hide, setHide] = useState(true);

    return (
        <label className={classes['input-group']}>
            <span className={classes['input-label']}>
                <Text font={Type[700][12]} gray tag="span">{title}</Text>
                {type === 'password' && <a href="/"><Text font={Type[400][10]} gray>Forgot password?</Text></a>}
            </span>
            <input
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                type={hide ? type : 'text'}
                className={classes['input-control']}
                ref={ref}
            />
            {type === 'password' && <img src={hide ? icon1 : icon} height={20} width={20} className={classes.hide} onClick={() => setHide(prev => !prev)} />}

            <Text font={Type[400][12]} gray tag="span">
                {message}
            </Text>
        </label >
    );
});

Input.displayName = 'Input'


Input.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
    message: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.oneOf(["text", "email", "password"])

};


export default Input;
