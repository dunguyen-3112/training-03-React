import React from "react";
import PropTypes from "prop-types";

import classes from './Text.module.sass'

const Text = ({ children, font: { fontSize, fontWeight, lineHeight, letterSpacing }, tag, gray }) => {

    tag = tag || 'span';

    const element = React.createElement(tag, {
        style: {
            fontSize: `${fontSize}px`,
            fontWeight: fontWeight,
            lineHeight: `${lineHeight}px`,
            letterSpacing: `${letterSpacing}px`,
        }, className: `${gray ? classes.gray : classes.black}`
    }, children)

    return element;
};

Text.propTypes = {
    children: PropTypes.string.isRequired,
    tag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span']),
    font: PropTypes.shape(
        {
            fontSize: PropTypes.number,
            fontWeight: PropTypes.number,
            lineHeight: PropTypes.number,
            letterSpacing: PropTypes.number,
            gray: PropTypes.bool
        }
    ).isRequired
};


export default Text;
