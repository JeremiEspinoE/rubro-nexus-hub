
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, DollarSign, TrendingUp, Clock } from "lucide-react";

const CashModule = () => {
  const [cajaAbierta] = useState(true);

  const movimientos = [
    {
      id: 1,
      hora: '08:00',
      tipo: 'Apertura',
      concepto: 'Apertura de caja',
      ingreso: 500.00,
      egreso: 0,
      saldo: 500.00
    },
    {
      id: 2,
      hora: '09:15',
      tipo: 'Venta',
      concepto: 'Boleta B001-123',
      ingreso: 150.00,
      egreso: 0,
      saldo: 650.00
    },
    {
      id: 3,
      hora: '10:30',
      tipo: 'Gasto',
      concepto: 'Compra de insumos',
      ingreso: 0,
      egreso: 80.00,
      saldo: 570.00
    }
  ];

  const resumenCaja = {
    apertura: 500.00,
    ingresoVentas: 2150.00,
    egresos: 180.00,
    saldoActual: 2470.00
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Control de Caja</h1>
        <div className="flex gap-2">
          {cajaAbierta ? (
            <Button variant="destructive">Cerrar Caja</Button>
          ) : (
            <Button>Abrir Caja</Button>
          )}
        </div>
      </div>

      {/* Estado de Caja */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Apertura</p>
                <p className="text-2xl font-bold">S/ {resumenCaja.apertura.toFixed(2)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ingresos</p>
                <p className="text-2xl font-bold text-success">S/ {resumenCaja.ingresoVentas.toFixed(2)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Egresos</p>
                <p className="text-2xl font-bold text-destructive">S/ {resumenCaja.egresos.toFixed(2)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-destructive transform rotate-180" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Saldo Actual</p>
                <p className="text-2xl font-bold">S/ {resumenCaja.saldoActual.toFixed(2)}</p>
              </div>
              <CreditCard className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="movimientos" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="movimientos">Movimientos</TabsTrigger>
          <TabsTrigger value="arqueo">Arqueo</TabsTrigger>
          <TabsTrigger value="historial">Historial</TabsTrigger>
        </TabsList>

        <TabsContent value="movimientos">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Movimientos del Día
                <Badge variant={cajaAbierta ? "default" : "secondary"}>
                  {cajaAbierta ? "Caja Abierta" : "Caja Cerrada"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Hora</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Concepto</TableHead>
                      <TableHead>Ingreso</TableHead>
                      <TableHead>Egreso</TableHead>
                      <TableHead>Saldo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {movimientos.map((mov) => (
                      <TableRow key={mov.id}>
                        <TableCell>{mov.hora}</TableCell>
                        <TableCell>
                          <Badge variant={
                            mov.tipo === 'Venta' ? 'default' :
                            mov.tipo === 'Gasto' ? 'destructive' : 'secondary'
                          }>
                            {mov.tipo}
                          </Badge>
                        </TableCell>
                        <TableCell>{mov.concepto}</TableCell>
                        <TableCell className="text-success">
                          {mov.ingreso > 0 && `S/ ${mov.ingreso.toFixed(2)}`}
                        </TableCell>
                        <TableCell className="text-destructive">
                          {mov.egreso > 0 && `S/ ${mov.egreso.toFixed(2)}`}
                        </TableCell>
                        <TableCell className="font-medium">S/ {mov.saldo.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="arqueo">
          <Card>
            <CardHeader>
              <CardTitle>Arqueo de Caja</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Función de arqueo y conteo físico de efectivo</p>
                <Button>Iniciar Arqueo</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historial">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Cierres</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Historial de cierres anteriores y balances</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CashModule;
