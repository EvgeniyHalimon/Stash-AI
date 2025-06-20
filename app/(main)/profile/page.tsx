'use client';

import {
  fetchWithAuth,
  handleErrorResponse,
  IUser,
  toastError,
} from '@/shared';
import {
  getUserFromLocalStorage,
  removeUserDataFromLocalStorage,
  saveUserInLocalStorage,
} from '@/shared/tokenUtils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  IEditUserForm,
  EditUserModal,
  Loading,
  UserInfoCard,
} from '@/components';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<IUser>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [initialValues, setInitialValues] = useState<IEditUserForm | null>(
    null,
  );

  const patch = async (data: IEditUserForm) => {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/users`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      },
    );

    if (res.status === 200) {
      const updatedUser = await res.json();
      saveUserInLocalStorage(updatedUser);
      closeEditModal();
    }

    if (!res.ok) {
      handleErrorResponse(res);
    }

    return res;
  };

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: patch,
    onError: error => {
      toastError(error);
    },
  });

  const logout = () => {
    removeUserDataFromLocalStorage();
    router.replace('/login');
  };

  const openEditModal = () => {
    if (user) {
      const values = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
      setInitialValues(values);
      setIsEditModalOpen(true);
    }
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setInitialValues(null);
  };

  useEffect(() => {
    const storedUser = getUserFromLocalStorage();
    if (storedUser) {
      setUser(storedUser);
    }
  }, [isSuccess]);

  if (!user) {
    return <Loading />;
  }

  return (
    <>
      <UserInfoCard user={user} onEdit={openEditModal} onLogout={logout} />
      {isEditModalOpen && initialValues && (
        <EditUserModal
          initialValues={initialValues}
          onClose={closeEditModal}
          onSubmit={(data: IEditUserForm) => mutate(data)}
          isPending={isPending}
        />
      )}
    </>
  );
}
