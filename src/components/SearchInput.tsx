import React, { useCallback, useEffect } from 'react';
import { faSearch } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router';

interface IFormProps {
  searchTerm: string;
}

export const SearchInput: React.VFC = () => {
  const history = useHistory();
  const location = useLocation();
  const { register, handleSubmit, getValues, setValue, watch } = useForm<IFormProps>();
  const { searchTerm } = watch();

  useEffect(() => {
    const [type, category] = location.search.split('=');
    if (location.pathname === '/search' || (type.includes('category') && category)) {
      setValue('searchTerm', decodeURI(category));
    } else {
      setValue('searchTerm', '');
    }
  }, [location, setValue]);

  const onSearchSubmit = useCallback(() => {
    const { searchTerm } = getValues();
    history.push({
      pathname: '/search',
      search: `term=${searchTerm}`,
    });
  }, [getValues, history]);

  const clearSearchTerm = useCallback(() => {
    setValue('searchTerm', '');
  }, [setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSearchSubmit)}
      className="flex w-3/5 max-w-2xl p-4 transition-all duration-300 ease-in-out bg-gray-100 border-b-2 sm:w-11/12 focus-within:border-black"
    >
      <span>
        <FontAwesomeIcon icon={faSearch} className="mr-4 text-lg" />
      </span>
      <input
        ref={register({ required: true })}
        type="text"
        name="searchTerm"
        placeholder="What are you craving?"
        className="w-full bg-transparent group"
      />
      {searchTerm && (
        <span onClick={clearSearchTerm} className="text-sm text-gray-400 cursor-pointer">
          Clear
        </span>
      )}
    </form>
  );
};
