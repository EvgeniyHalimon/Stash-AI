'use client';

import { createContext } from 'react';

export interface ICalendarContext {
  month: number;
  setMonth: (value: number) => void;
  year: number;
  setYear: (value: number) => void;
  number: number;
  setNumber: (value: number) => void;
}

const initialState: ICalendarContext = {
  month: 0,
  setMonth: val => val,
  year: 0,
  setYear: val => val,
  number: 0,
  setNumber: val => val,
};

const CalendarContext = createContext<ICalendarContext>(initialState);

export default CalendarContext;
