'use client';
import {
  Calendar,
  StashTable,
  ChartByEachSpending,
  ChartByEachCategory,
  ChartByEachProductRemainingToBePostponed,
  MonthPicker,
} from '@/components';
import CalendarContext from '@/components/Calendar/CalendarContext';
import { IGoods } from '@/shared';
import DashboardContext from '@/shared/DashboardContext';
import { fetchWithAuth } from '@/shared/fetchWithAuth';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useMemo, useState } from 'react';

async function fetchGoods(params: { date: string }) {
  const query = new URLSearchParams(
    params as Record<string, string>,
  ).toString();
  const url = `${process.env.NEXT_PUBLIC_API_URL}/goods/by-user?${query}`;

  const res = await fetchWithAuth(url);
  if (!res.ok) {
    throw new Error('Failed to fetch goods');
  }
  return res.json();
}

export default function Home() {
  const [goods, setGoods] = useState<IGoods[]>([]);
  const { month, year } = useContext(CalendarContext);
  const d = new Date(year, month, 1);
  const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  const { data, isLoading, isFetching, refetch } = useQuery({
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

  const dashboardContext = useMemo(
    () => ({
      goods,
      setGoods,
      refetch,
    }),
    [goods, refetch, isFetching],
  );

  return (
    <div className="flex w-full flex-col flex-wrap gap-4 p-4">
      <DashboardContext.Provider value={dashboardContext}>
        <MonthPicker />
        <div className="flex flex-col gap-4 2xl:flex-row">
          <div className="w-full 2xl:w-1/2">
            <Calendar />
          </div>
          <div className="w-full 2xl:w-1/2">
            <StashTable />
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <ChartByEachSpending />
          <ChartByEachCategory />
          <ChartByEachProductRemainingToBePostponed />
        </div>
      </DashboardContext.Provider>
    </div>
  );
}
