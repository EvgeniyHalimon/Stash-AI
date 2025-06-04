'use client';

import { IUser } from '@/shared';
import {
  getUserFromLocalStorage,
  removeUserDataFromLocalStorage,
} from '@/shared/tokenUtils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<IUser>();
  useEffect(() => {
    const userFromStorage = getUserFromLocalStorage();
    if (userFromStorage) {
      setUser(userFromStorage);
    }
  }, []);

  const logout = () => {
    removeUserDataFromLocalStorage();
    router.replace('/login');
  };

  return (
    <div className="flex w-full justify-between p-4">
      <div>
        <p>{user?.firstName}</p>
        <p>{user?.lastName}</p>
        <p>{user?.email}</p>
        <p>{user?.role}</p>
      </div>
      <div>
        <button
          onClick={logout}
          className="cursor-pointer rounded-md bg-red-500 p-2 transition-all duration-300 hover:rounded-xs hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
