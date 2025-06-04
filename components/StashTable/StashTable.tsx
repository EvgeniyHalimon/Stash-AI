'use client';

import { useQuery } from '@tanstack/react-query';
import { TableBody, TableHead } from '..';
import { fetchWithAuth } from '@/shared/fetchWithAuth';
import { useEffect, useState } from 'react';
import { IGoods } from '@/shared';

type Params = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sort?: 'asc' | 'desc';
};

async function fetchGoods(params: Params = {}) {
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
  const [sort, setSort] = useState<'asc' | 'desc'>('desc');
  const [sortBy, setSortBy] = useState('title');
  const [goods, setGoods] = useState<IGoods[]>([]);
  console.log({ sort, sortBy });
  const queryParams: Params = {
    page: 1,
    limit: 8,
    sortBy,
    sort,
  };

  const { data, isLoading } = useQuery({
    queryKey: ['goods', queryParams],
    queryFn: () => fetchGoods(queryParams),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data?.goods) {
      setGoods(data.goods);
    }
  }, [data?.goods, isLoading]);

  return (
    <div className="relative h-fit overflow-x-auto shadow-md">
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <TableHead
          sort={sort}
          sortBy={sortBy}
          setSort={setSort}
          setSortBy={setSortBy}
        />
        <TableBody goods={goods} />
      </table>
    </div>
  );
};
