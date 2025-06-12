'use client';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormButtons, FormInput, ModalWrapper } from '@/components';

export interface IEditUserForm {
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

interface IEditUserModalProps {
  initialValues: IEditUserForm;
  onClose: () => void;
  onSubmit: (data: IEditUserForm) => void;
  isPending: boolean;
}

export const EditUserModal = ({
  initialValues,
  onClose,
  onSubmit,
  isPending,
}: IEditUserModalProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<IEditUserForm>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const watchedFields = useWatch({ control });

  const hasChanges =
    watchedFields.firstName !== initialValues.firstName ||
    watchedFields.lastName !== initialValues.lastName ||
    watchedFields.email !== initialValues.email;

  return (
    <ModalWrapper onClose={onClose} title={'Edit Profile'}>
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

        <FormButtons
          onClose={onClose}
          isDisabled={isSubmitting || isPending || !hasChanges}
          isSubmitting={isSubmitting || isPending}
        />
      </form>
    </ModalWrapper>
  );
};
