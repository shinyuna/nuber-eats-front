import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Feed } from '../pages/client/Feed';
import { Header } from '../components/Header';
import { useMe } from '../hooks/useMe';
import { ConfirmEmail } from '../pages/user/ConfirmEmail';
import { EditProfile } from '../pages/user/EditProfile';
import { NotFound } from '../pages/404';
import { Search } from '../pages/client/Search';

const ClientRoutes = [
  <Route path="/" key="feed" exact>
    <Feed />
  </Route>,
  <Route path="/search" key="search" exact>
    <Search />
  </Route>,
  <Route path="/edit-profile" key="edit-profile">
    <EditProfile />
  </Route>,
];
const OwnerRoutes = [
  <Route path="/" key="feed" exact>
    <Feed />
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
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
