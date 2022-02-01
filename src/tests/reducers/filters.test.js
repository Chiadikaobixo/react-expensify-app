import filtersReducer from "../../reducers/filters";
import moment from 'moment'

test('should test default filter reducer', () => {
    const state = filtersReducer(undefined, {type: '@@INIT'})
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
})

test('should test setTextFilter', () => {
    const text = 'my house rent'
    const action = {
        type: 'SET_TEXT_FILTER',
        text
    }
    const state = filtersReducer(undefined, action)
    expect(state.text).toEqual(text)
})

test('should test sortBy amount', () => {
    const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'})
    expect(state.sortBy).toEqual('amount')
})

test('should test sortBy data', () => {
    const currentState = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
    const state = filtersReducer(currentState, {type: 'SORT_BY_DATE'})
    expect(state.sortBy).toBe('date')
})

test('should text setStartDate', () => {
    const date = moment()
    const action = {
        type : 'SET_START_DATE',
        date
    }
    const state = filtersReducer(undefined, action)
    expect(state.startDate).toEqual(date)
})

test('should text setEndDate', () => {
    const date = moment()
    const action = {
        type : 'SET_END_DATE',
        date
    }
    const state = filtersReducer(undefined, action)
    expect(state.endDate).toEqual(date)
})