import PropTypes from 'prop-types'
import { Icon } from '../icon'

import { memo } from 'react'

function Avatar({ src, size, alt }) {

    return (
        <Icon
            src={src}
            alt={alt}
            size={`${size}px`}
        />
    )
}

Avatar.propTypes = {
    src: PropTypes.string.isRequired,
    size: PropTypes.number,
    alt: PropTypes.string
}

export default memo(Avatar)
