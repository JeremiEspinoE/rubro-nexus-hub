
import React from 'react';
import { 
  Home, 
  ShoppingCart, 
  Package, 
  Users, 
  CreditCard, 
  BarChart, 
  Settings,
  Utensils,
  Pill,
  User,
  ChefHat,
  QrCode,
  Receipt,
  Calculator
} from "lucide-react";
import { Card } from "@/components/ui/card";

interface SidebarProps {
  selectedIndustry: string;
  activeModule: string;
  onModuleChange: (module: string) => void;
}

const Sidebar = ({ selectedIndustry, activeModule, onModuleChange }: SidebarProps) => {
  const commonModules = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'sales', name: 'Ventas', icon: ShoppingCart },
    { id: 'inventory', name: 'Almacén', icon: Package },
    { id: 'customers', name: 'Clientes', icon: Users },
    { id: 'cash', name: 'Caja', icon: CreditCard },
    { id: 'reports', name: 'Reportes', icon: BarChart },
    { id: 'users', name: 'Usuarios', icon: User },
    { id: 'settings', name: 'Configuración', icon: Settings }
  ];

  const industryModules = {
    restaurante: [
      { id: 'tables', name: 'Gestión de Mesas', icon: Utensils },
      { id: 'kitchen', name: 'Cocina', icon: ChefHat },
      { id: 'orders', name: 'Comandas', icon: Receipt },
      { id: 'qr-menu', name: 'Menú QR', icon: QrCode },
      { id: 'split-bill', name: 'División de Cuenta', icon: Calculator }
    ],
    botica: [
      { id: 'prescriptions', name: 'Recetas', icon: Pill },
      { id: 'batches', name: 'Lotes y Vencimientos', icon: Package }
    ],
    ferreteria: [
      { id: 'quotes', name: 'Cotizaciones', icon: BarChart },
      { id: 'suppliers', name: 'Proveedores', icon: Users }
    ],
    minimarket: [
      { id: 'promotions', name: 'Promociones', icon: ShoppingCart }
    ]
  };

  const specificModules = industryModules[selectedIndustry as keyof typeof industryModules] || [];

  return (
    <div className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <ShoppingCart className="w-4 h-4 text-sidebar-primary-foreground" />
          </div>
          <span className="font-semibold text-sidebar-foreground">SistemaMultirubro</span>
        </div>
        <div className="text-xs text-sidebar-foreground/60 capitalize">
          {selectedIndustry} • Sucursal Principal
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Módulos Comunes */}
        <div>
          <h3 className="text-xs font-medium text-sidebar-foreground/60 mb-3 uppercase tracking-wider">
            Módulos Principales
          </h3>
          <div className="space-y-1">
            {commonModules.map((module) => (
              <button
                key={module.id}
                onClick={() => onModuleChange(module.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeModule === module.id
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                }`}
              >
                <module.icon className="w-4 h-4" />
                <span className="text-sm">{module.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Módulos Específicos */}
        {specificModules.length > 0 && (
          <div>
            <h3 className="text-xs font-medium text-sidebar-foreground/60 mb-3 uppercase tracking-wider">
              Específicos de {selectedIndustry}
            </h3>
            <div className="space-y-1">
              {specificModules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => onModuleChange(module.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeModule === module.id
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                  }`}
                >
                  <module.icon className="w-4 h-4" />
                  <span className="text-sm">{module.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <Card className="p-3 bg-sidebar-accent/30">
          <div className="text-xs text-sidebar-foreground/80">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>SUNAT Activo</span>
            </div>
            <div className="text-sidebar-foreground/60">
              Facturación electrónica habilitada
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Sidebar;
