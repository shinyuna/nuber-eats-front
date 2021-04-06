import React from 'react';
import { Link } from 'react-router-dom';
import { HelmetTitle } from '../components/HelmetTitle';
import { NoData } from '../components/NoData';

export const NotFound: React.VFC = () => (
  <div>
    <HelmetTitle title={'Page not found | Nuber Eats'} />
    <NoData
      emoji={'🥝🥬'}
      title="Nothing to eat here..."
      sub="Let’s discover something delicious."
      button="Find Food"
      link="/"
    />
  </div>
);
