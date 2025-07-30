import type { Product } from "../Types/Product";

export function adaptarProducto(data: any): Product {
  return {
    productId: data.ProductId ?? data.productId ?? 0,
    name: data.Name ?? data.name ?? '',
    description: data.Description ?? data.description ?? '',
    price: data.Price ?? data.price ?? 0,
    categoryId: data.CategoryId ?? data.categoryId ?? 0,
    imageUrl: data.ImageUrl ?? data.imageUrl ?? '',
  };
}
