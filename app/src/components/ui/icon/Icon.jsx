import React from 'react';
import PropTypes from 'prop-types';

import classes from './Icon.module.sass'
const Icon = ({ pos, onClick }) => {
    return (
        <i
            onClick={onClick}
            className={classes.icon}
            style={{ backgroundPositionY: `${pos * 16}px` }}
        ></i>
    );
};


Icon.propTypes = {
    pos: PropTypes.number.isRequired,
    onClick: PropTypes.func
};


export default Icon;
