import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { startAddExpense, addExpense, editExpense, removeExpense } from "../../actions/expenses";
import expenses from '../fixtures/expenses'
import db from '../../firebase/firebase'
import { get, ref } from 'firebase/database';

const createMockStore = configureStore([thunk])

test('should setup addExpense action generator with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    })
})

test('should add expense to database and store', (done) => {
    const store = createMockStore({})
    const expenseData = {
        description: 'school run',
        amount: 3000,
        note: 'going for school run',
        createdAt: 36455522
    }
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        })
        return get(ref(db, `expenses/${actions[0].expense.id}`))
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData)
        done()
    })
})

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({})
    const expenseDefault = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    }
    store.dispatch(startAddExpense(expenseDefault)).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefault
            }
        })
        return get(ref(db, `expenses/${actions[0].expense.id}`))
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefault)
        done()
    })
})

// test('should setup addExpense action generator with defaults values', () => {
//     const expenseData = {
//         description: '',
//         note: '', 
//         amount: 0, 
//         createdAt: 0
//         }
//     const action = addExpense(expenseData);
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             ...expenseData,
//             id: expect.any(String)
//         }
//     })
// })

test('should test editExpenses', () => {
    const action = editExpense( '123abc', 'chiadi')
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id : '123abc',
        updates: 'chiadi'
    })
})

test('should test removeExpenses', () => {
    const action = removeExpense({id: '123abc'})
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})
