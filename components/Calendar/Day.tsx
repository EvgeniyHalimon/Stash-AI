import Link from 'next/link';
import { IDaysTypes } from '.';

interface IDateCard {
  date: IDaysTypes;
  countOfProducts: number;
  cardClass?: string;
}

const Day = ({ date, cardClass, countOfProducts }: IDateCard) => {
  return (
    <div className={`day ${cardClass} `}>
      <p className="text-lg font-bold">{date.dayNum}</p>
      {countOfProducts === 0 ? (
        <></>
      ) : (
        <Link href={`/calendar/${date.date}`} className="day-link">
          {countOfProducts}
        </Link>
      )}
    </div>
  );
};

export default Day;
