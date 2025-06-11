
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Plus, Trash2, FileText, Calculator } from "lucide-react";
import CustomerSearch from './CustomerSearch';
import ProductSearch from './ProductSearch';
import WarehouseTransfer from './WarehouseTransfer';
import { generateReceiptPDF, generateInvoicePDF } from '@/utils/pdfGenerator';
import { toast } from "@/hooks/use-toast";

interface SaleItem {
  id: string;
  codigo: string;
  nombre: string;
  precio: number;
  cantidad: number;
  subtotal: number;
  almacen: string;
}

interface Customer {
  documento: string;
  nombre: string;
  tipo: 'natural' | 'juridica';
  email?: string;
  telefono?: string;
}

const POSSystem = () => {
  const [items, setItems] = useState<SaleItem[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [tipoComprobante, setTipoComprobante] = useState<'boleta' | 'factura'>('boleta');
  const [almacenSeleccionado, setAlmacenSeleccionado] = useState('principal');
  const [metodoPago, setMetodoPago] = useState('efectivo');
  const [observaciones, setObservaciones] = useState('');

  const almacenes = [
    { id: 'principal', nombre: 'Almacén Principal' },
    { id: 'sucursal1', nombre: 'Sucursal Centro' },
    { id: 'sucursal2', nombre: 'Sucursal Norte' }
  ];

  const addItem = (product: any) => {
    const newItem: SaleItem = {
      id: `${product.codigo}-${Date.now()}`,
      codigo: product.codigo,
      nombre: product.nombre,
      precio: product.precio,
      cantidad: 1,
      subtotal: product.precio,
      almacen: almacenSeleccionado
    };
    setItems([...items, newItem]);
  };

  const updateQuantity = (id: string, cantidad: number) => {
    if (cantidad <= 0) {
      removeItem(id);
      return;
    }
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, cantidad, subtotal: item.precio * cantidad }
        : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const calcularTotal = () => {
    return items.reduce((total, item) => total + item.subtotal, 0);
  };

  const calcularIGV = () => {
    const subtotal = calcularTotal() / 1.18;
    return calcularTotal() - subtotal;
  };

  const procesarVenta = async () => {
    if (items.length === 0) {
      toast({
        title: "Error",
        description: "Debe agregar al menos un producto",
        variant: "destructive"
      });
      return;
    }

    if (tipoComprobante === 'factura' && (!customer || customer.tipo !== 'juridica')) {
      toast({
        title: "Error",
        description: "Para factura debe seleccionar un cliente con RUC",
        variant: "destructive"
      });
      return;
    }

    const ventaData = {
      items,
      customer,
      tipoComprobante,
      metodoPago,
      total: calcularTotal(),
      igv: calcularIGV(),
      observaciones,
      fecha: new Date().toISOString(),
      serie: tipoComprobante === 'boleta' ? 'B001' : 'F001',
      numero: Math.floor(Math.random() * 1000000).toString().padStart(8, '0')
    };

    console.log('Procesando venta:', ventaData);

    // Simular procesamiento
    try {
      // Generar PDF según tipo de comprobante
      if (tipoComprobante === 'boleta') {
        await generateReceiptPDF(ventaData);
      } else {
        await generateInvoicePDF(ventaData);
      }

      toast({
        title: "Venta procesada",
        description: `${tipoComprobante.charAt(0).toUpperCase() + tipoComprobante.slice(1)} generada exitosamente`,
      });

      // Limpiar formulario
      setItems([]);
      setCustomer(null);
      setObservaciones('');
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al procesar la venta",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      {/* Panel de productos y búsqueda */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Búsqueda de Productos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label>Almacén</Label>
                  <Select value={almacenSeleccionado} onValueChange={setAlmacenSeleccionado}>
                    <SelectTrigger>
                      <SelectValue />
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
                <div className="flex items-end">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        Transferir Stock
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Transferencia entre Almacenes</DialogTitle>
                      </DialogHeader>
                      <WarehouseTransfer almacenes={almacenes} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <ProductSearch onProductSelect={addItem} almacen={almacenSeleccionado} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detalle de Venta</CardTitle>
          </CardHeader>
          <CardContent>
            {items.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No hay productos agregados</p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead>Cantidad</TableHead>
                      <TableHead>Subtotal</TableHead>
                      <TableHead>Almacén</TableHead>
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
                        <TableCell>S/ {item.precio.toFixed(2)}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.cantidad}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                            className="w-20"
                            min="1"
                          />
                        </TableCell>
                        <TableCell>S/ {item.subtotal.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.almacen}</Badge>
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
            )}
          </CardContent>
        </Card>
      </div>

      {/* Panel de cliente y pago */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Cliente</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomerSearch onCustomerSelect={setCustomer} />
            {customer && (
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <div className="font-medium">{customer.nombre}</div>
                <div className="text-sm text-muted-foreground">
                  {customer.documento} - {customer.tipo === 'natural' ? 'DNI' : 'RUC'}
                </div>
                {customer.email && (
                  <div className="text-sm text-muted-foreground">{customer.email}</div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configuración de Venta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Tipo de Comprobante</Label>
              <Select value={tipoComprobante} onValueChange={(value: 'boleta' | 'factura') => setTipoComprobante(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="boleta">Boleta de Venta</SelectItem>
                  <SelectItem value="factura">Factura</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Método de Pago</Label>
              <Select value={metodoPago} onValueChange={setMetodoPago}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="efectivo">Efectivo</SelectItem>
                  <SelectItem value="tarjeta">Tarjeta</SelectItem>
                  <SelectItem value="transferencia">Transferencia</SelectItem>
                  <SelectItem value="yape">Yape</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Observaciones</Label>
              <Input
                placeholder="Observaciones adicionales..."
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resumen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>S/ {(calcularTotal() / 1.18).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>IGV (18%):</span>
              <span>S/ {calcularIGV().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold border-t pt-2">
              <span>Total:</span>
              <span>S/ {calcularTotal().toFixed(2)}</span>
            </div>
            <Button onClick={procesarVenta} className="w-full mt-4" size="lg">
              <FileText className="w-4 h-4 mr-2" />
              Procesar Venta
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default POSSystem;
