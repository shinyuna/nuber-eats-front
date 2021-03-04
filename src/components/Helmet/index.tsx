import React from 'react';
import { Helmet } from 'react-helmet-async';

interface IHelmetProps {
  title: string;
}

export const HelmetTitle: React.FC<IHelmetProps> = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};
