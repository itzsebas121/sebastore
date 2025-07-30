export interface Sale {
  saleId: number;
  productId: number;
  customerId: number;
  saleDate: string;
  unitPrice: number;
  totalAmount: number;
  deliveryNote?: string;
  status: string;
}
