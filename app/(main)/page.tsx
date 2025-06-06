'use client';
import {
  Calendar,
  StashTable,
  ChartByEachSpending,
  ChartByEachCategory,
  ChartByEachProductRemainingToBePostponed,
} from '@/components';
import { IGoods } from '@/shared';
import DashboardContext from '@/shared/DashboardContext';
import { fetchWithAuth } from '@/shared/fetchWithAuth';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';

async function fetchGoods(params: { date: string }) {
  const query = new URLSearchParams(
    params as Record<string, string>,
  ).toString();
  const url = `${process.env.NEXT_PUBLIC_API_URL}/goods/by-user?${query}`;

  const res = await fetchWithAuth(url);
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
}

export default function Home() {
  const [goods, setGoods] = useState<IGoods[]>([]);
  const d = new Date();
  const date = d.toISOString().slice(0, 10);
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['goods-by-user', date],
    queryFn: () => fetchGoods({ date }),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (data?.goods) {
      setGoods(data?.goods);
    }
  }, [data, isLoading, isFetching]);

  const DashboardContextValue = useMemo(
    () => ({
      goods,
      setGoods,
    }),
    [goods],
  );

  return (
    <div className="flex w-full flex-wrap gap-4 p-4">
      <DashboardContext.Provider value={DashboardContextValue}>
        <StashTable />
        <div className="flex flex-wrap justify-center gap-4">
          <ChartByEachSpending />
          <ChartByEachCategory />
          <ChartByEachProductRemainingToBePostponed />
        </div>
        <Calendar />
      </DashboardContext.Provider>
    </div>
  );
}
