import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { meQuery } from '../api-types/meQuery';

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verify
    }
  }
`;

export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery<meQuery>(ME_QUERY);
  if (!data || loading || error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-xl font-medium tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <div>
      <h1>{data.me.role}</h1>
    </div>
  );
};
