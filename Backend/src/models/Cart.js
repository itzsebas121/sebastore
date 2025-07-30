// Cart model
class Cart {
  constructor({ CartId, CustomerId, IsActive, CreatedAt, UpdatedAt }) {
    this.CartId = CartId;
    this.CustomerId = CustomerId;
    this.IsActive = IsActive;
    this.CreatedAt = CreatedAt;
    this.UpdatedAt = UpdatedAt;
  }
}
module.exports = Cart;
