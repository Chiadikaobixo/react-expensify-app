import expensesReducer from "../../reducers/expenses";
import expenses from '../fixtures/expenses'

test('should setup default expensesReducer', () => {
    const state = expensesReducer(undefined, {type: '@@INIT'})
    expect(state).toEqual([])
})

test('should setup addexpense', () => {
    const expense = {
        id: '223',
        description: 'hotel bill',
        note: 'my first day in a hotel', 
        amount: 2000, 
        createdAt: 100
    };
    const action = {
        type: 'ADD_EXPENSE',
        expense
    }
   const state = expensesReducer(expenses, action)
   expect(state).toEqual([
       ...expenses,
       expense
   ])
})

test('should setup removeExpense with id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([expenses[0], expenses[2]])
})

test('should not removeExpense if id is not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})

test('should setup editExpense', () => {
    const amount = 1000
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[2].id,
        updates: {
            amount
        }
    }
    const state = expensesReducer(expenses, action)
    expect(state[2].amount).toEqual(amount)
})

test('should setup editExpense if id is not found', () => {
    const amount = 1000
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-2',
        updates: {
            amount
        }
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})

test('should set expenses', () => {
    const action = {
        type: 'SET_EXPENSE',
        expenses: [expenses[1]]
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([expenses[1]])
})