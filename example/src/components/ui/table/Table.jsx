import React from 'react'

function Table({ header, body }) {
    return (
        <table>
            <thead>{header}</thead>
            <tbody>{body}</tbody>
        </table>
    )
}

export default Table