import PropTypes from 'prop-types'

import classes from './CardContent.module.css'

function CardContent({ children }) {

    return (
        <div className={classes.content}>
            {children}
        </div>
    )
}

CardContent.propTypes = {
    children: PropTypes.node,
}

export default CardContent
