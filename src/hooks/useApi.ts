import { API_BASE_URL } from '../api/constants';

export async function fetchApi(endpoint: string, options?: RequestInit) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, options);
  if (!res.ok) throw new Error('API error');
  return res.json();
}
