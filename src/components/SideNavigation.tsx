import React, { FC, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { authToken, isLoggedInVar } from '../apollo';
import { AUTH_TOKEN } from '../constants';

interface ISideNavProps {
  onCloseNav: () => void;
  show: boolean;
}

export const SideNavigation: FC<ISideNavProps> = ({ show, onCloseNav }) => {
  const stopPropagation = useCallback(e => {
    e.stopPropagation();
  }, []);
  const onLogout = useCallback(() => {
    sessionStorage.removeItem(AUTH_TOKEN);
    authToken(null);
    isLoggedInVar(false);
  }, [authToken, isLoggedInVar]);
  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen overflow-hidden bg-black bg-opacity-50 transition-all duration-500 ease-in-out ${
        show ? 'opacity-100 z-10' : 'opacity-0 -z-1'
      }`}
      onClick={onCloseNav}
    >
      <nav
        className={`h-full bg-white transition-all duration-500 ease-in-out max-w-xs p-6 ${
          show ? '' : 'transform -translate-x-80'
        }`}
        onClick={stopPropagation}
      >
        <p>Navigation</p>
        <Link to="/edit-profile">Go Profile</Link>
        <button onClick={onLogout}>Log out</button>
      </nav>
    </div>
  );
};
