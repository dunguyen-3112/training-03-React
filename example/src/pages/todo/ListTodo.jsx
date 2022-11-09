import React from 'react'

function ListTodo(props) {
    const listTodo = props.todos.map(todo => <li key={todo}><span>{todo}</span> <i className="material-icons btn-delete">delete</i></li>)

    const handleClick = event => {
        console.log(event.target)
    }

    return (
        <ul style={{ listStyle: 'none' }} onClick={handleClick}>
            {listTodo}
        </ul>
    )
}

export default ListTodo