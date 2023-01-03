import React from 'react';
import PropTypes from 'prop-types';

import classes from './Logo.module.sass';
import { Text } from '../text';

import Type from '../../../data/TextType.json'

const Logo = ({ col }) => {
    return (
        <div className={classes.logo} data-column={col}>
            <div className={classes['logo-icon']}></div>
            <Text font={Type[700][19]} tag="h2" gray>Dashboard Kit</Text>
        </div>
    );
};


Logo.propTypes = {
    col: PropTypes.bool
};


export default Logo;
