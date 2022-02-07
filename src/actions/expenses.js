import db from '../firebase/firebase'
import { ref, push, get, remove, update} from 'firebase/database';

//Expense Action generator
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense 
})


export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        const {
          description = '',
          note = '', 
          amount = 0, 
          createdAt = 0
        } = expenseData
        const expense = {description, note, amount, createdAt}
        return push(ref(db, `users/${uid}/expenses`), {
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
  
export const startRemoveExpense = ({id} = {}) => {
    return(dispatch, getState) => {
        const uid = getState().auth.uid
       return remove(ref(db, `users/${uid}/expenses/${id}`)).then(() => {
        dispatch(removeExpense({id}))
       })
    }
}

export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

export const startEditExpense = (id, updates) => {
    return(dispatch, getState) => {
        const uid = getState().auth.uid
        return update(ref(db, `users/${uid}/expenses/${id}`), updates).then(() => {
            dispatch(editExpense(id, updates))
        })
    }
}

export const setExpense = (expenses) => ({
    type: 'SET_EXPENSE',
    expenses
})

export const startSetExpense = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return get(ref(db, `users/${uid}/expenses`)).then((snapshot) => {
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