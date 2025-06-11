
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BarChart as BarChartIcon, Download, Calendar, TrendingUp } from "lucide-react";

const ReportsModule = () => {
  const ventasPorDia = [
    { dia: 'Lun', ventas: 1200 },
    { dia: 'Mar', ventas: 1800 },
    { dia: 'Mié', ventas: 1500 },
    { dia: 'Jue', ventas: 2200 },
    { dia: 'Vie', ventas: 2800 },
    { dia: 'Sáb', ventas: 3200 },
    { dia: 'Dom', ventas: 2100 }
  ];

  const ventasPorCategoria = [
    { nombre: 'Medicamentos', ventas: 4500, color: '#2A6EF2' },
    { nombre: 'Higiene', ventas: 2800, color: '#10B981' },
    { nombre: 'Belleza', ventas: 1900, color: '#FF9F40' },
    { nombre: 'Otros', ventas: 800, color: '#EF4444' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Reportes Avanzados</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Filtrar Fechas
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="ventas" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="ventas">Ventas</TabsTrigger>
          <TabsTrigger value="productos">Productos</TabsTrigger>
          <TabsTrigger value="clientes">Clientes</TabsTrigger>
          <TabsTrigger value="sunat">SUNAT</TabsTrigger>
        </TabsList>

        <TabsContent value="ventas">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChartIcon className="w-5 h-5" />
                  Ventas por Día
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={ventasPorDia}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dia" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`S/ ${value}`, 'Ventas']} />
                    <Bar dataKey="ventas" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ventas por Categoría</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={ventasPorCategoria}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      dataKey="ventas"
                      label={({ nombre, ventas }) => `${nombre}: S/ ${ventas}`}
                    >
                      {ventasPorCategoria.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Resumen de Ventas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-2xl font-bold text-primary">S/ 15,200</div>
                  <div className="text-sm text-muted-foreground">Total del Mes</div>
                </div>
                <div className="text-center p-4 bg-success/10 rounded-lg">
                  <div className="text-2xl font-bold text-success">+12%</div>
                  <div className="text-sm text-muted-foreground">vs Mes Anterior</div>
                </div>
                <div className="text-center p-4 bg-accent/10 rounded-lg">
                  <div className="text-2xl font-bold text-accent">89</div>
                  <div className="text-sm text-muted-foreground">Comprobantes</div>
                </div>
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-2xl font-bold text-primary">S/ 170</div>
                  <div className="text-sm text-muted-foreground">Ticket Promedio</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="productos">
          <Card>
            <CardHeader>
              <CardTitle>Productos Más Vendidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Análisis de productos más vendidos y rentabilidad</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clientes">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Frecuencia de compra y segmentación de clientes</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sunat">
          <Card>
            <CardHeader>
              <CardTitle>Reportes SUNAT</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Libros electrónicos y reportes para SUNAT</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsModule;
