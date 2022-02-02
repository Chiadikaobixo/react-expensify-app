import React from "react";
import { connect } from 'react-redux'
import getVisibleExpenses from '../selectors/expenses'
import expenseTotal from "../selectors/expenseTotal";
import numeral from 'numeral'

export const ExpensesSummary = ({count, total}) => {
    const expenseWord = count === 1 ? 'expense' : 'expenses'
    const formatedTotal = numeral(total /100).format('$0,0.00')
    return(
        <div>
           <h1>viewing {count} {expenseWord} totalling {formatedTotal}</h1>
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