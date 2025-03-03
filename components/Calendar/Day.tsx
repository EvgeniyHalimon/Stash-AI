import { IDaysTypes } from '.';
import './Calendar.css';

interface IDateCard {
  date: IDaysTypes;
  cardClass?: string;
}

const Day = ({ date, cardClass }: IDateCard) => {
  return (
    <div className={`w-full h-20 shadow-custom ${cardClass}`}>
      <div className={` text-black pl-2`}>{date.dayNum}</div>
    </div>
  );
};

export default Day;
