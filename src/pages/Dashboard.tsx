
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import TopBar from '@/components/dashboard/TopBar';
import DashboardHome from '@/components/dashboard/DashboardHome';

const Dashboard = () => {
  const [selectedIndustry] = useState('restaurante'); // En producción esto vendría del contexto/auth
  const [activeModule, setActiveModule] = useState('dashboard');
  const [selectedBranch, setSelectedBranch] = useState('principal');

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardHome />;
      case 'sales':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-foreground mb-4">Módulo de Ventas</h1>
            <p className="text-muted-foreground">Punto de venta, historial y gestión de comprobantes electrónicos</p>
          </div>
        );
      case 'inventory':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-foreground mb-4">Gestión de Almacén</h1>
            <p className="text-muted-foreground">Control de inventario, entradas, salidas y kardex</p>
          </div>
        );
      case 'customers':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-foreground mb-4">Gestión de Clientes</h1>
            <p className="text-muted-foreground">Base de datos de clientes con búsqueda automática por DNI/RUC</p>
          </div>
        );
      case 'cash':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-foreground mb-4">Control de Caja</h1>
            <p className="text-muted-foreground">Arqueo, historial de movimientos y cierre de turnos</p>
          </div>
        );
      case 'reports':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-foreground mb-4">Reportes Avanzados</h1>
            <p className="text-muted-foreground">Análisis de ventas, comparativas y reportes exportables</p>
          </div>
        );
      case 'users':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-foreground mb-4">Gestión de Usuarios</h1>
            <p className="text-muted-foreground">Control de acceso, roles y permisos por sucursal</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-foreground mb-4">Configuración</h1>
            <p className="text-muted-foreground">Configuración de empresa, impresión y parámetros del sistema</p>
          </div>
        );
      // Módulos específicos de restaurante
      case 'tables':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-foreground mb-4">Gestión de Mesas</h1>
            <p className="text-muted-foreground">Control de mesas, salones y estado de ocupación</p>
          </div>
        );
      case 'kitchen':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-foreground mb-4">Módulo de Cocina</h1>
            <p className="text-muted-foreground">Comandas, notificaciones y seguimiento de pedidos</p>
          </div>
        );
      default:
        return <DashboardHome />;
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
        <div className="flex-1 overflow-auto">
          {renderModule()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
