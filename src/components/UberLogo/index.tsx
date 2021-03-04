import React from 'react';
import uberLogo from '../../assets/images/eats-logo.svg';

interface ILogoProps {
  style: string;
}

export const UberLogo: React.FC<ILogoProps> = ({ style }) => (
  <h1>
    <img src={uberLogo} alt="logo" className={style} />
  </h1>
);
