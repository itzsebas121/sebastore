// CartItem model
class CartItem {
  constructor({ CartItemId, CartId, ProductId, Quantity, UnitPrice, CreatedAt, UpdatedAt }) {
    this.CartItemId = CartItemId;
    this.CartId = CartId;
    this.ProductId = ProductId;
    this.Quantity = Quantity;
    this.UnitPrice = UnitPrice;
    this.CreatedAt = CreatedAt;
    this.UpdatedAt = UpdatedAt;
  }
}
module.exports = CartItem;
