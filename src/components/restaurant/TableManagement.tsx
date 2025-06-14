
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Utensils, Users, Clock, DollarSign, QrCode, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Mesa {
  id: number;
  numero: string;
  capacidad: number;
  estado: 'libre' | 'ocupada' | 'reservada' | 'limpieza';
  mozo: string;
  tiempoOcupacion?: string;
  cuenta?: number;
  clientes?: number;
}

const TableManagement = () => {
  const [mesas, setMesas] = useState<Mesa[]>([
    { id: 1, numero: 'M01', capacidad: 4, estado: 'ocupada', mozo: 'Juan Pérez', tiempoOcupacion: '45 min', cuenta: 125.50, clientes: 3 },
    { id: 2, numero: 'M02', capacidad: 2, estado: 'libre', mozo: '', clientes: 0 },
    { id: 3, numero: 'M03', capacidad: 6, estado: 'reservada', mozo: 'Ana García', tiempoOcupacion: '15:30', clientes: 0 },
    { id: 4, numero: 'M04', capacidad: 4, estado: 'ocupada', mozo: 'Carlos López', tiempoOcupacion: '1h 20min', cuenta: 89.00, clientes: 2 },
    { id: 5, numero: 'M05', capacidad: 8, estado: 'libre', mozo: '', clientes: 0 },
    { id: 6, numero: 'M06', capacidad: 2, estado: 'limpieza', mozo: '', clientes: 0 },
    { id: 7, numero: 'M07', capacidad: 4, estado: 'ocupada', mozo: 'María Silva', tiempoOcupacion: '30 min', cuenta: 67.80, clientes: 4 },
    { id: 8, numero: 'M08', capacidad: 6, estado: 'libre', mozo: '', clientes: 0 }
  ]);

  const [selectedMesa, setSelectedMesa] = useState<Mesa | null>(null);
  const [showNewOrder, setShowNewOrder] = useState(false);

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'libre': return 'bg-green-100 text-green-800 border-green-200';
      case 'ocupada': return 'bg-red-100 text-red-800 border-red-200';
      case 'reservada': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'limpieza': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'libre': return '🟢';
      case 'ocupada': return '🔴';
      case 'reservada': return '🟡';
      case 'limpieza': return '🔵';
      default: return '⚪';
    }
  };

  const cambiarEstadoMesa = (mesaId: number, nuevoEstado: Mesa['estado']) => {
    setMesas(mesas.map(mesa => 
      mesa.id === mesaId 
        ? { ...mesa, estado: nuevoEstado, mozo: nuevoEstado === 'libre' ? '' : mesa.mozo }
        : mesa
    ));
    toast({
      title: "Estado actualizado",
      description: `Mesa ${mesas.find(m => m.id === mesaId)?.numero} marcada como ${nuevoEstado}`,
    });
  };

  const asignarMozo = (mesaId: number, mozo: string) => {
    setMesas(mesas.map(mesa => 
      mesa.id === mesaId ? { ...mesa, mozo } : mesa
    ));
  };

  const generarQRMesa = (mesa: Mesa) => {
    toast({
      title: "QR Generado",
      description: `Código QR para mesa ${mesa.numero} generado para pedidos de clientes`,
    });
  };

  const iniciarComanda = (mesa: Mesa) => {
    setSelectedMesa(mesa);
    setShowNewOrder(true);
  };

  const mozos = ['Juan Pérez', 'Ana García', 'Carlos López', 'María Silva', 'Pedro Ruiz'];

  const resumenMesas = {
    total: mesas.length,
    libres: mesas.filter(m => m.estado === 'libre').length,
    ocupadas: mesas.filter(m => m.estado === 'ocupada').length,
    reservadas: mesas.filter(m => m.estado === 'reservada').length,
    limpieza: mesas.filter(m => m.estado === 'limpieza').length
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gestión de Mesas</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Mesa
          </Button>
        </div>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Utensils className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Mesas</p>
                <p className="text-2xl font-bold">{resumenMesas.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm text-muted-foreground">Libres</p>
                <p className="text-2xl font-bold">{resumenMesas.libres}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div>
                <p className="text-sm text-muted-foreground">Ocupadas</p>
                <p className="text-2xl font-bold">{resumenMesas.ocupadas}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div>
                <p className="text-sm text-muted-foreground">Reservadas</p>
                <p className="text-2xl font-bold">{resumenMesas.reservadas}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-sm text-muted-foreground">Limpieza</p>
                <p className="text-2xl font-bold">{resumenMesas.limpieza}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grid de Mesas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {mesas.map((mesa) => (
          <Card key={mesa.id} className={`cursor-pointer transition-all hover:shadow-lg ${
            mesa.estado === 'ocupada' ? 'ring-2 ring-red-200' : 
            mesa.estado === 'reservada' ? 'ring-2 ring-yellow-200' : ''
          }`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{mesa.numero}</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getEstadoIcon(mesa.estado)}</span>
                  <Badge className={getEstadoColor(mesa.estado)}>
                    {mesa.estado.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  {mesa.clientes > 0 ? `${mesa.clientes}/` : ''}{mesa.capacidad} personas
                </span>
              </div>

              {mesa.mozo && (
                <div className="text-sm">
                  <span className="font-medium">Mozo:</span> {mesa.mozo}
                </div>
              )}

              {mesa.tiempoOcupacion && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{mesa.tiempoOcupacion}</span>
                </div>
              )}

              {mesa.cuenta && (
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">S/ {mesa.cuenta.toFixed(2)}</span>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      Gestionar
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Gestionar Mesa {mesa.numero}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Estado</Label>
                        <Select 
                          value={mesa.estado} 
                          onValueChange={(value: Mesa['estado']) => cambiarEstadoMesa(mesa.id, value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="libre">Libre</SelectItem>
                            <SelectItem value="ocupada">Ocupada</SelectItem>
                            <SelectItem value="reservada">Reservada</SelectItem>
                            <SelectItem value="limpieza">En Limpieza</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Mozo Asignado</Label>
                        <Select 
                          value={mesa.mozo} 
                          onValueChange={(value) => asignarMozo(mesa.id, value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar mozo" />
                          </SelectTrigger>
                          <SelectContent>
                            {mozos.map(mozo => (
                              <SelectItem key={mozo} value={mozo}>{mozo}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          onClick={() => generarQRMesa(mesa)}
                          variant="outline"
                          className="flex-1"
                        >
                          <QrCode className="w-4 h-4 mr-2" />
                          QR Mesa
                        </Button>
                        {mesa.estado === 'libre' && (
                          <Button 
                            onClick={() => iniciarComanda(mesa)}
                            className="flex-1"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Nueva Comanda
                          </Button>
                        )}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal Nueva Comanda */}
      <Dialog open={showNewOrder} onOpenChange={setShowNewOrder}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Nueva Comanda - Mesa {selectedMesa?.numero}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Número de Clientes</Label>
                <Input type="number" placeholder="Cantidad de personas" />
              </div>
              <div>
                <Label>Mozo</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar mozo" />
                  </SelectTrigger>
                  <SelectContent>
                    {mozos.map(mozo => (
                      <SelectItem key={mozo} value={mozo}>{mozo}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1">Iniciar Comanda</Button>
              <Button variant="outline" onClick={() => setShowNewOrder(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TableManagement;
