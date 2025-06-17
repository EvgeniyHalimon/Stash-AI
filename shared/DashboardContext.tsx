'use client';

import { createContext } from 'react';
import { IGoods, IHistory } from './types';

export interface IDashboardContext {
  goods: IGoods[];
  history: IHistory[];
  setGoods: (value: IGoods[]) => void;
  setHistory: (value: IHistory[]) => void;
  refetch: () => void;
}

const initialState: IDashboardContext = {
  goods: [],
  history: [],
  setGoods: val => val,
  setHistory: val => val,
  refetch: () => {},
};

const DashboardContext = createContext<IDashboardContext>(initialState);

export default DashboardContext;
