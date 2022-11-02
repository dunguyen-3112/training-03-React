import React, { useState } from 'react'
import Card from './Card'
import ExpenseItem from './ExpenseItem'

function Expenses(props) {

    const [expenses, setExpenses] = useState(props.expenses)

    const list = expenses.map(exp => <ExpenseItem
        key={exp.id}
        id={exp.id}
        title={exp.title}
        amount={exp.amount}
        date={exp.date}
    />)

    const getParentElement = e => {
        let element = e.target;

        while (element && !element.className.match('card expense-item')) {
            element = element.parentElement
        }

        return element;

    }

    const handleClick = (e) => {
        const item = getParentElement(e)
        if (item !== null) {
            const id = item.getAttribute('data-id')
            setExpenses(expenses.filter(expense => expense.id !== id));

        }
    }

    return (
        <div>
            <Card className={props.className} onClick={handleClick}>
                {list}
            </Card>

        </div>
    )
}

export default Expenses