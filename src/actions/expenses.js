import db from '../firebase/firebase'
import { ref, push, get} from 'firebase/database';

//Expense Action generator
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense 
})

export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {
          description = '',
          note = '', 
          amount = 0, 
          createdAt = 0
        } = expenseData
        const expense = {description, note, amount, createdAt}
        return push(ref(db, 'expenses'), {
                ...expense
            }).then((ref) => {
                dispatch(addExpense({
                    id: ref.key,
                    ...expense
                }))
            })
    }
}
  
export const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})
  
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

export const setExpense = (expenses) => ({
    type: 'SET_EXPENSE',
    expenses
})

export const startSetExpense = () => {
    return (dispatch) => {
        return get(ref(db, 'expenses')).then((snapshot) => {
            const expenses = []
            
            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            dispatch(setExpense(expenses))
        })
    }
}