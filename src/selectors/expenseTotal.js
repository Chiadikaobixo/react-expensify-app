export default (expenses) => {
    return expenses.map((expense) => expense.amount)
    .reduce((previous, current) => previous + current, 0)
}