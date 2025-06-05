'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';

let queryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (!queryClient) {
    console.log('🔥 Creating NEW QueryClient instance');
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 10,
          gcTime: 1000 * 60 * 30,
          refetchOnWindowFocus: false,
          refetchOnMount: false,
        },
      },
    });

    console.log(
      '💾 Initial cache state:',
      queryClient.getQueryCache().getAll(),
    );
  } else {
    console.log('♻️ Reusing EXISTING QueryClient instance');
    console.log(
      '💾 Current cache state:',
      queryClient.getQueryCache().getAll(),
    );
  }

  return queryClient;
}

export default function Providers({
  children,
}: Readonly<{ children: ReactNode }>) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
