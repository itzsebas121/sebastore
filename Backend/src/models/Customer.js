// Customer model
class Customer {
  constructor({ CustomerId, UserId, FirstName, LastName, Phone }) {
    this.CustomerId = CustomerId;
    this.UserId = UserId;
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.Phone = Phone;
  }
}
module.exports = Customer;
