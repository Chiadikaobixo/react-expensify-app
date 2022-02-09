import React from "react";
import { connect } from 'react-redux'
import getVisibleExpenses from '../selectors/expenses'
import expenseTotal from "../selectors/expenseTotal";
import { Link } from 'react-router-dom'
import numeral from 'numeral'

export const ExpensesSummary = ({ count, total }) => {
    const expenseWord = count === 1 ? 'expense' : 'expenses'
    const formatedTotal = numeral(total / 100).format('$0,0.00')
    return (
        <div className="page-header">
            <div className="content-container">
                <h1
                    className="page-header__title">viewing <span>{count}</span>
                    {expenseWord} totalling <span>{formatedTotal}</span>
                </h1>
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Expense</Link>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    const visibleExpense = getVisibleExpenses(state.expenses, state.filters)
    return {
        count: visibleExpense.length,
        total: expenseTotal(visibleExpense)
    }
}
export default connect(mapStateToProps)(ExpensesSummary)