'use client';
import { Calendar, StashTable, Chart } from '@/components';
import { useQuery } from '@tanstack/react-query';

async function fetchPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
}

export default function Home() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
  console.log(
    '🚀 ~ Home ~ data, isLoading, isError, error :',
    data,
    isLoading,
    isError,
    error,
  );
  return (
    <div className="grid w-full gap-5 p-4 xl:grid-cols-2 xl:grid-rows-2">
      <Calendar />
      <Chart />
      <StashTable />
    </div>
  );
}
