'use client';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormInput } from '@/components';

export interface EditGoodsForm {
  title?: string;
  price?: number;
  category?: string;
  postponed?: number;
  whenWillItEnd?: Date | string;
}

const schema = yup
  .object({
    title: yup.string().min(2).max(100).optional(),
    price: yup.number().positive().typeError('Must be a number').optional(),
    category: yup.string().min(2).max(100).optional(),
    postponed: yup
      .number()
      .integer()
      .min(0)
      .typeError('Must be an integer')
      .optional(),
    whenWillItEnd: yup
      .string()
      .transform((value, originalValue) =>
        originalValue === '' ? undefined : value,
      )
      .optional()
      .test('is-date', 'Must be a valid date', value =>
        value ? !isNaN(Date.parse(value)) : true,
      ),
  })
  .partial();

interface EditGoodsModalProps {
  initialValues: EditGoodsForm;
  onClose: () => void;
  onSubmit: (data: EditGoodsForm) => void;
  isPending: boolean;
}

const formatDateForInput = (dateString: string | Date): string => {
  const date = new Date(dateString);

  return date.toISOString().split('T')[0];
};

const prepareInitialValues = (values: EditGoodsForm): EditGoodsForm => {
  return {
    ...values,
    whenWillItEnd: formatDateForInput(values.whenWillItEnd as string | Date),
  };
};

export const EditGoodModal = ({
  initialValues,
  onClose,
  onSubmit,
  isPending,
}: EditGoodsModalProps) => {
  const preparedInitialValues = prepareInitialValues(initialValues);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EditGoodsForm>({
    resolver: yupResolver(schema) as any,
    defaultValues: preparedInitialValues,
  });

  const watchedFields = useWatch({ control });

  const hasChanges = Object.keys(initialValues).some(key => {
    const initial = preparedInitialValues[key as keyof EditGoodsForm] ?? '';
    const current = watchedFields[key as keyof EditGoodsForm] ?? '';
    return String(initial) !== String(current);
  });

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black text-black">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Edit Goods</h2>
          <button onClick={onClose} className="hover:text-gray-400">
            ✕
          </button>
        </div>

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
