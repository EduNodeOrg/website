import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const ENDPOINT = '/.netlify/functions/masterclass';

export async function requestMasterclass(query, token, signal) {
  const response = await fetch(`${ENDPOINT}?${new URLSearchParams(query)}`, {
    headers: token ? { 'x-auth-token': token } : {},
    cache: 'no-store',
    signal,
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || 'Unable to load this lesson.');
    error.status = response.status;
    throw error;
  }
  return data;
}

export function useMembership() {
  const auth = useSelector((state) => state.auth);
  const token = auth.isAuthenticated && typeof auth.token === 'string' ? auth.token : null;
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState({ token: null, status: 'guest' });
  useEffect(() => {
    if (!token) {
      setResult({ token: null, status: 'guest' });
      return undefined;
    }
    const controller = new AbortController();
    setResult({ token, status: 'loading' });
    requestMasterclass({ access: '1' }, token, controller.signal)
      .then(() => setResult({ token, status: 'pro' }))
      .catch((error) => {
        if (error.name === 'AbortError') return;
        const status = error.status === 403 ? 'free' : error.status === 401 ? 'expired' : 'error';
        setResult({ token, status });
      });
    return () => controller.abort();
  }, [token, attempt]);
  // Do not retain another account's access while the next effect is pending.
  const status = !token ? 'guest' : result.token !== token ? 'loading' : result.status;
  return { token, status, retry: () => setAttempt((value) => value + 1) };
}
