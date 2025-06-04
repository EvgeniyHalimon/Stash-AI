import type { ITokens, IUser } from './types';

const isBrowser = typeof window !== 'undefined';

const keys = {
  access: 'stash_accessToken',
  refresh: 'stash_refreshToken',
  user: 'stash_user',
};

const storageWrapper = (
  action: 'set' | 'get' | 'remove',
  key: string,
  value?: any,
): any => {
  if (!isBrowser) {
    return;
  }

  try {
    if (action === 'set') {
      localStorage.setItem(key, value);
    } else if (action === 'get') {
      return localStorage.getItem(key);
    } else if (action === 'remove') {
      localStorage.removeItem(key);
    }
  } catch (error) {
    console.error('LocalStorage operation failed:', error);
  }
};

export const saveTokens = (data: ITokens) => {
  storageWrapper('set', keys.access, data.accessToken);
  storageWrapper('set', keys.refresh, data.refreshToken);
};

export const removeTokens = () => {
  storageWrapper('remove', keys.access);
  storageWrapper('remove', keys.refresh);
};

export const getRefreshToken = (): string => {
  return storageWrapper('get', keys.refresh) ?? '';
};

export const getAccessToken = (): string => {
  return storageWrapper('get', keys.access) ?? '';
};

export const saveUserInLocalStorage = (user: Partial<IUser>) => {
  storageWrapper('set', keys.user, JSON.stringify(user));
};

export const getUserFromLocalStorage = (): IUser | null => {
  const userStr = storageWrapper('get', keys.user);
  if (!userStr) {
    return null;
  }

  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Failed to parse user JSON from localStorage:', error);
    return null;
  }
};

export const removeUserFromLocalStorage = () => {
  storageWrapper('remove', keys.user);
};

export const removeUserDataFromLocalStorage = () => {
  removeTokens();
  removeUserFromLocalStorage();
};
