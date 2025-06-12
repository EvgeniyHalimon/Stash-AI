'use client';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormButtons, FormInput, ModalWrapper } from '@/components';
import { formatDateForInput } from '@/shared';

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

interface IEditGoodsModalProps {
  initialValues: EditGoodsForm;
  onClose: () => void;
  onSubmit: (data: EditGoodsForm) => void;
  isPending: boolean;
}

const prepareInitialValues = (values: EditGoodsForm) => {
  return {
    ...values,
    whenWillItEnd: formatDateForInput(values.whenWillItEnd as string | Date),
  };
};

type FormData = yup.InferType<typeof schema>;

export const EditGoodModal = ({
  initialValues,
  onClose,
  onSubmit,
  isPending,
}: IEditGoodsModalProps) => {
  const preparedInitialValues = prepareInitialValues(initialValues);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: preparedInitialValues,
  });

  const watchedFields = useWatch({ control });

  const hasChanges = Object.keys(initialValues).some(key => {
    const initial = preparedInitialValues[key as keyof EditGoodsForm] ?? '';
    const current = watchedFields[key as keyof EditGoodsForm] ?? '';
    return String(initial) !== String(current);
  });

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
          isDisabled={isSubmitting || isPending || !hasChanges}
          isSubmitting={isSubmitting || isPending}
        />
      </form>
    </ModalWrapper>
  );
};
