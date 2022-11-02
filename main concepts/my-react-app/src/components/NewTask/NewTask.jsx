import React from 'react'
import FormTask from './FormTask'
import PropTypes from 'prop-types'
import { useState } from 'react'


function NewTask(props) {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const newHandler = async (textTask) => {

        setIsLoading(true);
        setError(null)

        try {
            const response = await fetch('https://react-my-example-default-rtdb.firebaseio.com/tasks.json', {
                body: JSON.stringify({ text: textTask }),
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            })
            if (!response.ok) throw new Error('Fetching tasks failed');

            const data = await response.json();

            const task = {
                id: data.name,
                text: textTask,
            }

            props.onAddTask(task);
        } catch (error) {
            setError(error.message || 'Add task failed');
        }
        setIsLoading(false);
    }
    return (
        <div>
            <FormTask isLoading={isLoading} onEnterTask={newHandler} />
            {error && <p>{error}</p>}
        </div>
    )
}

NewTask.propTypes = {
    onAddTask: PropTypes.func,
}


export default NewTask