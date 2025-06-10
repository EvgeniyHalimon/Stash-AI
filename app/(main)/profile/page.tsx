'use client';

import { fetchWithAuth, IUser } from '@/shared';
import {
  getUserFromLocalStorage,
  removeUserDataFromLocalStorage,
  saveUserInLocalStorage,
} from '@/shared/tokenUtils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormInput, Loading } from '@/components';
import { useMutation } from '@tanstack/react-query';

interface EditUserForm {
  firstName: string;
  lastName: string;
  email: string;
}

const schema = yup
  .object({
    firstName: yup
      .string()
      .min(2, 'First name must be at least 2 characters')
      .max(50, 'First name must not exceed 50 characters')
      .matches(/^[a-zA-Z\s]+$/, 'First name must contain only letters')
      .required('First name is required'),
    lastName: yup
      .string()
      .min(2, 'Last name must be at least 2 characters')
      .max(50, 'Last name must not exceed 50 characters')
      .matches(/^[a-zA-Z\s]+$/, 'Last name must contain only letters')
      .required('Last name is required'),
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is required'),
  })
  .required();

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<IUser>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EditUserForm>({
    resolver: yupResolver(schema),
  });

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setInitialValues(null);
  };

  async function patch(data: EditUserForm) {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/users`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );

    if (res.status === 200) {
      const user = await res.json();
      saveUserInLocalStorage(user);
      closeEditModal();
    }

    return res;
  }

  const { isPending, mutate, isSuccess } = useMutation({
    mutationFn: patch,
    onError: (error: unknown) => console.error('Login failed:', error),
  });

  const watchedFields = useWatch({ control });
  const [initialValues, setInitialValues] = useState<EditUserForm | null>(null);

  const hasChanges =
    initialValues &&
    (watchedFields.firstName !== initialValues.firstName ||
      watchedFields.lastName !== initialValues.lastName ||
      watchedFields.email !== initialValues.email);

  useEffect(() => {
    const userFromStorage = getUserFromLocalStorage();
    if (userFromStorage) {
      setUser(userFromStorage);
    }
  }, [isSuccess]);

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
      reset(values);
      setInitialValues(values);
      setIsEditModalOpen(true);
    }
  };

  const onSubmit = async (data: EditUserForm) => {
    if (!hasChanges) {
      return;
    }

    mutate(data);
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex w-full justify-between p-4">
        <div className="space-y-2">
          <p className="text-lg font-medium">{user.firstName}</p>
          <p className="text-lg font-medium">{user.lastName}</p>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-500 capitalize">{user.role}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={openEditModal}
            className="h-9 cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white transition-all duration-500 hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={logout}
            className="h-9 cursor-pointer rounded-md bg-red-500 px-4 py-2 text-white transition-all duration-500 hover:rounded-xs hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black text-black">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Edit Profile</h2>
              <button
                onClick={closeEditModal}
                className="cursor-pointer text-black transition-all duration-500 hover:text-gray-400"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormInput
                label="First Name"
                type="text"
                placeholder="First name"
                error={errors.firstName?.message}
                registration={register('firstName')}
              />
              <FormInput
                label="Last Name"
                type="text"
                placeholder="Last Name"
                error={errors.lastName?.message}
                registration={register('lastName')}
              />
              <FormInput
                label="Email"
                type="email"
                placeholder="Email"
                error={errors.email?.message}
                registration={register('email')}
              />

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-black transition-all duration-500 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isPending || !hasChanges}
                  className="flex-1 rounded-md bg-blue-500 px-4 py-2 text-white transition-all duration-500 hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting || isPending ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
