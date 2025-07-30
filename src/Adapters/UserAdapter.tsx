

import type { Admin, Customer, User } from "../Types/User";

export function adaptarUsuario(data: any): User {
  const base = {
    userId: data.UserId ?? data.userId ?? 0,
    email: data.Email ?? data.email ?? '',
    role: data.Role ?? data.role ?? 'Customer',
    createdAt: data.CreatedAt ?? data.createdAt ?? '',
  };

  switch (base.role) {
    case 'Admin':
      return {
        ...base,
        adminId: data.AdminId ?? data.adminId ?? 0,
        displayName: data.DisplayName ?? data.displayName ?? '',
      } as Admin;
    case 'Customer':
    default:
      return {
        ...base,
        customerId: data.CustomerId ?? data.customerId ?? 0,
        firstName: data.FirstName ?? data.firstName ?? '',
        lastName: data.LastName ?? data.lastName ?? '',
        phone: data.Phone ?? data.phone ?? '',
      } as Customer;
  }
}

export function adaptarCliente(data: any): Customer {
  return {
    userId: data.UserId ?? data.userId ?? 0,
    email: data.Email ?? data.email ?? '',
    role: 'Customer',
    createdAt: data.CreatedAt ?? data.createdAt ?? '',
    customerId: data.CustomerId ?? data.customerId ?? 0,
    firstName: data.FirstName ?? data.firstName ?? '',
    lastName: data.LastName ?? data.lastName ?? '',
    phone: data.Phone ?? data.phone ?? '',
  };
}