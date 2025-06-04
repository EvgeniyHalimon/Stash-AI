'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

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
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter and one number',
      )
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
    onSuccess: () => {
      router.replace('/');
    },
    onError: (error: unknown) => {
      console.error('Login failed:', error);
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('firstName')} type="text" placeholder="First Name" />
      <p>{errors.firstName?.message}</p>

      <input {...register('lastName')} type="text" placeholder="Last Name" />
      <p>{errors.lastName?.message}</p>

      <input {...register('email')} type="email" placeholder="Email" />
      <p>{errors.email?.message}</p>

      <input {...register('password')} type="password" placeholder="Password" />
      <p>{errors.password?.message}</p>

      <input
        {...register('confirmPassword')}
        type="password"
        placeholder="Confirm Password"
      />
      <p>{errors.confirmPassword?.message}</p>

      <input type="submit" value="Register" disabled={isPending} />
    </form>
  );
}
