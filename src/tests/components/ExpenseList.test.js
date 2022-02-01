import React from "react";
import { shallow } from 'enzyme'
import { ExpenseList } from "../../components/ExpenseList";
import expenses from "../fixtures/expenses";

test('show render expenseList with expenses', () => {
    const wrapper = shallow(<ExpenseList expenses={expenses}/>)
    expect(wrapper).toMatchSnapshot()
})

test('show render expenseList with no expenses', () => {
    const wrapper = shallow(<ExpenseList expenses={[]}/>)
    expect(wrapper).toMatchSnapshot()
})
