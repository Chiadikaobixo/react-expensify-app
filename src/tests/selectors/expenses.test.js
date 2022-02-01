import moment from 'moment';
import getVisibleExpenses from '../../selectors/expenses';
import expenses from '../fixtures/expenses'


test('should filter getVisibilityExpenses by text value', () => {
    const filters = {
        text: 'e',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }
    const result = getVisibleExpenses(expenses, filters)
    expect(result).toEqual([expenses[2], expenses[1]])
})

test('should filter getVisibilityExpenses by startDate value', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined
    }
    const result = getVisibleExpenses(expenses, filters)
    expect(result).toEqual([expenses[2], expenses[0]])
})

test('should filter getVisibilityExpenses by endDate value', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0).add(2, 'days')
    }
    const result = getVisibleExpenses(expenses, filters)
    expect(result).toEqual([expenses[0], expenses[1]])
})

test('should filter sortBy getVisibilityExpenses by date value', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }
    const result = getVisibleExpenses(expenses, filters)
    expect(result).toEqual([expenses[2], expenses[0],expenses[1]])
})

test('should filter sortBy getVisibilityExpenses by amount value', () => {
    const filters = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
    const result = getVisibleExpenses(expenses, filters)
    expect(result).toEqual([expenses[1], expenses[2], expenses[0]])
})