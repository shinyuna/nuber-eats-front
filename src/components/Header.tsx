import React, { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger } from '@fortawesome/pro-regular-svg-icons';
import { useMe } from '../hooks/useMe';
import { UberLogo } from './UberLogo';
import { SideNavigation } from './SideNavigation';
import { SearchInput } from './SearchInput';

export const Header: React.VFC = () => {
  const { data } = useMe();
  const [showNav, setShowNav] = useState(false);
  const onShowNav = useCallback(() => {
    setShowNav(prev => !prev);
  }, []);
  const onCloseNav = useCallback(() => {
    setShowNav(false);
  }, []);
  return (
    <>
      {!data?.me.verify && (
        <div className="py-3 text-red-600 bg-red-200">
          <p className="text-center">Please verify your email</p>
        </div>
      )}
      <header className="flex items-center w-full px-10 py-4 sm:px-5">
        <div className="flex flex-1 w-full">
          <button className="mr-6" onClick={onShowNav}>
            <FontAwesomeIcon icon={faHamburger} className="text-2xl" />
          </button>
          <UberLogo logoSize="w-32 sm:hidden" />
        </div>
        <SearchInput />
      </header>
      <SideNavigation show={showNav} user={data?.me.email} role={data?.me.role+""} onCloseNav={onCloseNav} />
    </>
  );
};
