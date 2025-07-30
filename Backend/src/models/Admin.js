// Admin model
class Admin {
  constructor({ AdminId, UserId, DisplayName }) {
    this.AdminId = AdminId;
    this.UserId = UserId;
    this.DisplayName = DisplayName;
  }
}
module.exports = Admin;
