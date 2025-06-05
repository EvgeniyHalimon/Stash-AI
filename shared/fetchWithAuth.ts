import {
  getAccessToken,
  getRefreshToken,
  removeUserDataFromLocalStorage,
  saveTokens,
} from './tokenUtils';

export async function fetchWithAuth(input: RequestInfo, init?: RequestInit) {
  const accessToken = getAccessToken();

  const res = await fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (res.status === 401) {
    const refreshed = await refreshToken();
    if (refreshed) {
      const retryRes = await fetch(input, {
        ...init,
        headers: {
          ...init?.headers,
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
      });
      return retryRes;
    } else {
      throw new Error('Unauthorized');
    }
  }

  return res;
}

async function refreshToken() {
  const refreshToken = getRefreshToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  if (res.ok) {
    const { accessToken, refreshToken: newRefresh } = await res.json();
    saveTokens({
      accessToken,
      refreshToken: newRefresh,
    });
    return true;
  } else {
    removeUserDataFromLocalStorage();
    window.location.href = '/login';
  }

  return false;
}
