
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Package, AlertTriangle, TrendingUp, Plus } from "lucide-react";

const InventoryModule = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const productos = [
    {
      id: 1,
      codigo: 'PROD001',
      nombre: 'Acetaminofén 500mg',
      categoria: 'Medicamentos',
      stock: 5,
      stockMin: 10,
      precio: 2.50,
      estado: 'critico'
    },
    {
      id: 2,
      codigo: 'PROD002',
      nombre: 'Ibuprofeno 400mg',
      categoria: 'Medicamentos',
      stock: 25,
      stockMin: 15,
      precio: 3.80,
      estado: 'normal'
    },
    {
      id: 3,
      codigo: 'PROD003',
      nombre: 'Alcohol en gel 250ml',
      categoria: 'Higiene',
      stock: 8,
      stockMin: 12,
      precio: 6.90,
      estado: 'bajo'
    }
  ];

  const movimientos = [
    {
      id: 1,
      fecha: '2024-01-15',
      tipo: 'Entrada',
      producto: 'Acetaminofén 500mg',
      cantidad: 50,
      motivo: 'Compra a proveedor',
      usuario: 'Admin'
    },
    {
      id: 2,
      fecha: '2024-01-15',
      tipo: 'Salida',
      producto: 'Ibuprofeno 400mg',
      cantidad: 3,
      motivo: 'Venta al público',
      usuario: 'Vendedor1'
    }
  ];

  const getStockBadge = (estado: string) => {
    switch (estado) {
      case 'critico':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Stock Crítico</Badge>;
      case 'bajo':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Stock Bajo</Badge>;
      case 'normal':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Normal</Badge>;
      default:
        return <Badge variant="secondary">Desconocido</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Gestión de Almacén</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Producto
        </Button>
      </div>

      <Tabs defaultValue="productos" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="productos">Productos</TabsTrigger>
          <TabsTrigger value="movimientos">Kardex</TabsTrigger>
          <TabsTrigger value="alertas">Alertas</TabsTrigger>
        </TabsList>

        <TabsContent value="productos">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Inventario de Productos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button variant="outline">Filtros</Button>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Producto</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Stock Mín.</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productos.map((producto) => (
                      <TableRow key={producto.id}>
                        <TableCell className="font-medium">{producto.codigo}</TableCell>
                        <TableCell>{producto.nombre}</TableCell>
                        <TableCell>{producto.categoria}</TableCell>
                        <TableCell>{producto.stock}</TableCell>
                        <TableCell>{producto.stockMin}</TableCell>
                        <TableCell>S/ {producto.precio.toFixed(2)}</TableCell>
                        <TableCell>{getStockBadge(producto.estado)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movimientos">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Kardex - Movimientos de Inventario
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Producto</TableHead>
                      <TableHead>Cantidad</TableHead>
                      <TableHead>Motivo</TableHead>
                      <TableHead>Usuario</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {movimientos.map((mov) => (
                      <TableRow key={mov.id}>
                        <TableCell>{mov.fecha}</TableCell>
                        <TableCell>
                          <Badge variant={mov.tipo === 'Entrada' ? 'default' : 'secondary'}>
                            {mov.tipo}
                          </Badge>
                        </TableCell>
                        <TableCell>{mov.producto}</TableCell>
                        <TableCell>{mov.cantidad}</TableCell>
                        <TableCell>{mov.motivo}</TableCell>
                        <TableCell>{mov.usuario}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alertas">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-accent" />
                Alertas de Inventario
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 rounded-lg border border-red-200 bg-red-50">
                  <p className="text-sm text-red-800">
                    <strong>Stock Crítico:</strong> Acetaminofén 500mg tiene solo 5 unidades (mínimo: 10)
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-yellow-200 bg-yellow-50">
                  <p className="text-sm text-yellow-800">
                    <strong>Stock Bajo:</strong> Alcohol en gel 250ml tiene 8 unidades (mínimo: 12)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InventoryModule;
