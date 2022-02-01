import React from "react";
import { shallow } from 'enzyme'
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import {filters, altFilters} from '../fixtures/filters'
import moment from "moment";
import { DateRangePicker } from 'react-dates'

let setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate, wrapper

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByAmount = jest.fn();
    sortByDate = jest.fn(); 
    setStartDate = jest.fn(); 
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters
        filters = {filters}
        setTextFilter = {setTextFilter}
        sortByAmount = {sortByAmount}
        sortByDate = {sortByDate}
        setStartDate = {setStartDate}
        setEndDate = {setEndDate}
        />
    );
});

test('should render ExpenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with altFilters data correctly', () => {
    wrapper.setProps({
        filters: altFilters
    })
    expect(wrapper).toMatchSnapshot();
});

test('should handle textChange', () => {
    const value = 'goal'
    wrapper.find('input').simulate('change', {
        target:{ value }
    });
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sortBy date', () => {
    const value = 'date'
    wrapper.setProps({
        filters: altFilters
    });
    wrapper.find('select').simulate('change', {
        target:{ value }
    });
    expect(sortByDate).toHaveBeenCalled();
});

test('should sortBy amount', () => {
    const value = 'amount'
    wrapper.find('select').simulate('change', {
        target:{ value }
    });
    expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date change', () => {
    const startDate = moment(0). add(4, 'years');
    const endDate = moment(0).add(8, 'years');
    wrapper.find(DateRangePicker).prop('onDatesChange')({startDate, endDate});
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle date focuschange', () => {
    const calenderFocused = null
    wrapper.find(DateRangePicker).prop('onFocusChange')(calenderFocused);
    expect(wrapper.state('calenderFocused')).toBe(calenderFocused);
});