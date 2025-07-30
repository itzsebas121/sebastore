import type { Category } from "../Types/Category";

export function adaptarCategoria(data: any): Category {
  return {
    categoryId: data.CategoryId ?? data.categoryId ?? 0,
    name: data.Name ?? data.name ?? '',
  };
}
