import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarCliente from '../../components/NavbarClient';
const ClienteDashboard: React.FC = () => {
  return (
    <div className="cliente-dashboard">
      <NavbarCliente />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default ClienteDashboard;
