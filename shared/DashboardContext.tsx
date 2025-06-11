'use client';

import { createContext } from 'react';
import { IGoods } from './types';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

export interface IDashboardContext {
  goods: IGoods[];
  setGoods: (value: IGoods[]) => void;
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<any, Error>>;
}

const dummyRefetch = async () =>
  Promise.resolve({
    data: undefined,
    error: null,
    isLoading: false,
    isFetching: false,
    isSuccess: true,
    isError: false,
    status: 'success',
    refetch: dummyRefetch,
  } as QueryObserverResult<any, Error>);

const initialState: IDashboardContext = {
  goods: [],
  setGoods: val => val,
  refetch: dummyRefetch,
};

const DashboardContext = createContext<IDashboardContext>(initialState);

export default DashboardContext;
