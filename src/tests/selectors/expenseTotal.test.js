import expenseTotal from "../../selectors/expenseTotal";
import expenses from '../fixtures/expenses';

test('should return 0 if no expenses', () => {
    const res = expenseTotal([])
    expect(res).toBe(0)
})

test('should correctly add up a single expense', () => {
    const res = expenseTotal([expenses[0]])
    expect(res).toBe(100)
})

test('should correctly add up all expense', () => {
    const res = expenseTotal(expenses)
    expect(res).toBe(8600)
})