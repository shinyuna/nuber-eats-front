import React, { FC, useCallback, useEffect } from 'react';
import { faSignOut, faUser } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import { authToken, client, isLoggedInVar } from '../apollo';
import { AUTH_TOKEN } from '../constants';

interface ISideNavProps {
  onCloseNav: () => void;
  user: string | undefined;
  show: boolean;
}

export const SideNavigation: FC<ISideNavProps> = ({ user, show, onCloseNav }) => {
  const location = useLocation();
  useEffect(() => {
    onCloseNav();
  }, [location, onCloseNav]);
  const stopPropagation = useCallback(e => {
    e.stopPropagation();
  }, []);
  const onLogout = useCallback(() => {
    sessionStorage.removeItem(AUTH_TOKEN);
    authToken(null);
    isLoggedInVar(false);
    client.clearStore();
  }, []);
  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen overflow-hidden bg-black bg-opacity-50 transition-all duration-500 ease-in-out ${
        show ? 'opacity-100 z-10' : 'opacity-0 -z-1'
      }`}
      onClick={onCloseNav}
    >
      <nav
        className={`h-full flex flex-col justify-between drect bg-white transition-all duration-500 ease-in-out max-w-xs p-6 ${
          show ? '' : 'transform -translate-x-80'
        }`}
        onClick={stopPropagation}
      >
        <div>
          <div className="flex">
            <div className="flex items-center justify-center w-12 h-12 text-center rounded-full bg-lime-100">
              <FontAwesomeIcon icon={faUser} className="text-xl text-uber" />
            </div>
            <div className="ml-4">
              <p>{user}</p>
              <Link to="/edit-profile" className="text-sm text-uber">
                View account
              </Link>
            </div>
          </div>
        </div>
        <button onClick={onLogout}>
          Log out &nbsp; <FontAwesomeIcon icon={faSignOut} />
        </button>
      </nav>
    </div>
  );
};
