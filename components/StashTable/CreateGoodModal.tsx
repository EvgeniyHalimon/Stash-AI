'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormButtons, FormInput, ModalWrapper } from '@/components';
import { useMutation } from '@tanstack/react-query';
import { fetchWithAuth, handleErrorResponse, toastError } from '@/shared';

const schema = yup.object({
  title: yup
    .string()
    .min(2, 'Title must be at least 2 characters')
    .max(100, 'Title must be at most 100 characters')
    .required('Title is required'),

  price: yup
    .number()
    .typeError('Price must be a number')
    .positive('Price must be a positive number')
    .required('Price is required'),

  category: yup
    .string()
    .min(2, 'Category must be at least 2 characters')
    .max(100, 'Category must be at most 100 characters')
    .required('Category is required'),

  postponed: yup
    .number()
    .typeError('Postponed must be an integer')
    .integer('Postponed must be an integer')
    .min(0, 'Postponed must be at least 0')
    .required('Postponed is required'),

  whenWillItEnd: yup
    .string()
    .required('End date is required')
    .test('is-date', 'Must be a valid date', value =>
      value ? !isNaN(Date.parse(value)) : false,
    ),
});

interface ICreateGoodsModalProps {
  onClose: () => void;
}

type FormData = yup.InferType<typeof schema>;

async function createGood(data: FormData) {
  const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/goods`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    handleErrorResponse(res);
  }

  return res;
}

export const CreateGoodModal = ({ onClose }: ICreateGoodsModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: createGood,
    onSuccess: () => onClose(),
    onError: error => {
      toastError(error);
    },
  });

  const onSubmit = (data: FormData) => mutate(data);

  return (
    <ModalWrapper onClose={onClose} title={'Edit Goods'}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          label="Title"
          type="text"
          error={errors.title?.message}
          registration={register('title')}
        />
        <FormInput
          label="Price"
          type="number"
          error={errors.price?.message}
          registration={register('price')}
        />
        <FormInput
          label="Category"
          type="text"
          error={errors.category?.message}
          registration={register('category')}
        />
        <FormInput
          label="Postponed"
          type="number"
          error={errors.postponed?.message}
          registration={register('postponed')}
        />
        <FormInput
          label="When Will It End"
          type="date"
          error={errors.whenWillItEnd?.message}
          registration={register('whenWillItEnd')}
        />

        <FormButtons
          onClose={onClose}
          isDisabled={isSubmitting || isPending}
          isSubmitting={isSubmitting || isPending}
        />
      </form>
    </ModalWrapper>
  );
};
