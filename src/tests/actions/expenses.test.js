import { addExpense, editExpense, removeExpense } from "../../actions/expenses";

test('should setup addExpense action generator with provided values', () => {
    const expenseData = {
        description: 'soccer',
        note: 'chelsea player', 
        amount: 2000, 
        createdAt: 100
        }
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    })
})

test('should setup addExpense action generator with defaults values', () => {
    const expenseData = {
        description: '',
        note: '', 
        amount: 0, 
        createdAt: 0
        }
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    })
})

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
