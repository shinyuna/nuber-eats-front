import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Restaurant } from '../pages/client/Restaurant';
import { Header } from '../components/Header';
import { useMe } from '../hooks/useMe';
import { ConfirmEmail } from '../pages/user/ConfirmEmail';
import { EditProfile } from '../pages/user/EditProfile';

const ClientRoutes = [
  <Route path="/" key="main" exact>
    <Restaurant />
  </Route>,
  <Route path="/edit-profile" key="edit-profile">
    <EditProfile />
  </Route>,
];
const OwnerRoutes = [
  <Route path="/" key="main" exact>
    <Restaurant />
  </Route>,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-xl font-medium tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === 'Owner' && OwnerRoutes}
        {data.me.role === 'Client' && ClientRoutes}
        <Route path="/confirm">
          <ConfirmEmail />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
