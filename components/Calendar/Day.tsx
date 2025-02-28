import { IDaysTypes } from '.';
import './Calendar.css';

interface IDateCard {
  date: IDaysTypes;
  cardClass?: string;
}

const Day = ({ date, cardClass }: IDateCard) => {
  return (
    <div className={`calendarDate calendarDayStat ${cardClass}`}>
      <div className={`calendarInnerBox`}>{JSON.stringify(date)}</div>
    </div>
  );
};

export default Day;
