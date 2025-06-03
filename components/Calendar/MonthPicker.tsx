import { useContext } from 'react';

import AppContext from './Context';
import { LeftIcon, RightIcon } from '..';

export const MonthPicker = () => {
  const { month, setMonth, year, setYear } = useContext(AppContext);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const goBackward = () => {
    if (month <= 11) {
      setMonth(month - 1);
    }
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    }
  };

  const goForward = () => {
    if (month <= 11) {
      setMonth(month + 1);
    }
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    }
  };

  return (
    <div className="flex items-center bg-white">
      <button
        type="button"
        className="cursor-pointer text-black"
        onClick={() => goBackward()}
      >
        <LeftIcon />
      </button>
      <p className="text-xl font-bold text-black">
        {months[month].toUpperCase()} {year}
      </p>
      <button
        type="button"
        className="cursor-pointer text-black"
        onClick={() => goForward()}
      >
        <RightIcon />
      </button>
    </div>
  );
};
