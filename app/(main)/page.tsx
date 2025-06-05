'use client';
import { Calendar, StashTable, Chart } from '@/components';
import { fetchWithAuth } from '@/shared/fetchWithAuth';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

async function fetchGoods() {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/goods/by-user`,
  );

  return res.json();
}

export default function Home() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['goods-by-user'],
    queryFn: fetchGoods,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    console.log('🔄 Home data changed:', {
      hasData: !!data,
      isLoading,
      isFetching,
    });
  }, [data, isLoading, isFetching]);

  return (
    <div className="grid w-full gap-5 p-4 xl:grid-cols-2 xl:grid-rows-2">
      <Calendar />
      <Chart />
      <StashTable />
    </div>
  );
}
