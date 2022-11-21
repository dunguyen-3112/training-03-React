import classes from './Section.module.css'
import React from 'react'
import PropTypes from 'prop-types'

function Section({ children }) {
    return (
        <section className={classes.section}>
            {children}
        </section>
    )
}

Section.propTypes = {
    children: PropTypes.node,
}

export default Section