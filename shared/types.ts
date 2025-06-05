export interface IDaysTypes {
  value: number | string;
  date: string;
  dayNum: number | string;
}

export enum UserRolesEnum {
  USER = 'user',
  ADMIN = 'admin',
}

export type UserRole = UserRolesEnum.USER | UserRolesEnum.ADMIN;

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: UserRole;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IGoods {
  _id: string;
  user: IUser;
  title: string;
  price: number;
  category: string;
  postponed: number;
  remainingToBePostponed: number;
  whenWillItEnd: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Params {
  page?: number;
  limit?: number;
  sortBy?: string;
  sort?: SortType;
}

export type SortType = 'asc' | 'desc';
