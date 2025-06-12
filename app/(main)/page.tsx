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
import { formatLocalDate, IGoods } from '@/shared';
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
  const date = formatLocalDate(d);

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
    <div className="home-wrapper">
      <DashboardContext.Provider value={dashboardContext}>
        <MonthPicker />
        <div className="data-block">
          <div className="sub-block">
            <Calendar />
          </div>
          <div className="sub-block">
            <StashTable />
          </div>
        </div>
        <div className="chart-block">
          <ChartByEachSpending />
          <ChartByEachCategory />
          <ChartByEachProductRemainingToBePostponed />
        </div>
      </DashboardContext.Provider>
    </div>
  );
}
