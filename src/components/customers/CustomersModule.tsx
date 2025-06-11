
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Users, Plus, Eye } from "lucide-react";

const CustomersModule = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dniSearch, setDniSearch] = useState('');

  const clientes = [
    {
      id: 1,
      nombre: 'Juan Carlos Pérez López',
      dni: '12345678',
      email: 'juan.perez@email.com',
      telefono: '987654321',
      tipo: 'Natural',
      ultimaCompra: '2024-01-15',
      totalCompras: 1250.00
    },
    {
      id: 2,
      nombre: 'Empresa ABC SAC',
      ruc: '20123456789',
      email: 'contacto@empresaabc.com',
      telefono: '014567890',
      tipo: 'Jurídica',
      ultimaCompra: '2024-01-14',
      totalCompras: 15800.00
    }
  ];

  const handleDniSearch = async () => {
    // Simulación de búsqueda en RENIEC
    if (dniSearch === '87654321') {
      alert('Cliente encontrado: María García Rodríguez');
    } else {
      alert('Cliente no encontrado en RENIEC');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Gestión de Clientes</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Cliente
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Base de Datos de Clientes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar clientes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Documento</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Última Compra</TableHead>
                    <TableHead>Total Compras</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clientes.map((cliente) => (
                    <TableRow key={cliente.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{cliente.nombre}</div>
                          <Badge variant="outline" className="text-xs">
                            {cliente.tipo}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        {cliente.dni ? cliente.dni : cliente.ruc}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{cliente.email}</div>
                          <div className="text-muted-foreground">{cliente.telefono}</div>
                        </div>
                      </TableCell>
                      <TableCell>{cliente.ultimaCompra}</TableCell>
                      <TableCell>S/ {cliente.totalCompras.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-3 h-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Búsqueda por DNI/RUC</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">DNI o RUC</label>
              <Input
                placeholder="Ingrese DNI o RUC"
                value={dniSearch}
                onChange={(e) => setDniSearch(e.target.value)}
              />
            </div>
            <Button onClick={handleDniSearch} className="w-full">
              <Search className="w-4 h-4 mr-2" />
              Buscar en RENIEC/SUNAT
            </Button>
            
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <h4 className="font-medium text-sm mb-2">Búsqueda Automática</h4>
              <p className="text-xs text-muted-foreground">
                El sistema busca automáticamente en las bases de datos de RENIEC y SUNAT 
                para completar los datos del cliente.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomersModule;
