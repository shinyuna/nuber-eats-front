import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Feed } from '../pages/client/Feed';
import { Header } from '../components/Header';
import { useMe } from '../hooks/useMe';
import { ConfirmEmail } from '../pages/user/ConfirmEmail';
import { EditProfile } from '../pages/user/EditProfile';
import { NotFound } from '../pages/404';
import { Search } from '../pages/client/Search';
import { RestaurantDetail } from '../pages/client/RestaurantDetail';
import { MyRestaurant } from '../pages/owner/MyRestaurant';
import { AddRestaurant } from '../pages/owner/AddRestaurant';

const commonRoutes = [
  { path: '/edit-profile', component: <EditProfile /> },
  { path: '/confirm', component: <ConfirmEmail /> },
];
const clientRoutes = [
  { path: '/', component: <Feed /> },
  { path: '/search', component: <Search /> },
  { path: '/restaurant/:id', component: <RestaurantDetail /> },
];
const ownerRoutes = [
  { path: '/', component: <MyRestaurant /> },
  { path: '/add-restaurant', component: <AddRestaurant /> },
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
        {data.me.role === 'Owner' &&
          ownerRoutes.map(route => (
            <Route path={route.path} key={route.path} exact>
              {route.component}
            </Route>
          ))}
        {data.me.role === 'Client' &&
          clientRoutes.map(route => (
            <Route path={route.path} key={route.path} exact>
              {route.component}
            </Route>
          ))}
        {commonRoutes.map(route => (
          <Route path={route.path} key={route.path} exact>
            {route.component}
          </Route>
        ))}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
