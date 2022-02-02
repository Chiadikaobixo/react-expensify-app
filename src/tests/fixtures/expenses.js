import moment from "moment"

export default [{
    id: '1',
    description: 'car',
    note: '',
    amount: 100,
    createdAt: 0
},{
    id: '2',
    description: 'rent',
    note: '',
    amount: 5000,
    createdAt: moment(0).subtract(4, 'days').valueOf()
},{
    id: '3',
    description: 'credit card',
    note: '',
    amount: 3500,
    createdAt: moment(0).add(4, 'days').valueOf()
}]

