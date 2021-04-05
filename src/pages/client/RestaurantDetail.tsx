import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router';
import { findRestaurantById, findRestaurantByIdVariables } from '../../api-types/findRestaurantById';
import { RESTAURANT_FRAGMENT } from '../../fragments';

const RESTAURANT_QUERY = gql`
  query findRestaurantById($input: RestaurantInput!) {
    findRestaurantById(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

interface IRestaurantParams {
  id: string;
}

export const RestaurantDetail = () => {
  const params = useParams<IRestaurantParams>();
  const { loading, data } = useQuery<findRestaurantById, findRestaurantByIdVariables>(RESTAURANT_QUERY, {
    variables: {
      input: {
        restaurantId: +params.id,
      },
    },
  });
  return (
    <main>
      <div
        className="relative bg-gray-200 bg-center bg-cover py-36 "
        style={{
          backgroundImage: `url(${data?.findRestaurantById.restaurant?.coverImage})`,
        }}
      >
        <div
          className="absolute bottom-0 left-0 flex items-end w-full h-1/2"
          style={{ background: `linear-gradient(0deg, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0) 100%)` }}
        >
          <div className="px-10 py-6 text-white">
            <div>
              <h4 className="mb-3 text-3xl font-semibold">{data?.findRestaurantById.restaurant?.name}</h4>
              <h5 className="mb-1 text-sm">{data?.findRestaurantById.restaurant?.category?.name}</h5>
              <p className="text-sm">
                {data?.findRestaurantById.restaurant?.address} •{' '}
                <button className="font-medium underline focus:outline-none">More info</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
