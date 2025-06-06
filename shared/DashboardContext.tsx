'use client';

import { createContext } from 'react';
import { IGoods } from './types';

export interface IDashboardContext {
  goods: IGoods[];
  setGoods: (value: IGoods[]) => void;
}

const initialState: IDashboardContext = {
  goods: [],
  setGoods: val => val,
};

const DashboardContext = createContext<IDashboardContext>(initialState);

export default DashboardContext;
