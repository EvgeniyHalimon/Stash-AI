'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { saveTokens, saveUserInLocalStorage } from '@/shared/tokenUtils';

const schema = yup
  .object({
    email: yup
      .string()
      .email('Enter correct email')
      .required('Email is required'),
    password: yup.string().required('Password is required'),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

async function login(data: FormData) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (res && res.status === 201) {
    const { user, accessToken, refreshToken } = await res.json();
    saveTokens({ accessToken, refreshToken });
    saveUserInLocalStorage(user);
  }

  return res;
}

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: login,
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
      <input {...register('email')} type="email" placeholder="Email" />
      <p>{errors.email?.message}</p>

      <input {...register('password')} type="password" placeholder="Password" />
      <p>{errors.password?.message}</p>

      <button type="submit" disabled={isPending}>
        Sign in
      </button>
    </form>
  );
}
