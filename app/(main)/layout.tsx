'use client';
import { AuthWrapper, Navigation } from '@/components';
import CalendarContext from '@/components/Calendar/CalendarContext';
import {
  fetchWithAuth,
  formatLocalDate,
  IGoods,
  useCalendarContext,
} from '@/shared';
import DashboardContext from '@/shared/DashboardContext';
import { useQuery } from '@tanstack/react-query';
import { useState, useContext, useEffect, useMemo } from 'react';

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

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const calendarContextValue = useCalendarContext();
  const [goods, setGoods] = useState<IGoods[]>([]);
  console.log('🚀 ~ goods:', goods);
  const { month, year } = useContext(CalendarContext);
  const { setGoods: setGoodsGlobal } = useContext(DashboardContext);
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
      setGoodsGlobal(data?.goods);
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
    <div>
      <CalendarContext.Provider value={calendarContextValue}>
        <DashboardContext.Provider value={dashboardContext}>
          <Navigation />
          <div className="dashboard-layout-section">
            <AuthWrapper>{children}</AuthWrapper>
          </div>
        </DashboardContext.Provider>
      </CalendarContext.Provider>
    </div>
  );
}
