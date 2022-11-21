import React from 'react'
import { useState } from 'react'

function State(props) {

    const [status, setStatus] = useState("A");



    const handleClick = e => {
        console.log(props)
        setStatus(pre => pre.localeCompare('A') === 0 ? "B" : "A");
    }

    return (
        <div onClick={handleClick}>{status}</div>
    )
}

export default State