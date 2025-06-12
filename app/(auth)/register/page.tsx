'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { FormInput } from '@/components';

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
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords do not match')
      .required('Password confirmation is required'),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

async function signUp(data: FormData) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return res;
}

export default function Register() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: signUp,
    onSuccess: () => router.replace('/'),
  });

  const onSubmit = (data: FormData) => mutate(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
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
      <FormInput
        label="Password"
        type="password"
        placeholder="Password"
        error={errors.password?.message}
        registration={register('password')}
      />
      <FormInput
        label="Confirm Password"
        type="password"
        placeholder="Confirm Password"
        error={errors.confirmPassword?.message}
        registration={register('confirmPassword')}
      />

      <button className="auth-submit-button" type="submit" disabled={isPending}>
        Register
      </button>
      <Link className="auth-question" href="/login">
        Already have an account?
      </Link>
    </form>
  );
}
