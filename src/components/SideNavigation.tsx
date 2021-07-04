import React, { FC, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faUser, faUtensilsAlt, faHatChef, faReceipt, faHeart } from '@fortawesome/pro-regular-svg-icons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { authToken, client, isLoggedInVar } from '../apollo';
import { AUTH_TOKEN } from '../constants';

interface ISideNavProps {
  onCloseNav: () => void;
  user?: string;
  role?: string;
  show: boolean;
}

const nav = {
  owner: [
    {
      icon: faUtensilsAlt,
      title: 'My Restaurants',
      path: '/',
    },
    {
      icon: faHatChef,
      title: 'Create Restaurant',
      path: '/add-restaurant',
    },
    {
      icon: faReceipt,
      title: 'Orders',
      path: '',
    },
  ],
  client: [
    {
      icon: faUtensilsAlt,
      title: 'Food Feed',
      path: '/',
    },
    {
      icon: faHeart,
      title: 'Like Restaurants',
      path: '/add-restaurant',
    },
    {
      icon: faReceipt,
      title: 'My Orders',
      path: '',
    },
  ],
  driver: [
    {
      icon: faUtensilsAlt,
      title: 'My Restaurants',
      path: '/',
    },
    {
      icon: faHatChef,
      title: 'Create Restaurant',
      path: '/add-restaurant',
    },
    {
      icon: faReceipt,
      title: 'Orders',
      path: '',
    },
  ],
};

export const SideNavigation: FC<ISideNavProps> = ({ user, show, role, onCloseNav }) => {
  const location = useLocation();
  const history = useHistory()

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
    history.push('/')
  }, [history]);

  const getNav = useCallback((roleStr) => {
    if (roleStr === 'Client') {
      return nav['client']
    } else if (roleStr === 'Owner') {
      return nav['owner']
    } else {
      return nav['driver']
    }
  }, [])

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen overflow-hidden bg-black bg-opacity-50 transition-all duration-500 ease-in-out z-50 ${
        show ? 'opacity-100 ' : 'opacity-0 -z-1'
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
            <div className="flex items-center justify-center w-12 h-12 text-center bg-white rounded-full shadow-inner">
              <FontAwesomeIcon icon={faUser} className="text-xl text-uber" />
            </div>
            <div className="ml-5">
              <p>{user}</p>
              <Link to="/edit-profile" className="text-sm text-uber">
                View account
              </Link>
            </div>
          </div>
          <div className="mt-10">
            {getNav(role).map(menu => (
              <div
                className={`flex items-center my-5 ${location.pathname === menu.path ? 'text-uber' : ''}`}
                key={menu.path}
              >
                <FontAwesomeIcon icon={menu.icon} className="mx-5 text-lg " />
                <Link to={menu.path}>{menu.title}</Link>
              </div>
            ))}
          </div>
        </div>
        <button onClick={onLogout} className="hover:text-uber">
          Log out &nbsp; <FontAwesomeIcon icon={faSignOut} />
        </button>
      </nav>
    </div>
  );
};
