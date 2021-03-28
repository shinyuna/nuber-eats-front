import React, { useCallback, useState, VFC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger } from '@fortawesome/pro-regular-svg-icons';
import { useMe } from '../hooks/useMe';
import { UberLogo } from './UberLogo';
import { SideNavigation } from './SideNavigation';

export const Header: VFC = () => {
  const { data } = useMe();
  const [showNav, setShowNav] = useState(false);
  const onShowNav = useCallback(() => {
    setShowNav(prev => !prev);
  }, [showNav]);
  const onCloseNav = useCallback(() => {
    setShowNav(false);
  }, [showNav]);
  return (
    <>
      {!data?.me.verify && (
        <div className="py-3 text-red-600 bg-red-200">
          <p className="text-center">Please verify your email</p>
        </div>
      )}
      <header className="w-full py-8">
        <div className="flex w-full px-10 mx-auto pw-10">
          <button className="mr-6 focus:outline-none" onClick={onShowNav}>
            <FontAwesomeIcon icon={faHamburger} className="text-2xl" />
          </button>
          <UberLogo style={'w-32'} />
        </div>
      </header>
      <SideNavigation show={showNav} onCloseNav={onCloseNav} />
    </>
  );
};
