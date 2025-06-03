import { Calendar, StashTable, Chart } from '@/components';

export default function Home() {
  return (
    <div className="grid w-full gap-5 p-4 xl:grid-cols-2 xl:grid-rows-2">
      <Calendar />
      <Chart />
      <StashTable />
    </div>
  );
}
