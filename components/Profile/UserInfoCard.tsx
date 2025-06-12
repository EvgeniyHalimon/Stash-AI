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
    <div className="user-info-card">
      <div className="user-info">
        <p className="user-name">{user.firstName}</p>
        <p className="user-name">{user.lastName}</p>
        <p className="user-email">{user.email}</p>
        <p className="user-role">{user.role}</p>
      </div>

      <div className="user-actions">
        <button onClick={onEdit} className="edit-button">
          Edit
        </button>
        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};
