import type { Sale, SaleStatusHistory } from "../Types/Sale";

export function adaptarVenta(data: any): Sale {
  return {
    saleId: data.SaleId ?? data.saleId ?? 0,
    productId: data.ProductId ?? data.productId ?? 0,
    customerId: data.CustomerId ?? data.customerId ?? 0,
    saleDate: data.SaleDate ?? data.saleDate ?? '',
    unitPrice: data.UnitPrice ?? data.unitPrice ?? 0,
    totalAmount: data.TotalAmount ?? data.totalAmount ?? 0,
    deliveryNote: data.DeliveryNote ?? data.deliveryNote ?? '',
    status: data.Status ?? data.status ?? 'Pending',
  };
}

export function adaptarHistorialEstado(data: any): SaleStatusHistory {
  return {
    historyId: data.HistoryId ?? data.historyId ?? 0,
    saleId: data.SaleId ?? data.saleId ?? 0,
    previousStatus: data.PreviousStatus ?? data.previousStatus ?? 'Pending',
    newStatus: data.NewStatus ?? data.newStatus ?? 'Pending',
    changeDate: data.ChangeDate ?? data.changeDate ?? '',
  };
}
