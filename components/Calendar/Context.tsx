'use client';

import { createContext } from 'react';

export interface IAppContext {
  month: number;
  setMonth: (value: number) => void;
  year: number;
  setYear: (value: number) => void;
  number: number;
  setNumber: (value: number) => void;
}

const initialState: IAppContext = {
  month: 0,
  setMonth: val => val,
  year: 0,
  setYear: val => val,
  number: 0,
  setNumber: val => val,
};

const AppContext = createContext<IAppContext>(initialState);

export default AppContext;
