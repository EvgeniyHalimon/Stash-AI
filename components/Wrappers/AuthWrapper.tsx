'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserFromLocalStorage } from '@/shared/tokenUtils';

export const AuthWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getUserFromLocalStorage();

    if (!token) {
      router.replace('/login');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
