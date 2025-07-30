// Product model
class Product {
  constructor({ ProductId, Name, Description, Price, CategoryId, ImageUrl }) {
    this.ProductId = ProductId;
    this.Name = Name;
    this.Description = Description;
    this.Price = Price;
    this.CategoryId = CategoryId;
    this.ImageUrl = ImageUrl;
  }
}
module.exports = Product;
