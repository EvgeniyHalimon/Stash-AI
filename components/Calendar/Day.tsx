import Link from 'next/link';
import { IDaysTypes } from '.';

interface IDateCard {
  date: IDaysTypes;
  countOfProducts: number;
  cardClass?: string;
}

const Day = ({ date, cardClass, countOfProducts }: IDateCard) => {
  return (
    <div
      className={`shadow-custom flex h-16 w-full flex-col p-2 text-black ${cardClass} `}
    >
      <p className="text-lg font-bold">{date.dayNum}</p>
      {countOfProducts === 0 ? (
        <></>
      ) : (
        <Link
          href={`/calendar/${date.date}`}
          className="h-5 w-5 cursor-pointer rounded-full bg-red-700 text-center font-semibold"
        >
          {countOfProducts}
        </Link>
      )}
    </div>
  );
};

export default Day;
