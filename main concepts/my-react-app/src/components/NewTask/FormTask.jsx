import React from 'react'
import { useRef } from 'react';
import PropTypes from 'prop-types';

function FormTask(props) {

    const taskInputRef = useRef(null);

    const submitHandler = event => {
        event.preventDefault();

        const taskValue = taskInputRef.current.value;
        props.onEnterTask(taskValue);
    }

    return (

        <form className='form' onSubmit={submitHandler}>
            <input type="text" name="txtTask" ref={taskInputRef} />
            <button type="submit">{props.isLoading ? 'Sending...' : 'Add Task'}</button>
        </form>
    )
}

FormTask.propTypes = {
    onEnterTask: PropTypes.func,
    isLoading: PropTypes.bool,
}

export default FormTask