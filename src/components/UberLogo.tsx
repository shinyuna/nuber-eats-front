import React from 'react';
import { Link } from 'react-router-dom';
import uberLogo from '../assets/images/eats-logo.svg';

interface ILogoProps {
  style?: string;
}

export const UberLogo: React.FC<ILogoProps> = ({ style = 'w-36' }) => (
  <h1>
    <Link to="/">
      <img src={uberLogo} alt="Uber eats logo" className={style} />
    </Link>
  </h1>
);
