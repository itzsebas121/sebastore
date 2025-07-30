import { API_BASE_URL } from "../config";
export const CATEGORY_ENDPOINTS = {
  LIST: `${API_BASE_URL}/categories`,
  DETAIL: `${API_BASE_URL}/categories/:id`,
  CREATE: `${API_BASE_URL}/categories`,
  UPDATE: `${API_BASE_URL}/categories/:id`,
  DELETE: `${API_BASE_URL}/categories/:id`,
};
