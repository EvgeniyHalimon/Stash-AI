'use client';

import { useContext, useEffect, useState } from 'react';
import AppContext from '../Context';

interface Day {
  dayNum: number;
  value: number | 'padding';
  isCurrentDay?: boolean;
  date: string;
}

export const useDate = (nav: number) => {
  const [dateDisplay, setDateDisplay] = useState('');
  const [days, setDays] = useState<Day[]>([]);
  const { month, year } = useContext(AppContext);

  useEffect(() => {
    const weekdays = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    const today = new Date();

    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Формируем заголовок месяца
    setDateDisplay(
      new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric',
      }).format(firstDayOfMonth),
    );

    const firstWeekday = weekdays.indexOf(
      firstDayOfMonth.toLocaleDateString('en-us', { weekday: 'long' }),
    );

    const totalCells = 42; // 6 строк * 7 дней
    const daysArr: Day[] = [];

    for (let i = 1; i <= totalCells; i++) {
      const dayNum = i - firstWeekday;
      const isCurrentDay =
        dayNum === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      if (dayNum < 1) {
        // Дни прошлого месяца
        daysArr.push({
          dayNum: daysInPrevMonth + dayNum,
          value: 'padding',
          date: '',
        });
      } else if (dayNum > daysInMonth) {
        // Дни следующего месяца
        daysArr.push({
          dayNum: dayNum - daysInMonth,
          value: 'padding',
          date: '',
        });
      } else {
        // Дни текущего месяца
        daysArr.push({
          dayNum,
          value: dayNum,
          isCurrentDay,
          date: `${dayNum}/${month + 1}/${year}`,
        });
      }
    }

    setDays(daysArr);
  }, [nav, month, year]);

  return { days, dateDisplay };
};
