// User model
class User {
  constructor({ UserId, Email, PasswordHash, Role, CreatedAt }) {
    this.UserId = UserId;
    this.Email = Email;
    this.PasswordHash = PasswordHash;
    this.Role = Role;
    this.CreatedAt = CreatedAt;
  }
}
module.exports = User;
