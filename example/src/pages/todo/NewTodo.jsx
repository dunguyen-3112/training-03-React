import React from 'react'
import { useRef } from 'react'

function NewTodo(props) {

    const todoRef = useRef();

    const handleClick = (event) => {

        event.preventDefault();

        props.onSubmit(todoRef.current.value);
        todoRef.current.value = '';
        todoRef.current.focus();
    }

    return (
        <>
            <form >
                <input type="text" placeholder="new Todo" ref={todoRef} />
                <button onClick={handleClick}>New Todo</button>
            </form>
        </>
    )
}

export default NewTodo