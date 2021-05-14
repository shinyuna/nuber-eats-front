import React from 'react';
import { Link } from 'react-router-dom';
import uberLogo from '../assets/images/eats-logo.svg';

interface ILogoProps {
  logoSize?: string;
}

export const UberLogo: React.FC<ILogoProps> = ({ logoSize = 'w-36' }) => (
  <h1>
    <Link to="/">
      <img src={uberLogo} alt="Uber eats logo" className={logoSize} />
    </Link>
  </h1>
);
