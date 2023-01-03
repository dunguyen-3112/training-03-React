import React from 'react';
import PropTypes from 'prop-types';

import classes from './Flex.module.sass'

const Flex = ({ children, gap }) => {
    return (
        <div className={classes.flex} style={{ gap: `${gap}px` }}>
            {children}
        </div>
    );
};


Flex.propTypes = {
    children: PropTypes.node,
    gap: PropTypes.number
};


export default Flex;
