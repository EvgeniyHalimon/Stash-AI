'use client';
import { AuthWrapper, Navigation } from '@/components';
import CalendarContext from '@/components/Calendar/CalendarContext';
import {
  fetchWithAuth,
  formatLocalDate,
  IGoods,
  IHistory,
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

async function fetchHistory() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/history`;

  const res = await fetchWithAuth(url);
  if (!res.ok) {
    throw new Error('Failed to fetch history');
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
  const [history, setHistory] = useState<IHistory[]>([]);
  const { month, year } = useContext(CalendarContext);
  const { setGoods: setGoodsGlobal } = useContext(DashboardContext);
  const d = new Date(year, month, 1);
  const date = formatLocalDate(d);

  const {
    data,
    isLoading,
    isFetching,
    refetch: goodsRefetch,
  } = useQuery({
    queryKey: ['goods-by-user', date],
    queryFn: () => fetchGoods({ date }),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const {
    data: historyData,
    isFetching: isHistoryFetching,
    refetch: historyRefetch,
  } = useQuery({
    queryKey: ['history'],
    queryFn: () => fetchHistory(),
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

  useEffect(() => {
    if (historyData) {
      setHistory(historyData);
    }
  }, [historyData, isHistoryFetching]);

  const refetch = () => {
    goodsRefetch();
    historyRefetch();
  };

  const dashboardContext = useMemo(
    () => ({
      goods,
      setGoods,
      refetch,
      history,
      setHistory,
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
