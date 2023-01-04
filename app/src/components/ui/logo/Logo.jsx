import React from 'react';
import PropTypes from 'prop-types';

import classes from './Logo.module.sass';

const Logo = ({ col }) => {
    return (
        <div className={classes.logo} data-column={col}>
            <div className={classes['logo__icon']}></div>
            <h1 className={classes['logo__title']}>Dashboard Kit</h1>
        </div>
    );
};


Logo.propTypes = {
    col: PropTypes.bool
};


export default Logo;
