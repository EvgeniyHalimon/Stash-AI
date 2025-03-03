import { IDaysTypes } from '.';
import './Calendar.css';

interface IDateCard {
  date: IDaysTypes;
  cardClass?: string;
}

const Day = ({ date, cardClass }: IDateCard) => {
  return (
    <div className={`min-w-20 w-max-full h-20 shadow-custom ${cardClass}`}>
      <div className={`calendarInnerBox text-black`}>{date.dayNum}</div>
    </div>
  );
};

export default Day;
