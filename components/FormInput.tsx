'use client';

import { InputHTMLAttributes, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  registration: UseFormRegisterReturn;
}

export const FormInput = ({
  label,
  error,
  registration,
  ...props
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = props.type === 'password';

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">
        {label}
        <div className="relative flex items-center">
          <input
            {...registration}
            {...props}
            type={isPassword && showPassword ? 'text' : props.type}
            className={`mt-1 w-full rounded border p-2 pr-10 ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-gray-600"
              tabIndex={-1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 6.5a9.77 9.77 0 0 1 8.82 5.5c-1.65 3.37-5.02 5.5-8.82 5.5S4.83 15.37 3.18 12A9.77 9.77 0 0 1 12 6.5m0-2C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5m0 5a2.5 2.5 0 0 1 0 5a2.5 2.5 0 0 1 0-5m0-2c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5s4.5-2.02 4.5-4.5s-2.02-4.5-4.5-4.5"
                />
              </svg>
            </button>
          )}
        </div>
      </label>
      <p className="min-h-[20px] text-sm text-red-500">{error ?? '\u00A0'}</p>
    </div>
  );
};
