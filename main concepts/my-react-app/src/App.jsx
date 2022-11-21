import React, { useEffect, useState } from 'react'
import './App.css'
import NewTask from './components/NewTask/NewTask'
import Tasks from './components/Tasks/Tasks'


function App() {

    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchTasks = async function () {

        setIsLoading(true)

        try {
            const response = await fetch('https://react-my-example-default-rtdb.firebaseio.com/tasks.json');

            if (!response.ok)
                throw new Error('Fetching tasks failed');

            const data = await response.json();
            const tasks = []
            for (const key in data) {
                tasks.push({ id: key, text: data[key].text })
            }
            setItems(tasks);
        } catch (error) {
            setError(error.message || 'Fetching task failed')
        }

        setIsLoading(false);
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    const taskAddHandler = (task) => {
        setItems(prev => [...prev, task])
    }

    return (
        <React.Fragment>
            <NewTask onAddTask={taskAddHandler} />
            <Tasks
                items={items}
                isLoading={isLoading}
                error={error}
                onFetch={fetchTasks}
            />
        </React.Fragment>
    )
}

export default App
