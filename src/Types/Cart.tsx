export interface Cart {
  cartId: number;
  customerId: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  cartItemId: number;
  cartId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  createdAt: string;
  updatedAt: string;
}
