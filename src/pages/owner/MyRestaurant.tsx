import { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { getRestaurantByOwner, getRestaurantByOwnerVariables } from '../../api-types/getRestaurantByOwner';
import { DISH_FRAGMENT, ORDERS_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragments';
import { NoData } from '../../components/NoData';
import { Menu } from '../../components/Menu';
import {
  VictoryChart,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryLine,
  VictoryAxis,
  VictoryLabel,
  VictoryTooltip,
} from 'victory';

export const MY_RESTAURANT_QUERY = gql`
  query getRestaurantByOwner($input: RestaurantInput!) {
    getRestaurantByOwner(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
        orders {
          ...OrderParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
  ${ORDERS_FRAGMENT}
`;
interface IParams {
  id: string;
}

export const MyRestaurant = () => {
  const tabs = ['menu', 'sales'];
  const [tab, setTab] = useState('menu');
  const { id } = useParams<IParams>();
  const { data, loading } = useQuery<getRestaurantByOwner, getRestaurantByOwnerVariables>(MY_RESTAURANT_QUERY, {
    variables: {
      input: {
        restaurantId: +id,
      },
    },
  });
  useEffect(() => {}, [data, loading]);

  return (
    <main>
      <div
        className="relative bg-gray-200 bg-center bg-cover py-36 "
        style={{
          backgroundImage: `url(${data?.getRestaurantByOwner.restaurant?.coverImage})`,
        }}
      >
        <div
          className="absolute bottom-0 left-0 flex items-end w-full h-1/2"
          style={{ background: `linear-gradient(0deg, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0) 100%)` }}
        >
          <div className="px-10 py-6 text-white sm:px-5">
            <div>
              <h4 className="page-h4">{data?.getRestaurantByOwner.restaurant?.name}</h4>
              <h5 className="mb-1 text-sm">{data?.getRestaurantByOwner.restaurant?.category?.name}</h5>
              <p className="text-sm">
                {data?.getRestaurantByOwner.restaurant?.address} •{' '}
                <button className="font-medium underline">More info</button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-10 sm:px-5">
        <div className="py-6">
          <Link to={`/restaurant/${id}/add-dish`} className="inline-block mr-4 text-sm bg-gray-800 rounded-full button">
            Add Dish &rarr;
          </Link>
          <button className="text-sm rounded-full button">Buy Promotion &rarr;</button>
        </div>
        <div className="mb-8 border-b border-gray-200">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-4 text-sm capitalize ${t === tab && 'border-b border-black'}`}
            >
              {t}
            </button>
          ))}
        </div>
        {tab === 'menu' ? (
          <div>
            <h4 className="mb-5 text-xl font-medium">{data?.getRestaurantByOwner.restaurant?.name} Menu</h4>
            {data?.getRestaurantByOwner.restaurant?.menu.length === 0 && (
              <NoData emoji={'🍽'} title={'You have no menu.'} sub={'Try adding a menu.'} />
            )}
            <div className="grid grid-cols-3 gap-10 sm:grid-cols-1 md:grid-cols-2">
              {!loading &&
                data?.getRestaurantByOwner.restaurant?.menu.map(menu => <Menu key={menu.name} menu={menu} />)}
            </div>
          </div>
        ) : (
          <div>
            <h4 className="mb-5 text-xl font-medium">{data?.getRestaurantByOwner.restaurant?.name} Sales</h4>
            <div className="m-auto">
              <VictoryChart
                width={window.innerWidth}
                height={500}
                theme={VictoryTheme.material}
                domainPadding={50}
                containerComponent={<VictoryVoronoiContainer />}
              >
                <VictoryLine
                  labels={datum => `${datum.y} ₩`}
                  labelComponent={<VictoryTooltip renderInPortal dy={20} />}
                  data={data?.getRestaurantByOwner.restaurant?.orders.map(order => ({
                    x: order.createdAt,
                    y: order.total,
                  }))}
                  interpolation="natural"
                  style={{
                    data: {
                      strokeWidth: 5,
                    },
                  }}
                />
                <VictoryAxis
                  tickLabelComponent={<VictoryLabel renderInPortal />}
                  tickFormat={tick => new Date(tick).toLocaleDateString('ko')}
                />
              </VictoryChart>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
