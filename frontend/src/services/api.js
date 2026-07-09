const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const authHeaders = (token) => ({ Authorization: `Bearer ${token}` });

export async function requestJson(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.msg || data.error || 'Request failed');
  }
  return data;
}

export { API_URL };
