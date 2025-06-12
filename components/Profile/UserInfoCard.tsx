'use client';

import { IUser } from '@/shared';

interface IUserInfoCardProps {
  user: IUser;
  onEdit: () => void;
  onLogout: () => void;
}

export const UserInfoCard = ({
  user,
  onEdit,
  onLogout,
}: IUserInfoCardProps) => {
  return (
    <div className="flex w-full justify-between p-4">
      <div className="space-y-2">
        <p className="text-lg font-medium">{user.firstName}</p>
        <p className="text-lg font-medium">{user.lastName}</p>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-sm text-gray-500 capitalize">{user.role}</p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onEdit}
          className="h-9 rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={onLogout}
          className="h-9 rounded-md bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
