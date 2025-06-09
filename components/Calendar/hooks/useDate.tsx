'use client';

import { useContext, useEffect, useState } from 'react';
import CalendarContext from '../CalendarContext';
import { formatLocalDate } from '@/shared';

interface Day {
  dayNum: number;
  value: number | 'padding';
  isCurrentDay?: boolean;
  date: string;
}

export const useDate = (nav: number) => {
  const [dateDisplay, setDateDisplay] = useState('');
  const [days, setDays] = useState<Day[]>([]);
  const { month, year } = useContext(CalendarContext);

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

    const totalCells = 42;
    const daysArr: Day[] = [];

    for (let i = 1; i <= totalCells; i++) {
      const dayNum = i - firstWeekday;
      const isCurrentDay =
        dayNum === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      let dateObj: Date;

      if (dayNum < 1) {
        // Дни прошлого месяца
        dateObj = new Date(year, month - 1, daysInPrevMonth + dayNum);
        daysArr.push({
          dayNum: dateObj.getDate(),
          value: 'padding',
          date: formatLocalDate(dateObj),
        });
      } else if (dayNum > daysInMonth) {
        // Дни следующего месяца
        dateObj = new Date(year, month + 1, dayNum - daysInMonth);
        daysArr.push({
          dayNum: dateObj.getDate(),
          value: 'padding',
          date: formatLocalDate(dateObj),
        });
      } else {
        // Дни текущего месяца
        dateObj = new Date(year, month, dayNum);
        daysArr.push({
          dayNum,
          value: dayNum,
          isCurrentDay,
          date: formatLocalDate(dateObj),
        });
      }
    }

    setDays(daysArr);
  }, [nav, month, year]);

  return { days, dateDisplay };
};
