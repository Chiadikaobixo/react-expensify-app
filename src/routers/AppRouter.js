import React from 'react'
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import NotFoundPage from '../components/NotFoundPage';
import createHistory from 'history/createBrowserHistory'
import LoginPage from '../components/LoginPage';
import { Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute';

export const history = createHistory()

const AppRouter = () => (
    <Router history={history}>
    <div>
      <Switch>
          <PublicRoute path="/" component={LoginPage} exact={true} />
          <PrivateRoute path="/dashboard" component={ExpenseDashboardPage}/>
          <PrivateRoute path="/create" component={AddExpensePage}/>
          <PrivateRoute path="/edit/:id" component={EditExpensePage}/>
          <Route component={NotFoundPage}/>
      </Switch>
    </div>
  </Router>
)

export default AppRouter