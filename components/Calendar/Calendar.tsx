import { useState, useMemo } from 'react';
import { MonthPicker, MonthlyViewList } from '..';
import AppContext from './Context';

export const Calendar = () => {
  const d = new Date();
  const m = d.getMonth();
  const y = d.getFullYear();
  const [month, setMonth] = useState(m);
  const [year, setYear] = useState(y);
  const [number, setNumber] = useState<number>(0);

  const AppContextValue = useMemo(
    () => ({
      month,
      setMonth,
      year,
      setYear,
      number,
      setNumber,
    }),
    [month, year, number],
  );
  return (
    <AppContext.Provider value={AppContextValue}>
      <div>
        <MonthPicker />
        <MonthlyViewList />
      </div>
    </AppContext.Provider>
  );
};
