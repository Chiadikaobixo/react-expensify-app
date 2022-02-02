import React from "react";
import {shallow} from 'enzyme'
import {ExpensesSummary} from "../../components/ExpensesSummary";

test('should correctly render Expenses summary with 1 Expense', () => {
    const wrapper = shallow(<ExpensesSummary count={1} total={234} />)
    expect(wrapper).toMatchSnapshot()
})

test('should correctly render Expenses summary with multiple Expenses', () => {
    const wrapper = shallow(<ExpensesSummary count={56} total={2347634190} />)
    expect(wrapper).toMatchSnapshot()
})