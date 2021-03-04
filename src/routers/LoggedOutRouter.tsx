import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { CreateAccount } from '../pages/user/CreateAccount';
import { Login } from '../pages/user/Login';

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Redirect exact path="/" to="/login" />
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
};
