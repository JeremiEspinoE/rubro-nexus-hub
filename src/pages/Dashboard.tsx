
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import TopBar from '@/components/dashboard/TopBar';
import DashboardHome from '@/components/dashboard/DashboardHome';
import SalesModule from '@/components/sales/SalesModule';
import InventoryModule from '@/components/inventory/InventoryModule';
import CustomersModule from '@/components/customers/CustomersModule';
import CashModule from '@/components/cash/CashModule';
import ReportsModule from '@/components/reports/ReportsModule';
import TableManagement from '@/components/restaurant/TableManagement';
import KitchenManagement from '@/components/restaurant/KitchenManagement';

const Dashboard = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [selectedIndustry] = useState(localStorage.getItem('selectedIndustry') || 'restaurante');
  const [selectedBranch, setSelectedBranch] = useState('principal');

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardHome selectedIndustry={selectedIndustry} />;
      case 'sales':
        return <SalesModule />;
      case 'inventory':
        return <InventoryModule />;
      case 'customers':
        return <CustomersModule />;
      case 'cash':
        return <CashModule />;
      case 'reports':
        return <ReportsModule />;
      case 'tables':
        return <TableManagement />;
      case 'kitchen':
        return <KitchenManagement />;
      case 'orders':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Gestión de Comandas</h2>
            <div className="text-center py-12">
              <p className="text-muted-foreground">Módulo de comandas por mozo en desarrollo</p>
            </div>
          </div>
        );
      case 'qr-menu':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Menú QR para Clientes</h2>
            <div className="text-center py-12">
              <p className="text-muted-foreground">Generación de códigos QR para pedidos de clientes</p>
            </div>
          </div>
        );
      case 'split-bill':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">División de Cuenta</h2>
            <div className="text-center py-12">
              <p className="text-muted-foreground">Sistema de división de cuentas entre comensales</p>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios</h2>
            <div className="text-center py-12">
              <p className="text-muted-foreground">Módulo de usuarios y permisos en desarrollo</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Configuración del Sistema</h2>
            <div className="text-center py-12">
              <p className="text-muted-foreground">Configuraciones generales del sistema</p>
            </div>
          </div>
        );
      default:
        return <DashboardHome selectedIndustry={selectedIndustry} />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        selectedIndustry={selectedIndustry}
        activeModule={activeModule}
        onModuleChange={setActiveModule}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar 
          selectedBranch={selectedBranch}
          onBranchChange={setSelectedBranch}
        />
        <main className="flex-1 overflow-auto">
          {renderModule()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
