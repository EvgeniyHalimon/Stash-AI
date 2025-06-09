'use client';

import { useState, useMemo } from 'react';

export const useCalendarContext = () => {
  const d = new Date();
  const m = d.getMonth();
  const y = d.getFullYear();
  const [month, setMonth] = useState(m);
  const [year, setYear] = useState(y);
  const [number, setNumber] = useState<number>(0);

  const CalendarContextValue = useMemo(
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

  return CalendarContextValue;
};
