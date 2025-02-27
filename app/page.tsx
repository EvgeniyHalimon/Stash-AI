import { Calendar, Chat, Navigation } from '@/components';

export default function Home() {
  return (
    <div className="flex gap-4 h-[100dvh]">
      <Navigation />
      <div className="grid grid-cols-2 grid-rows-2 gap-5">
        <Chat />
        <Calendar />
      </div>
    </div>
  );
}
