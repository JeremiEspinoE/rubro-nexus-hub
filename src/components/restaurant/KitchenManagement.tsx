import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, ChefHat, AlertCircle, CheckCircle, Timer } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface OrdenCocina {
  id: number;
  mesa: string;
  mozo: string;
  items: {
    nombre: string;
    cantidad: number;
    notas?: string;
    categoria: 'entrada' | 'principal' | 'postre' | 'bebida';
    tiempo: number; // minutos estimados
  }[];
  estado: 'pendiente' | 'preparando' | 'listo' | 'entregado';
  prioridad: 'normal' | 'alta' | 'urgente';
  horaIngreso: string;
  tiempoEstimado: number;
  tiempoTranscurrido: number;
}

const KitchenManagement = () => {
  const [ordenes, setOrdenes] = useState<OrdenCocina[]>([
    {
      id: 1,
      mesa: 'M01',
      mozo: 'Juan Pérez',
      items: [
        { nombre: 'Ceviche Clásico', cantidad: 2, categoria: 'entrada', tiempo: 10 },
        { nombre: 'Lomo Saltado', cantidad: 1, categoria: 'principal', tiempo: 15, notas: 'Sin cebolla' },
        { nombre: 'Ají de Gallina', cantidad: 1, categoria: 'principal', tiempo: 12 }
      ],
      estado: 'preparando',
      prioridad: 'normal',
      horaIngreso: '14:25',
      tiempoEstimado: 20,
      tiempoTranscurrido: 8
    },
    {
      id: 2,
      mesa: 'M04',
      mozo: 'Ana García',
      items: [
        { nombre: 'Anticuchos', cantidad: 1, categoria: 'entrada', tiempo: 8 },
        { nombre: 'Parrilla Mixta', cantidad: 2, categoria: 'principal', tiempo: 25 }
      ],
      estado: 'pendiente',
      prioridad: 'alta',
      horaIngreso: '14:30',
      tiempoEstimado: 25,
      tiempoTranscurrido: 3
    },
    {
      id: 3,
      mesa: 'M07',
      mozo: 'Carlos López',
      items: [
        { nombre: 'Arroz con Pollo', cantidad: 2, categoria: 'principal', tiempo: 18 },
        { nombre: 'Chicha Morada', cantidad: 2, categoria: 'bebida', tiempo: 2 }
      ],
      estado: 'listo',
      prioridad: 'normal',
      horaIngreso: '14:15',
      tiempoEstimado: 18,
      tiempoTranscurrido: 18
    }
  ]);

  const cambiarEstadoOrden = (ordenId: number, nuevoEstado: OrdenCocina['estado']) => {
    setOrdenes(ordenes.map(orden => 
      orden.id === ordenId ? { ...orden, estado: nuevoEstado } : orden
    ));
    
    const orden = ordenes.find(o => o.id === ordenId);
    toast({
      title: "Estado actualizado",
      description: `Orden ${orden?.mesa} marcada como ${nuevoEstado}`,
    });
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'pendiente': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'preparando': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'listo': return 'bg-green-100 text-green-800 border-green-200';
      case 'entregado': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case 'urgente': return 'bg-red-100 text-red-800 border-red-200';
      case 'alta': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'normal': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria) {
      case 'entrada': return '🥗';
      case 'principal': return '🍽️';
      case 'postre': return '🍰';
      case 'bebida': return '🥤';
      default: return '🍴';
    }
  };

  const ordenesActivas = ordenes.filter(o => ['pendiente', 'preparando', 'listo'].includes(o.estado));
  const ordenesEntregadas = ordenes.filter(o => o.estado === 'entregado');

  const resumenCocina = {
    pendientes: ordenes.filter(o => o.estado === 'pendiente').length,
    preparando: ordenes.filter(o => o.estado === 'preparando').length,
    listas: ordenes.filter(o => o.estado === 'listo').length,
    tiempoPromedio: 15
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gestión de Cocina</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <ChefHat className="w-4 h-4 mr-2" />
            Configurar Estaciones
          </Button>
        </div>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Pendientes</p>
                <p className="text-2xl font-bold">{resumenCocina.pendientes}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">En Preparación</p>
                <p className="text-2xl font-bold">{resumenCocina.preparando}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Listos</p>
                <p className="text-2xl font-bold">{resumenCocina.listas}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-muted-foreground">Tiempo Promedio</p>
                <p className="text-2xl font-bold">{resumenCocina.tiempoPromedio}min</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="activas" className="space-y-6">
        <TabsList>
          <TabsTrigger value="activas">Órdenes Activas</TabsTrigger>
          <TabsTrigger value="entregadas">Entregadas</TabsTrigger>
          <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="activas">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {ordenesActivas.map((orden) => (
              <Card key={orden.id} className={`${
                orden.prioridad === 'urgente' ? 'ring-2 ring-red-300' :
                orden.prioridad === 'alta' ? 'ring-2 ring-orange-300' : ''
              }`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Mesa {orden.mesa}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={getPrioridadColor(orden.prioridad)}>
                        {orden.prioridad.toUpperCase()}
                      </Badge>
                      <Badge className={getEstadoColor(orden.estado)}>
                        {orden.estado.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Mozo: {orden.mozo} | Hora: {orden.horaIngreso}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    {orden.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <span>{getCategoriaIcon(item.categoria)}</span>
                          <div>
                            <div className="font-medium">{item.nombre}</div>
                            {item.notas && (
                              <div className="text-xs text-muted-foreground">
                                Nota: {item.notas}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">x{item.cantidad}</div>
                          <div className="text-xs text-muted-foreground">
                            {item.tiempo}min
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{orden.tiempoTranscurrido}min / {orden.tiempoEstimado}min</span>
                    </div>
                    {orden.tiempoTranscurrido > orden.tiempoEstimado && (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    )}
                  </div>

                  <div className="flex gap-2">
                    {orden.estado === 'pendiente' && (
                      <Button 
                        onClick={() => cambiarEstadoOrden(orden.id, 'preparando')}
                        className="flex-1"
                        size="sm"
                      >
                        Iniciar Preparación
                      </Button>
                    )}
                    {orden.estado === 'preparando' && (
                      <Button 
                        onClick={() => cambiarEstadoOrden(orden.id, 'listo')}
                        className="flex-1"
                        size="sm"
                      >
                        Marcar Listo
                      </Button>
                    )}
                    {orden.estado === 'listo' && (
                      <Button 
                        onClick={() => cambiarEstadoOrden(orden.id, 'entregado')}
                        variant="outline"
                        className="flex-1"
                        size="sm"
                      >
                        Entregar
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="entregadas">
          <div className="space-y-4">
            {ordenesEntregadas.map((orden) => (
              <Card key={orden.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="font-medium">Mesa {orden.mesa}</div>
                        <div className="text-sm text-muted-foreground">
                          {orden.mozo} | {orden.horaIngreso}
                        </div>
                      </div>
                      <div className="text-sm">
                        {orden.items.length} item(s)
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getEstadoColor(orden.estado)}>
                        ENTREGADO
                      </Badge>
                      <div className="text-sm text-muted-foreground mt-1">
                        {orden.tiempoTranscurrido} minutos
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="estadisticas">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Estadísticas del Día</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Órdenes Completadas:</span>
                    <span className="font-bold">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tiempo Promedio:</span>
                    <span className="font-bold">15.5 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Órdenes a Tiempo:</span>
                    <span className="font-bold text-green-600">87%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Órdenes Retrasadas:</span>
                    <span className="font-bold text-red-600">3</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platos Más Pedidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Lomo Saltado</span>
                    <span className="font-bold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ceviche Clásico</span>
                    <span className="font-bold">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ají de Gallina</span>
                    <span className="font-bold">6</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Anticuchos</span>
                    <span className="font-bold">5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KitchenManagement;
