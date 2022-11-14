import { memo } from 'react'
import PropTypes from 'prop-types'

function Table({ children }) {
    return (
        <table>
            {children}
        </table>
    )
}

function Head({ children }) {
    return (
        <thead>
            {children}
        </thead>
    )
}

Head.propTypes = {
    children: PropTypes.node
}

function Body({ children }) {
    return (
        <tbody>
            {children}
        </tbody>
    )
}

Body.propTypes = {
    children: PropTypes.node
}

function Row({ children }) {
    return (
        <tr>
            {children}
        </tr>
    )
}

Row.propTypes = {
    children: PropTypes.node
}

function Cell({ children }) {
    return (
        <td>
            {children}
        </td>
    )
}

Cell.propTypes = {
    children: PropTypes.any
}

Table.Head = memo(Head)
Table.Row = memo(Row)
Table.Body = memo(Body)
Table.Cell = memo(Cell)

Table.propTypes = {
    children: PropTypes.node
}

export default Table
