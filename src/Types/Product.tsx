export interface GetProductsParams {
  NameFilter?: string;
  CategoryId?: number;
  MinPrice?: number;
  MaxPrice?: number;
  PageNumber?: number;
  PageSize?: number;
}
export interface Product {
  productId: number;
  name: string;
  description?: string;
  price: number;
  categoryId: number;
  imageUrl?: string;
}
