
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, FileText, CheckCircle, XCircle, Clock, Download, Eye } from "lucide-react";

const SalesModule = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Datos de ejemplo para comprobantes
  const comprobantes = [
    {
      id: 1,
      serie: 'B001',
      numero: '00000123',
      tipo: 'Boleta',
      cliente: 'Juan Pérez',
      total: 150.00,
      fecha: '2024-01-15',
      estado: 'validado',
      sunatStatus: 'Aceptado por SUNAT',
      xml: true,
      pdf: true
    },
    {
      id: 2,
      serie: 'F001',
      numero: '00000045',
      tipo: 'Factura',
      cliente: 'Empresa ABC SAC',
      total: 850.00,
      fecha: '2024-01-15',
      estado: 'pendiente',
      sunatStatus: 'Pendiente de envío',
      xml: false,
      pdf: true
    },
    {
      id: 3,
      serie: 'B001',
      numero: '00000124',
      tipo: 'Boleta',
      cliente: 'María García',
      total: 75.50,
      fecha: '2024-01-14',
      estado: 'rechazado',
      sunatStatus: 'Rechazado - Error en RUC',
      xml: false,
      pdf: true
    },
    {
      id: 4,
      serie: 'F001',
      numero: '00000046',
      tipo: 'Factura',
      cliente: 'Distribuidora XYZ EIRL',
      total: 1250.00,
      fecha: '2024-01-14',
      estado: 'validado',
      sunatStatus: 'Aceptado por SUNAT',
      xml: true,
      pdf: true
    }
  ];

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case 'validado':
        return <Badge className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="w-3 h-3 mr-1" />Validado</Badge>;
      case 'pendiente':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200"><Clock className="w-3 h-3 mr-1" />Pendiente</Badge>;
      case 'rechazado':
        return <Badge className="bg-red-100 text-red-800 border-red-200"><XCircle className="w-3 h-3 mr-1" />Rechazado</Badge>;
      default:
        return <Badge variant="secondary">Desconocido</Badge>;
    }
  };

  const filteredComprobantes = comprobantes.filter(comp =>
    comp.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comp.serie.includes(searchTerm) ||
    comp.numero.includes(searchTerm)
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Módulo de Ventas</h1>
      </div>

      <Tabs defaultValue="pos" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pos">Punto de Venta</TabsTrigger>
          <TabsTrigger value="comprobantes">Comprobantes Electrónicos</TabsTrigger>
          <TabsTrigger value="historial">Historial de Ventas</TabsTrigger>
        </TabsList>

        <TabsContent value="pos">
          <Card>
            <CardHeader>
              <CardTitle>Punto de Venta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Módulo de punto de venta en desarrollo</p>
                <Button>Iniciar Nueva Venta</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comprobantes">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Comprobantes Electrónicos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Buscar por cliente, serie o número..."
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
                      <TableHead>Comprobante</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Estado SUNAT</TableHead>
                      <TableHead>Documentos</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredComprobantes.map((comp) => (
                      <TableRow key={comp.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{comp.tipo}</div>
                            <div className="text-sm text-muted-foreground">{comp.serie}-{comp.numero}</div>
                          </div>
                        </TableCell>
                        <TableCell>{comp.cliente}</TableCell>
                        <TableCell>{comp.fecha}</TableCell>
                        <TableCell>S/ {comp.total.toFixed(2)}</TableCell>
                        <TableCell>
                          {getStatusBadge(comp.estado)}
                          <div className="text-xs text-muted-foreground mt-1">{comp.sunatStatus}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {comp.xml && <Badge variant="outline" className="text-xs">XML</Badge>}
                            {comp.pdf && <Badge variant="outline" className="text-xs">PDF</Badge>}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historial">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Ventas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Resumen de ventas y reportes detallados</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesModule;
