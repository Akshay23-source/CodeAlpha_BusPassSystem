import { authEventEmitter } from '../context/AuthContext';

const API_URL = process.env.REACT_APP_API_URL || 
  (window.location.port === '3000' ? 'http://localhost:5000' : '');

export const authHeaders = (token) => ({ Authorization: `Bearer ${token}` });

export async function requestJson(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    authEventEmitter.emitExpired();
    throw new Error('Unauthorized session expired');
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.msg || data.error || 'Request failed');
  }
  return data;
}

export { API_URL };

