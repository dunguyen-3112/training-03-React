import PropTypes from 'prop-types'

import classes from './Icon1.module.css'

import { memo } from 'react'
import { useContext } from 'react'
import { Context } from '../../../store/ContextProvider'
import { PAGES } from '../../../constants'

function Icon1({ src, size, pos, className, isHover }) {

    const context = useContext(Context)

    const calPos = index => {

        let tem = (PAGES.length + 1) * 2 - (PAGES[index].index - 1) * 2
        if (context.page !== index && !isHover)
            tem = tem - 1
        return tem * 20
    }

    const yPosition = calPos(pos)

    return (
        <i
            style={
                {
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundImage: `url(${src})`,
                    backgroundPosition: `0 ${yPosition}px`,
                    display: 'block'
                }
            }
            className={`${classes.icon} ${className}`}
        ></i>
    )
}

Icon1.propTypes = {
    src: PropTypes.string,
    size: PropTypes.number,
    pos: PropTypes.number,
    className: PropTypes.string,
    isHover: PropTypes.bool
}

export default memo(Icon1)
