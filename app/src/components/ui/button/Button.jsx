import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.module.sass';


const Button = ({ children, onClick, outline }) => {
    return (
        <button
            onClick={onClick}
            className={classes.btn}
            data-outline={outline}
        >
            {children}
        </button>
    );
};


Button.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    onClick: PropTypes.func,
    outline: PropTypes.bool
};


export default Button;
