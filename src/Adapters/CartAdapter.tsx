import type { Cart, CartItem } from "../Types/Cart";

export function adaptarCarrito(data: any): Cart {
  return {
    cartId: data.CartId ?? data.cartId ?? 0,
    customerId: data.CustomerId ?? data.customerId ?? 0,
    isActive: Boolean(data.IsActive ?? data.isActive ?? true),
    createdAt: data.CreatedAt ?? data.createdAt ?? '',
    updatedAt: data.UpdatedAt ?? data.updatedAt ?? '',
  };
}

export function adaptarItemCarrito(data: any): CartItem {
  return {
    cartItemId: data.CartItemId ?? data.cartItemId ?? 0,
    cartId: data.CartId ?? data.cartId ?? 0,
    productId: data.ProductId ?? data.productId ?? 0,
    quantity: data.Quantity ?? data.quantity ?? 1,
    unitPrice: data.UnitPrice ?? data.unitPrice ?? 0,
    createdAt: data.CreatedAt ?? data.createdAt ?? '',
    updatedAt: data.UpdatedAt ?? data.updatedAt ?? '',
  };
}
