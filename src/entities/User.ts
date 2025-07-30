export type Role = 'Customer' | 'Admin';

export interface User {
  userId: number;
  email: string;
  role: Role;
  createdAt: string;
}
