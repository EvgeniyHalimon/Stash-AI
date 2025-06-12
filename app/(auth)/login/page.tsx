'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { saveTokens, saveUserInLocalStorage } from '@/shared/tokenUtils';
import Link from 'next/link';
import { FormInput } from '@/components';

const schema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

type FormData = yup.InferType<typeof schema>;

async function login(data: FormData) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (res.status === 201) {
    const { user, accessToken, refreshToken } = await res.json();
    saveTokens({ accessToken, refreshToken });
    saveUserInLocalStorage(user);
  }

  return res;
}

export default function LoginForm() {
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
    onSuccess: () => router.replace('/'),
    onError: err => console.error('Login failed:', err),
  });

  const onSubmit = (data: FormData) => mutate(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
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

      <button type="submit" disabled={isPending} className="auth-submit-button">
        Sign in
      </button>

      <Link href="/register" className="auth-question">
        Don&#39;t have an account?
      </Link>
    </form>
  );
}
