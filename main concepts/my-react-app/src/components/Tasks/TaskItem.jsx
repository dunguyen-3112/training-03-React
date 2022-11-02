import React from 'react'
import PropTypes from 'prop-types'

function TaskItem(props) {
    return (
        <li>{props.task.text}</li>
    )
}

TaskItem.propTypes = {
    task: PropTypes.object
}

export default TaskItem