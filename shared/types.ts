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

export interface IHistory {
  date: string;
  amount: number;
}

export interface IGoodsParams {
  page: number;
  limit: number;
  sortBy: string;
  sort: SortType;
  date: Date | string;
  range: RangeType;
}

export enum RangeEnum {
  DAY = 'day',
  MONTH = 'month',
}

export type RangeType = RangeEnum.DAY | RangeEnum.MONTH;

export type SortType = 'asc' | 'desc';
