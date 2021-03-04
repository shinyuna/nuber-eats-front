import React from 'react';
import { useReactiveVar } from '@apollo/client';
import { LoggedInRouter } from './routers/LoggedInRouter';
import { LoggedOutRouter } from './routers/LoggedOutRouter';
import { isLoggedInVar } from './apollo';

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
}

export default App;
