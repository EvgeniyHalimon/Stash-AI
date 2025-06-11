'use client';

import { useQuery } from '@tanstack/react-query';
import { TableBody, TableHead } from '..';
import { fetchWithAuth } from '@/shared/fetchWithAuth';
import { useContext, useEffect, useState } from 'react';
import { formatLocalDate, IGoods, IGoodsParams, SortType } from '@/shared';
import Pagination from './Pagination';
import { usePathname } from 'next/navigation';
import CalendarContext from '../Calendar/CalendarContext';

async function fetchGoods(params: Partial<IGoodsParams>) {
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

export const StashTable = () => {
  const pathname = usePathname();
  const [sort, setSort] = useState<SortType>('desc');
  const [sortBy, setSortBy] = useState('title');
  const [goods, setGoods] = useState<IGoods[]>([]);
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(1);

  const { month, year } = useContext(CalendarContext);

  const d = new Date(year, month, 1);
  const date = formatLocalDate(d);

  const queryParams = {
    page,
    limit: pathname === '/list' ? 12 : 8,
    sortBy,
    sort,
    date,
  };

  const { data, isLoading } = useQuery({
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

  return (
    <div className="h-fit w-full overflow-x-auto shadow-md">
      <table
        className={`w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400 ${pathname === '/list' ? 'mb-4' : 'mb-0'}`}
      >
        <TableHead
          sort={sort}
          sortBy={sortBy}
          setSort={setSort}
          setSortBy={setSortBy}
        />
        <TableBody goods={goods} />
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
    </div>
  );
};
