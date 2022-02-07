import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter, { history } from './routers/AppRouter'
import configureStore from './store/configureStore'
import { login, logout } from './actions/auth'
import { startSetExpense } from './actions/expenses'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import 'react-dates/lib/css/_datepicker.css';
import './firebase/firebase'
import { onAuthStateChanged, getAuth} from 'firebase/auth'


const store = configureStore()

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)
ReactDOM.render(<p>Loading...</p>, document.getElementById('app'))

let hasRendered = false
const renderApp = () => {
    if(!hasRendered){
        ReactDOM.render(jsx, document.getElementById('app'))
        hasRendered = true
    }
}

const auth = getAuth()

onAuthStateChanged( auth, user => {
    if (user){
        store.dispatch(login(user.uid))
        store.dispatch(startSetExpense()).then(() => {
            renderApp()
            if(history.location.pathname === '/'){
                history.push('/dashboard')
            }
        })
    }else{
        store.dispatch(logout())
        renderApp()
        history.push('/')
    }
})