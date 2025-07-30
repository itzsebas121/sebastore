import { API_BASE_URL } from "../config";
export const PRODUCT_ENDPOINTS = {
  LIST: `${API_BASE_URL}/products`,
  DETAIL: `${API_BASE_URL}/products/:id`,
  CREATE: `${API_BASE_URL}/products`,
  UPDATE: `${API_BASE_URL}/products/:id`,
  DELETE: `${API_BASE_URL}/products/:id`,
};
