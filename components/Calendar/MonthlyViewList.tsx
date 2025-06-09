import { useContext, Fragment } from 'react';

import Day from './Day';
import { useDate } from './hooks/useDate';
import CalendarContext from './CalendarContext';
import DashboardContext from '@/shared/DashboardContext';

interface IDays {
  shortName: string;
  longName: string;
}

const daysArr: IDays[] = [
  { shortName: 'Mon', longName: 'Monday' },
  { shortName: 'Tue', longName: 'Tuesday' },
  { shortName: 'Wed', longName: 'Wednesday' },
  { shortName: 'Thur', longName: 'Thursday' },
  { shortName: 'Fri', longName: 'Friday' },
  { shortName: 'Sat', longName: 'Saturday' },
  { shortName: 'Sun', longName: 'Sunday' },
];

export interface IDaysTypes {
  value: number | string;
  date: string;
  dayNum: number | string;
}

function groupByDate(goods: any[]) {
  const map = new Map<string, number>();

  goods.forEach(item => {
    const dateObj = new Date(item.whenWillItEnd);
    const localDate = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;

    map.set(localDate, (map.get(localDate) || 0) + 1);
  });

  return map;
}

export const MonthlyViewList = () => {
  const { number } = useContext(CalendarContext);
  const { days } = useDate(number);
  const { goods } = useContext(DashboardContext);

  const groupedGoods = groupByDate(goods);

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-7">
        {daysArr.map((day: IDays) => (
          <p
            key={day.longName}
            className="shadow-custom bg-amber-100 text-center font-semibold text-black"
          >
            {day.shortName.toUpperCase()}
          </p>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map((day: IDaysTypes) => {
          const count = groupedGoods.get(day.date) || 0;

          return (
            <Fragment key={JSON.stringify(day)}>
              {day.value === 'padding' ? (
                <Day date={day} cardClass="bg-gray-300" countOfProducts={0} />
              ) : (
                <Day date={day} cardClass="bg-white" countOfProducts={count} />
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
