import { useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
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
import MenuControl, { MenuInfo } from '../../components/Modal/MenuControl';
import RestaurantBanner from '../../components/RestaurantBanner';
import { deleteDish, deleteDishVariables } from '../../api-types/deleteDish';

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
const DELETE_DISH_MUTATION = gql`
  mutation deleteDish($input: DeleteDishInput!) {
    deleteDish(input: $input) {
      ok
      error
    }
  }
`;

interface IParams {
  id: string;
}

export const MyRestaurant = () => {
  const { id } = useParams<IParams>();

  const tabs = ['menu', 'sales'];
  const [tab, setTab] = useState('menu');
  const [popVisible, setPopVisible] = useState(false);
  const [selectMenu, setSelectMenu] = useState<MenuInfo>();

  const { data, loading } = useQuery<getRestaurantByOwner, getRestaurantByOwnerVariables>(MY_RESTAURANT_QUERY, {
    variables: {
      input: {
        restaurantId: +id,
      },
    },
  });

  const [deleteDish] = useMutation<deleteDish, deleteDishVariables>(DELETE_DISH_MUTATION, {
    refetchQueries: [
      {
        query: MY_RESTAURANT_QUERY,
        variables: {
          input: {
            restaurantId: +id,
          },
        },
      },
    ],
  });
  const onDeleteMenu = async () => {
    const confirm = window.confirm(`${selectMenu?.name} 메뉴를 정말 삭제하시겠습니까?`);
    try {
      if (!confirm || !selectMenu?.id) {
        return;
      }
      deleteDish({
        variables: {
          input: {
            dishId: selectMenu?.id,
          },
        },
      });
      onClose();
    } catch (error) {
      console.log('🚀 ~ onDeleteMenu ~ error', error);
    }
  };

  const onControler = (id: number, name: string) => {
    setPopVisible(true);
    setSelectMenu({ id: id, name: name });
  };
  const onClose = () => {
    setPopVisible(false);
  };

  useEffect(() => {
    return () => setPopVisible(false);
  }, []);

  return (
    <main>
      <RestaurantBanner
        coverImage={data?.getRestaurantByOwner.restaurant?.coverImage!}
        name={data?.getRestaurantByOwner.restaurant?.name!}
        category={data?.getRestaurantByOwner.restaurant?.category?.name!}
        address={data?.getRestaurantByOwner.restaurant?.address!}
      />
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
                data?.getRestaurantByOwner.restaurant?.menu.map(menu => (
                  <Menu key={menu.name} menu={menu} openControler={() => onControler(menu.id, menu.name)} />
                ))}
            </div>
            <MenuControl visible={popVisible} onClose={onClose} menuInfo={selectMenu!} deleteMenu={onDeleteMenu} />
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
