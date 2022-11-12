import PropTypes from 'prop-types'
import classes from './Icon.module.css'
import { useContext } from 'react'

import { Context } from '../../../store/ContextProvider'
import { themeToColor } from '../../../helpers/theme'

function Icon({ src, alt, lg, sm, xs, md }) {

    const theme = useContext(Context)

    const color = themeToColor(theme);

    let w;
    if (lg === undefined) {
        if (md === undefined) {
            if (sm === undefined) {
                if (xs !== undefined) w = Object.keys({ xs })[0]
            } else w = Object.keys({ sm })[0]
        } else w = Object.keys({ md })[0]
    } else w = Object.keys({ lg })[0]

    return (
        <figure style={{ gridRow: "1/3" }} className={`${classes.icon} ${classes[color]}`}>
            <img src={src} alt={alt} className={classes[w]} />
        </figure>
    )
}

Icon.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    lg: PropTypes.bool,
    sm: PropTypes.bool,
    xs: PropTypes.bool,
    md: PropTypes.bool
}

export default Icon
