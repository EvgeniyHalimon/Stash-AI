import { useContext, Fragment } from 'react';

import Day from './Day';
import { useDate } from './hooks/useDate';
import AppContext from './Context';

import './Calendar.css';

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

export const MonthlyViewList = () => {
  const { number } = useContext(AppContext);
  const { days } = useDate(number);

  return (
    <div>
      <div className={`firstBlock daysBox`}>
        {daysArr.map((day: IDays) => (
          <p
            key={day.longName}
            style={{ width: `${100 / 7}%` }}
            className={`${days}`}
          >
            {day.shortName.toUpperCase()}
          </p>
        ))}
      </div>
      <div className={'secondBlock'}>
        {days.map((day: IDaysTypes) => (
          <Fragment key={JSON.stringify(day)}>
            {day.value === 'padding' ? (
              <Day date={day} cardClass={'bg-gray-300'} />
            ) : (
              <Day date={day} cardClass="bg-white" />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
