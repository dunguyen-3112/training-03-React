import React from 'react'
import './ExpenseDate.css'

/**
 * 
 * @param {Date} date 
 * @returns 
 */
function ExpenseDate({ date }) {


    const month = date.toLocaleString('en-us', { month: 'long' })
    const day = date.toLocaleString('en-us', { day: '2-digit' })
    const year = date.getFullYear()
    return (
        <div className='expense-date'>
            <div className="expense-month">{month}</div>
            <div className="expense-year">{year}</div>
            <div className="expense-day">{day}</div>
        </div>
    )
}

export default ExpenseDate
