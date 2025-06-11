// components/EditUserModal.tsx
'use client';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormInput } from '@/components';

export interface EditUserForm {
  firstName: string;
  lastName: string;
  email: string;
}

const schema = yup.object({
  firstName: yup
    .string()
    .min(2)
    .max(50)
    .matches(/^[a-zA-Z\s]+$/, 'Only letters allowed')
    .required(),
  lastName: yup
    .string()
    .min(2)
    .max(50)
    .matches(/^[a-zA-Z\s]+$/, 'Only letters allowed')
    .required(),
  email: yup.string().email().required(),
});

interface EditUserModalProps {
  initialValues: EditUserForm;
  onClose: () => void;
  onSubmit: (data: EditUserForm) => void;
  isPending: boolean;
}

export const EditUserModal = ({
  initialValues,
  onClose,
  onSubmit,
  isPending,
}: EditUserModalProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EditUserForm>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const watchedFields = useWatch({ control });

  const hasChanges =
    watchedFields.firstName !== initialValues.firstName ||
    watchedFields.lastName !== initialValues.lastName ||
    watchedFields.email !== initialValues.email;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black text-black">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <button onClick={onClose} className="hover:text-gray-400">
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit(data => onSubmit(data))}
          className="space-y-4"
        >
          <FormInput
            label="First Name"
            type="text"
            error={errors.firstName?.message}
            registration={register('firstName')}
          />
          <FormInput
            label="Last Name"
            type="text"
            error={errors.lastName?.message}
            registration={register('lastName')}
          />
          <FormInput
            label="Email"
            type="email"
            error={errors.email?.message}
            registration={register('email')}
          />

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-md border px-4 py-2 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isPending || !hasChanges}
              className="flex-1 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting || isPending ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
