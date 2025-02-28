import { useContext } from 'react';

import './Calendar.css';
import AppContext from './Context';

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
    if (month <= 11) setMonth(month - 1);
    if (month == 0) {
      setMonth(11);
      setYear(year - 1);
    }
  };

  const goForward = () => {
    if (month <= 11) setMonth(month + 1);
    if (month == 11) {
      setMonth(0);
      setYear(year + 1);
    }
  };

  return (
    <div className={'pickerBlock'}>
      <button className={'iconButton'} onClick={() => goBackward()}>
        {'<'}
      </button>
      <p className={'range'}>
        {months[month].toUpperCase()} {year}
      </p>
      <button className={'iconButton'} onClick={() => goForward()}>
        {'>'}
      </button>
    </div>
  );
};
