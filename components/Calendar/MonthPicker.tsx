import { useContext } from 'react';

import CalendarContext from './CalendarContext';
import { LeftIcon, RightIcon } from '..';

export const MonthPicker = () => {
  const { month, setMonth, year, setYear } = useContext(CalendarContext);
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
    <div className="picker-block">
      <button
        type="button"
        className="picker-button"
        onClick={() => goBackward()}
      >
        <LeftIcon />
      </button>
      <p className="picker-month">
        {months[month].toUpperCase()} {year}
      </p>
      <button
        type="button"
        className="picker-button"
        onClick={() => goForward()}
      >
        <RightIcon />
      </button>
    </div>
  );
};
