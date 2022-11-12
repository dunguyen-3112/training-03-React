import { useRef, forwardRef, useImperativeHandle, memo } from 'react'
import PropTypes from 'prop-types'

function Video({ src }, ref) {

    console.log("re-render");

    const videoRef = useRef();

    useImperativeHandle(ref, () => ({
        play: () => videoRef.current.play(),
        pause: () => videoRef.current.pause()
    }), [])

    return (
        <>
            <video ref={videoRef} src={src} width={200} />
        </>
    )
}



const VideoForwardRef = forwardRef(Video)

VideoForwardRef.src = "Video"

Video.propTypes = {
    src: PropTypes.any
}

export default memo(VideoForwardRef)
