import { IDaysTypes } from '.';

interface IDateCard {
  date: IDaysTypes;
  cardClass?: string;
}

const Day = ({ date, cardClass }: IDateCard) => {
  return (
    <div
      className={`shadow-custom flex min-h-10 w-full flex-col p-2 text-black ${cardClass} `}
    >
      <div>{date.dayNum}</div>
      <div>test</div>
    </div>
  );
};

export default Day;
