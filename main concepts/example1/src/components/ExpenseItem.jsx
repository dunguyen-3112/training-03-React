import React from 'react'
import Card from './Card'
import ExpenseDate from './ExpenseDate'
import './expenseItem.css'

function ExpenseItem({ id, title, amount, date }) {
  return (
    <Card className='expense-item' id={id}>
      <ExpenseDate date={date} />
      <div className="expense-item__description">
        <h2>{title}</h2>
        <div className="expense-item__price">{amount}</div>
      </div>
    </Card>
  )
}

export default ExpenseItem