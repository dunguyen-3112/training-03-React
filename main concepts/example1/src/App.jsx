import './App.css'
import Avatar from './components/Avatar'
import LifeCycle from './components/cicle'
import Expenses from './components/Expenses'
import Login from './components/Login'
import State from './components/state'

function App() {

  const expenses = [
    {
      id: 'e1',
      title: 'Toilet Pager',
      amount: 94.12,
      date: new Date(2022, 7, 14),
    },
    {
      id: 'e2',
      title: 'New TV',
      amount: 799.49,
      date: new Date(2022, 7, 14),
    },
    {
      id: 'e3',
      title: 'Toilet Pager',
      amount: 294.12,
      date: new Date(2022, 7, 14),
    },
    {
      id: 'e4',
      title: 'Toilet Pager',
      amount: 94.12,
      date: new Date(2022, 7, 14),
    },
    {
      id: 'e5',
      title: 'New TV',
      amount: 799.49,
      date: new Date(2022, 7, 14),
    },
    {
      id: 'e6',
      title: 'Toilet Pager',
      amount: 294.12,
      date: new Date(2022, 7, 14),
    }
  ]




  return (
    <div className="App">

      <Login />
    </div>
  )
}

export default App
