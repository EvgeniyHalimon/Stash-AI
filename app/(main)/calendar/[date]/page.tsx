'use client';

import { TableHead, TableBody } from '@/components';
import Pagination from '@/components/StashTable/Pagination';
import { fetchWithAuth, IGoods, SortType } from '@/shared';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

async function fetchGoods(params: any) {
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

const DayPage = () => {
  const { date } = useParams();
  const [sort, setSort] = useState<SortType>('desc');
  const [sortBy, setSortBy] = useState('title');
  const [page, setPage] = useState<number>(1);
  const [goods, setGoods] = useState<IGoods[]>([]);
  const [count, setCount] = useState<number>(1);
  const queryParams = {
    sortBy: 'price',
    limit: 15,
    sort: 'asc',
    date,
    range: 'day',
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
    <div className="h-fit w-full overflow-x-auto p-4 shadow-md">
      <table className="mb-4 w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <TableHead
          sort={sort}
          sortBy={sortBy}
          setSort={setSort}
          setSortBy={setSortBy}
        />
        <TableBody goods={goods} />
      </table>

      <Pagination
        page={page}
        count={Math.ceil(count / queryParams.limit)}
        onChangePage={page => setPage(page)}
        onPrevPage={() => setPage(prev => prev - 1)}
        onNextPage={() => setPage(prev => prev + 1)}
      />
    </div>
  );
};

export default DayPage;
