// Sale model
class Sale {
  constructor({ SaleId, ProductId, CustomerId, SaleDate, UnitPrice, TotalAmount, DeliveryNote, Status }) {
    this.SaleId = SaleId;
    this.ProductId = ProductId;
    this.CustomerId = CustomerId;
    this.SaleDate = SaleDate;
    this.UnitPrice = UnitPrice;
    this.TotalAmount = TotalAmount;
    this.DeliveryNote = DeliveryNote;
    this.Status = Status;
  }
}
module.exports = Sale;
