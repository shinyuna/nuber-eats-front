import React from 'react';
import { Link } from 'react-router-dom';
import { HelmetTitle } from '../components/HelmetTitle';

export const NotFound: React.VFC = () => (
  <div className="max-w-md mx-auto mt-40 text-center">
    <HelmetTitle title={'Page not found | Nuber Eats'} />
    <p className="text-8xl">🥝🥬</p>
    <h4 className="mt-10 text-4xl">Nothing to eat here...</h4>
    <p className="my-5 text-lg font-light">Let’s discover something delicious.</p>
    <Link to="/" className="block w-full p-4 text-white bg-lime-600">
      Find Food &rarr;
    </Link>
  </div>
);
