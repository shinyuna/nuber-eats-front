import React from 'react';
import { Link } from 'react-router-dom';

interface INoDataProps {
  emoji: string;
  title: string;
  sub: string;
  link?: string;
  button?: string;
}

export const NoData: React.FC<INoDataProps> = ({ emoji, title, sub, link, button }) => {
  return (
    <div className={`max-w-md mx-auto text-center ${link ? 'mt-40' : 'mt-20'}`}>
      <p className="text-8xl">{emoji}</p>
      <h4 className="mt-10 text-4xl">{title}</h4>
      <p className="my-5 text-lg font-light">{sub}</p>
      {link && (
        <Link to={link} className="block w-full p-4 text-white bg-lime-600">
          {button} &rarr;
        </Link>
      )}
    </div>
  );
};
