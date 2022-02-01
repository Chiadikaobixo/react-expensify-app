import moment from 'moment';
import {
    setTextFilter,
    sortByAmount,
    sortByDate,
    setStartDate,
    setEndDate
} from "../../actions/filters";

test('should setup setTextFilter action generator with provided values', () => {
    const text = 'new text'
    const action = setTextFilter(text)
    expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text
   })
})

test('should setup setTextFilter action generator with default values', () => {
    const action = setTextFilter()
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    })
})

test('should setup sortByAmount action generator', () => {
    const action = sortByAmount();
    expect(action).toEqual({type: 'SORT_BY_AMOUNT'})
})

test('should setup sortByDate action generator', () => {
    const action = sortByDate()
    expect(action).toEqual({type: 'SORT_BY_DATE'})
})

test('should setup setStartDate action generator', () => {
    const action = setStartDate(moment(0))
    expect(action).toEqual({
        type: 'SET_START_DATE',
        date: moment(0)
    })
})

test('should setup setEndDate action generator', () => {
    const action = setEndDate(moment(0))
    expect(action).toEqual({
        type: 'SET_END_DATE',
        date: moment(0)
    })
})