import { Calendar, Navigation, StashTable } from '@/components';

export default function Home() {
  return (
    <div className="flex gap-4 xl:h-[100dvh] xl:flex-row flex-col">
      <Navigation />
      <div className="grid grid-cols-2 grid-rows-2 gap-5 px-4">
        <StashTable />
        <Calendar />
      </div>
    </div>
  );
}
