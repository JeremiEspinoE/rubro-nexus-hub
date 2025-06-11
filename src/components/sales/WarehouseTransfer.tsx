
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, Trash2, FileText, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface TransferItem {
  id: string;
  codigo: string;
  nombre: string;
  cantidad: number;
  stockOrigen: number;
  stockDestino: number;
}

interface WarehouseTransferProps {
  almacenes: Array<{ id: string; nombre: string }>;
}

const WarehouseTransfer = ({ almacenes }: WarehouseTransferProps) => {
  const [almacenOrigen, setAlmacenOrigen] = useState('');
  const [almacenDestino, setAlmacenDestino] = useState('');
  const [items, setItems] = useState<TransferItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [observaciones, setObservaciones] = useState('');

  // Productos simulados con stock por almacén
  const productos = [
    {
      codigo: 'PROD001',
      nombre: 'Arroz Superior 1kg',
      stock: {
        principal: 100,
        sucursal1: 50,
        sucursal2: 25
      }
    },
    {
      codigo: 'PROD002',
      nombre: 'Aceite Primor 1L',
      stock: {
        principal: 80,
        sucursal1: 40,
        sucursal2: 20
      }
    },
    {
      codigo: 'PROD003',
      nombre: 'Azúcar Blanca 1kg',
      stock: {
        principal: 150,
        sucursal1: 75,
        sucursal2: 30
      }
    }
  ];

  const filteredProducts = productos.filter(product =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addTransferItem = (product: any) => {
    if (!almacenOrigen || !almacenDestino) {
      toast({
        title: "Error",
        description: "Debe seleccionar almacén de origen y destino",
        variant: "destructive"
      });
      return;
    }

    if (almacenOrigen === almacenDestino) {
      toast({
        title: "Error",
        description: "El almacén de origen y destino no pueden ser iguales",
        variant: "destructive"
      });
      return;
    }

    const stockOrigen = product.stock[almacenOrigen] || 0;
    const stockDestino = product.stock[almacenDestino] || 0;

    if (stockOrigen === 0) {
      toast({
        title: "Error",
        description: "No hay stock disponible en el almacén de origen",
        variant: "destructive"
      });
      return;
    }

    const existingItem = items.find(item => item.codigo === product.codigo);
    if (existingItem) {
      toast({
        title: "Error",
        description: "El producto ya está en la lista de transferencia",
        variant: "destructive"
      });
      return;
    }

    const newItem: TransferItem = {
      id: `${product.codigo}-${Date.now()}`,
      codigo: product.codigo,
      nombre: product.nombre,
      cantidad: 1,
      stockOrigen,
      stockDestino
    };

    setItems([...items, newItem]);
  };

  const updateQuantity = (id: string, cantidad: number) => {
    const item = items.find(i => i.id === id);
    if (!item) return;

    if (cantidad <= 0) {
      removeItem(id);
      return;
    }

    if (cantidad > item.stockOrigen) {
      toast({
        title: "Error",
        description: `Cantidad máxima disponible: ${item.stockOrigen}`,
        variant: "destructive"
      });
      return;
    }

    setItems(items.map(item => 
      item.id === id ? { ...item, cantidad } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const procesarTransferencia = () => {
    if (!almacenOrigen || !almacenDestino) {
      toast({
        title: "Error",
        description: "Debe seleccionar almacén de origen y destino",
        variant: "destructive"
      });
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Error",
        description: "Debe agregar al menos un producto",
        variant: "destructive"
      });
      return;
    }

    const transferData = {
      almacenOrigen,
      almacenDestino,
      items,
      observaciones,
      fecha: new Date().toISOString(),
      numero: `TR-${Date.now()}`
    };

    console.log('Procesando transferencia:', transferData);

    toast({
      title: "Transferencia procesada",
      description: `Transferencia ${transferData.numero} creada exitosamente`,
    });

    // Limpiar formulario
    setItems([]);
    setObservaciones('');
  };

  return (
    <div className="space-y-6">
      {/* Configuración de transferencia */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Almacén de Origen</Label>
          <Select value={almacenOrigen} onValueChange={setAlmacenOrigen}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar origen" />
            </SelectTrigger>
            <SelectContent>
              {almacenes.map((almacen) => (
                <SelectItem key={almacen.id} value={almacen.id}>
                  {almacen.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Almacén de Destino</Label>
          <Select value={almacenDestino} onValueChange={setAlmacenDestino}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar destino" />
            </SelectTrigger>
            <SelectContent>
              {almacenes.map((almacen) => (
                <SelectItem key={almacen.id} value={almacen.id}>
                  {almacen.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Búsqueda de productos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Seleccionar Productos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="rounded-md border max-h-64 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Stock Origen</TableHead>
                    <TableHead>Stock Destino</TableHead>
                    <TableHead>Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => {
                    const stockOrigen = product.stock[almacenOrigen as keyof typeof product.stock] || 0;
                    const stockDestino = product.stock[almacenDestino as keyof typeof product.stock] || 0;
                    
                    return (
                      <TableRow key={product.codigo}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{product.nombre}</div>
                            <div className="text-sm text-muted-foreground">{product.codigo}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={stockOrigen > 0 ? "default" : "destructive"}>
                            {stockOrigen}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{stockDestino}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            onClick={() => addTransferItem(product)}
                            disabled={!almacenOrigen || !almacenDestino || stockOrigen === 0}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items de transferencia */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRight className="w-5 h-5" />
            Items a Transferir
          </CardTitle>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No hay productos seleccionados</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead>Cantidad</TableHead>
                      <TableHead>Stock Origen</TableHead>
                      <TableHead>Nuevo Stock Origen</TableHead>
                      <TableHead>Stock Destino</TableHead>
                      <TableHead>Nuevo Stock Destino</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{item.nombre}</div>
                            <div className="text-sm text-muted-foreground">{item.codigo}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.cantidad}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                            className="w-20"
                            min="1"
                            max={item.stockOrigen}
                          />
                        </TableCell>
                        <TableCell>{item.stockOrigen}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {item.stockOrigen - item.cantidad}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.stockDestino}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {item.stockDestino + item.cantidad}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div>
                <Label>Observaciones</Label>
                <Input
                  placeholder="Motivo de la transferencia..."
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                />
              </div>

              <Button onClick={procesarTransferencia} className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Procesar Transferencia
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WarehouseTransfer;
