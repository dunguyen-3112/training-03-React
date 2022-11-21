import React from 'react'
import PropTypes from 'prop-types'
import TaskItem from './TaskItem'
import Section from '../UI/Section';

function Tasks(props) {
    let taskList = <h2>No tasks found. Start adding some!</h2>;

    if (props.items.length > 0) {
        taskList = props.items.map(item => <TaskItem key={item.id} task={item} />)
    }

    let content = taskList

    if (props.isLoading)
        content = 'Loading tasks...';

    if (props.error) {
        content = <button onClick={props.onFetch}>Try again</button>
    }

    return (
        <Section>
            {content}
        </Section>
    )
}

Tasks.propTypes = {
    items: PropTypes.array,
    isLoading: PropTypes.bool,
    error: PropTypes.string,
    onFetch: PropTypes.func
}

export default Tasks