
import React from 'react';
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ShoppingCart, Package, CreditCard, Users, TrendingUp, AlertTriangle } from "lucide-react";

const DashboardHome = () => {
  const salesData = [
    { name: 'Lun', ventas: 4000 },
    { name: 'Mar', ventas: 3000 },
    { name: 'Mié', ventas: 5000 },
    { name: 'Jue', ventas: 4500 },
    { name: 'Vie', ventas: 6000 },
    { name: 'Sáb', ventas: 8000 },
    { name: 'Dom', ventas: 7000 }
  ];

  const monthlyData = [
    { name: 'Ene', ventas: 65000 },
    { name: 'Feb', ventas: 59000 },
    { name: 'Mar', ventas: 80000 },
    { name: 'Abr', ventas: 81000 },
    { name: 'May', ventas: 95000 },
    { name: 'Jun', ventas: 105000 }
  ];

  const stats = [
    {
      title: 'Ventas Hoy',
      value: 'S/ 15,240',
      change: '+12%',
      icon: ShoppingCart,
      color: 'text-primary'
    },
    {
      title: 'Productos en Stock',
      value: '1,245',
      change: '-3%',
      icon: Package,
      color: 'text-success'
    },
    {
      title: 'Efectivo en Caja',
      value: 'S/ 8,950',
      change: '+5%',
      icon: CreditCard,
      color: 'text-accent'
    },
    {
      title: 'Clientes Atendidos',
      value: '89',
      change: '+18%',
      icon: Users,
      color: 'text-primary'
    }
  ];

  const alerts = [
    { type: 'warning', message: 'Producto "Acetaminofén 500mg" con stock bajo (5 unidades)' },
    { type: 'info', message: 'Nuevo comprobante electrónico enviado a SUNAT' },
    { type: 'warning', message: '3 productos próximos a vencer esta semana' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Último update: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className={`text-sm ${stat.change.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                  {stat.change} vs ayer
                </p>
              </div>
              <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Ventas de la Semana</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`S/ ${value}`, 'Ventas']} />
              <Bar dataKey="ventas" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Tendencia Mensual</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`S/ ${value}`, 'Ventas']} />
              <Line type="monotone" dataKey="ventas" stroke="hsl(var(--primary))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Alerts and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-accent" />
            Notificaciones
          </h3>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className={`p-3 rounded-lg border ${
                alert.type === 'warning' ? 'bg-accent/10 border-accent/20' : 'bg-primary/10 border-primary/20'
              }`}>
                <p className="text-sm text-foreground">{alert.message}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Estado SUNAT</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
              <span className="text-sm text-foreground">Conexión SUNAT</span>
              <span className="text-sm text-success font-medium">Activo</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
              <span className="text-sm text-foreground">Comprobantes enviados hoy</span>
              <span className="text-sm text-success font-medium">47</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
              <span className="text-sm text-foreground">Último envío</span>
              <span className="text-sm text-primary font-medium">14:32 hrs</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
