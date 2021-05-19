import { gql, useMutation } from '@apollo/client';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { createRestaurant, createRestaurantVariables } from '../../api-types/createRestaurant';
import { client } from '../../apollo';
import { FormButton } from '../../components/FormButton';
import { FormError } from '../../components/FormError';
import { HelmetTitle } from '../../components/HelmetTitle';
import { useMe } from '../../hooks/useMe';
import { s3ImageUpload } from '../../utils';
import { MY_RESTAURANTS_QUERY } from './MyRestaurants';

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      ok
      error
      restaurantId
    }
  }
`;

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
  file: FileList;
  fileName: string;
}

export const AddRestaurant: React.VFC = () => {
  const history = useHistory();
  const { data: userData } = useMe();
  const [uploading, setUploading] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const onCompleted = useCallback(
    (data: createRestaurant) => {
      const {
        createRestaurant: { ok, restaurantId },
      } = data;
      if (ok) {
        setUploading(false);
        const { name, address, categoryName } = getValues();
        const queryResult = client.readQuery({ query: MY_RESTAURANTS_QUERY });
        client.writeQuery({
          query: MY_RESTAURANTS_QUERY,
          data: {
            getRestaurantsByOwner: {
              ...queryResult.getRestaurantsByOwner,
              restaurants: [
                ...queryResult.getRestaurantsByOwner.restaurants,
                {
                  id: restaurantId,
                  name,
                  address,
                  coverImage: imgUrl,
                  category: {
                    name: categoryName,
                    __typename: 'Category',
                  },
                  isPromoted: false,
                  __typename: 'Restaurant',
                },
              ],
            },
          },
        });
        history.push('/');
      }
    },
    [imgUrl]
  );
  const [createRestaurant, { data }] = useMutation<createRestaurant, createRestaurantVariables>(
    CREATE_RESTAURANT_MUTATION,
    { onCompleted }
  );
  const { register, getValues, formState, handleSubmit, setValue } = useForm<IFormProps>({
    mode: 'onChange',
  });
  const updateFileName = useCallback(() => {
    const { file } = getValues();
    setValue('fileName', file[0].name);
  }, [getValues().fileName]);
  const onSubmit = useCallback(async () => {
    try {
      setUploading(true);
      const { name, address, categoryName, file } = getValues();
      const url = await s3ImageUpload(file, userData?.me.id + '', 'restaurant_cover_img');
      setImgUrl(url);
      createRestaurant({
        variables: {
          input: {
            name,
            address,
            categoryName,
            coverImage: url,
          },
        },
      });
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  }, [uploading]);
  return (
    <main className="px-5 md:px-10">
      <HelmetTitle title={'Create Restaurant | Nuber Eats'} />
      <form onSubmit={handleSubmit(onSubmit)} className="grid max-w-screen-sm gap-3 mx-auto mt-10">
        <h1 className="my-5 text-3xl font-semibold">Add Your Restaurant</h1>
        <input
          className="input"
          name="name"
          type="text"
          ref={register({
            required: 'Name is required.',
          })}
          placeholder="Restaurant Name"
        />
        <input
          className="input"
          name="address"
          type="text"
          ref={register({
            required: 'Address is required.',
          })}
          placeholder="Restaurant Address"
        />
        <input
          className="input"
          name="categoryName"
          type="text"
          ref={register({
            required: 'Category name is required.',
          })}
          placeholder="Restaurant Category"
        />
        <div className="grid w-full grid-cols-4 p-0">
          <input
            id="cover_image"
            className="hidden"
            type="file"
            name="file"
            ref={register({
              required: true,
            })}
            onChange={updateFileName}
          />
          <input
            readOnly
            className="col-start-1 col-end-4 px-4 focus:outline-none"
            type="text"
            name="fileName"
            ref={register()}
            placeholder="Restaurant Cover Image"
          />
          <label className="text-sm button bg-lime-500" htmlFor="cover_image">
            Upload File
          </label>
        </div>
        <FormButton actionText={'Create Restaurant'} isLoading={uploading} isValid={formState.isValid} />
        {data?.createRestaurant.error && <FormError errMsg={data?.createRestaurant.error} />}
      </form>
    </main>
  );
};
