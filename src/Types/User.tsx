
export type UserRole = 'Admin' | 'Customer';

export interface BaseUser {
  userId: number;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface Admin extends BaseUser {
  role: 'Admin';
  adminId: number;
  displayName?: string;
}

export interface Customer extends BaseUser {
  role: 'Customer';
  customerId: number;
  firstName: string;
  lastName: string;
  phone?: string;
}

export type User = Admin | Customer;