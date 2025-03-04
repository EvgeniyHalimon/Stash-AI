import { Calendar, StashTable, Chart } from '@/components';

export default function Home() {
  return (
    <div className="w-full grid xl:grid-cols-2 xl:grid-rows-2 gap-5 p-4">
      <StashTable />
      <Calendar />
      <Chart />
    </div>
  );
}
