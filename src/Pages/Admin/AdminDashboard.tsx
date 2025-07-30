import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  return (
    <div className="admin-dashboard">
 
      <main className="p-4">
        <Outlet /> 
      </main>
    </div>
  );
};

export default AdminDashboard;
