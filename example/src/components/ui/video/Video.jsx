import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import video from '../../../assets/video/video1.mp4'
import classes from './Video.nodule.css'

function Video(props, ref) {

    const videoRef = useRef()

    useImperativeHandle(ref, () => ({
        play: () => videoRef.current.play(),
        pause: () => videoRef.current.pause()
    }))

    return (
        <video className={classes.video} ref={videoRef} src={video} />
    )
}

export default forwardRef(Video)