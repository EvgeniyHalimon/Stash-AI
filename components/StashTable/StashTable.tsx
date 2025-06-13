'use client';

import { useQuery } from '@tanstack/react-query';
import { TableBody, TableHead } from '..';
import { fetchWithAuth } from '@/shared/fetchWithAuth';
import { useContext, useEffect, useState } from 'react';
import { formatLocalDate, IGoods, IGoodsParams, SortType } from '@/shared';
import Pagination from './Pagination';
import { usePathname } from 'next/navigation';
import CalendarContext from '../Calendar/CalendarContext';
import DashboardContext from '@/shared/DashboardContext';
import { CreateGoodModal } from './CreateGoodModal';

async function fetchGoods(params: Partial<IGoodsParams>) {
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

export const StashTable = () => {
  const pathname = usePathname();
  const { refetch: dashboardRefetch } = useContext(DashboardContext);

  const [sort, setSort] = useState<SortType>('desc');
  const [sortBy, setSortBy] = useState('title');
  const [goods, setGoods] = useState<IGoods[]>([]);
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(1);
  const [isOpen, setIsOpen] = useState(false);

  const { month, year } = useContext(CalendarContext);

  const d = new Date(year, month, 1);
  const date = formatLocalDate(d);

  const queryParams = {
    page,
    limit: 12,
    sortBy,
    sort,
    date,
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['goods', queryParams],
    queryFn: () => fetchGoods(queryParams),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (data?.goods) {
      setGoods(data.goods);
      setCount(data.count);
    }
  }, [data?.count, data?.goods, isLoading]);

  const globalRefetch = () => {
    refetch();
    dashboardRefetch();
  };

  return (
    <div className="stash-table">
      {pathname === '/list' && (
        <div className="table-block">
          <h2 className="table-title">Your Goods</h2>
          <button onClick={() => setIsOpen(true)} className="table-button">
            + Add Product
          </button>
        </div>
      )}
      <table className={`table-base ${pathname === '/list' ? 'mb-4' : 'mb-0'}`}>
        <TableHead
          sort={sort}
          sortBy={sortBy}
          setSort={setSort}
          setSortBy={setSortBy}
        />
        <TableBody goods={goods} refetch={globalRefetch} />
      </table>
      {pathname === '/list' && (
        <Pagination
          page={page}
          count={Math.ceil(count / queryParams.limit)}
          onChangePage={page => setPage(page)}
          onPrevPage={() => setPage(prev => prev - 1)}
          onNextPage={() => setPage(prev => prev + 1)}
        />
      )}

      {pathname === '/list' && isOpen && (
        <CreateGoodModal
          onClose={() => setIsOpen(false)}
          refetch={globalRefetch}
        />
      )}
    </div>
  );
};
