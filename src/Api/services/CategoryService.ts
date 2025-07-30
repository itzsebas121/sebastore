import { CATEGORY_ENDPOINTS } from '../endpoints/Category';

export async function getCategoriesService() {
    const response = await fetch(CATEGORY_ENDPOINTS.LIST, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (!response.ok) {
    throw new Error("Failed to fetch categories")
  }
  return await response.json();
}

export async function getCategoryById(id: number) {
    const res = await fetch(CATEGORY_ENDPOINTS.DETAIL.replace(':id', String(id)));
    return await res.json();
}

export async function createCategory(category: any) {
    const res = await fetch(CATEGORY_ENDPOINTS.CREATE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
    });
    return await res.json();
}

export async function updateCategory(id: number, category: any) {
    const res = await fetch(CATEGORY_ENDPOINTS.UPDATE.replace(':id', String(id)), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
    });
    return await res.json();
}

export async function deleteCategory(id: number) {
    const res = await fetch(CATEGORY_ENDPOINTS.DELETE.replace(':id', String(id)), {
        method: 'DELETE'
    });
    return await res.json();
}
