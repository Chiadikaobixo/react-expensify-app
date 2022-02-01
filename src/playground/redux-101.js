import { createStore } from 'redux'

//Action generators
const incrementCount = ({incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy
})

const decrementCount = ({decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
})

const resetCount = () => ({
    type: 'RESET'
})

const setCount = ({count}) => ({
    type: 'SET',
    count
})

//Reducers
//Reducers are pure function
//Never change state or action
      //REDUCER
const countReducer = (state = {count: 0}, action) => {
    switch (action.type) {
        case 'INCREMENT':
          return { 
            count: state.count + action.incrementBy
        }
        case 'DECREMENT':
          return {
            count: state.count - action.decrementBy
        }
        case 'RESET':
          return {
            count: 0 
        }
        case 'SET':
            return {
            count: action.count
        }
        default:
          return state
    }
}
const store = createStore(countReducer)

store.subscribe(() => {
    console.log(store.getState())
})


store.dispatch(incrementCount({incrementBy: 2000}))
store.dispatch(incrementCount())

store.dispatch(decrementCount({decrementBy: 500}))
store.dispatch(decrementCount())

store.dispatch(resetCount())

store.dispatch(setCount({count: 108}))