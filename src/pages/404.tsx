import React from 'react';
import { Link } from 'react-router-dom';
import { HelmetTitle } from '../components/HelmetTitle';

export const NotFound = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <HelmetTitle title={'Page not found | Nuber Eats'} />
    <h2 className="mb-4 text-2xl font-semibold">Page Not Found.</h2>
    <p className="mb-4 text-lg">The page you're looking for does not exist or has moved.</p>
    <Link to="/" className="hover:underline text-uber">
      Go back home &rarr;
    </Link>
  </div>
);
