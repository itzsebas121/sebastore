export type SaleStatus = 'Pending' | 'Cancelled' | 'Completed';

export interface Sale {
  saleId: number;
  productId: number;
  customerId: number;
  saleDate: string;
  unitPrice: number;
  totalAmount: number;
  deliveryNote?: string;
  status: SaleStatus;
}

export interface SaleStatusHistory {
  historyId: number;
  saleId: number;
  previousStatus: SaleStatus;
  newStatus: SaleStatus;
  changeDate: string;
}
