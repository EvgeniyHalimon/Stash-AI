'use client';
import { Calendar, StashTable, Chart } from '@/components';
import { fetchWithAuth } from '@/shared/fetchWithAuth';
import { useQuery } from '@tanstack/react-query';

async function fetchGoods() {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/goods/by-user`,
  );

  return res.json();
}

export default function Home() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['goods'],
    queryFn: fetchGoods,
  });
  console.log(
    '🚀 ~ Home ~ data, isLoading, isError, error :',
    data,
    isLoading,
    isError,
    error,
  );
  return (
    <div className="grid w-full gap-5 p-4 xl:grid-cols-2 xl:grid-rows-2">
      <Calendar />
      <Chart />
      <StashTable />
    </div>
  );
}
