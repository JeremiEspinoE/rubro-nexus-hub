
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Package } from "lucide-react";

interface Product {
  codigo: string;
  nombre: string;
  precio: number;
  stock: number;
  categoria: string;
  tipo: 'producto' | 'servicio';
}

interface ProductSearchProps {
  onProductSelect: (product: Product) => void;
  almacen: string;
}

const ProductSearch = ({ onProductSelect, almacen }: ProductSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Simulación de productos por almacén
  const productos: Product[] = [
    // Productos
    {
      codigo: 'PROD001',
      nombre: 'Arroz Superior 1kg',
      precio: 3.50,
      stock: almacen === 'principal' ? 100 : almacen === 'sucursal1' ? 50 : 25,
      categoria: 'Abarrotes',
      tipo: 'producto'
    },
    {
      codigo: 'PROD002',
      nombre: 'Aceite Primor 1L',
      precio: 8.90,
      stock: almacen === 'principal' ? 80 : almacen === 'sucursal1' ? 40 : 20,
      categoria: 'Abarrotes',
      tipo: 'producto'
    },
    {
      codigo: 'PROD003',
      nombre: 'Azúcar Blanca 1kg',
      precio: 2.80,
      stock: almacen === 'principal' ? 150 : almacen === 'sucursal1' ? 75 : 30,
      categoria: 'Abarrotes',
      tipo: 'producto'
    },
    {
      codigo: 'PROD004',
      nombre: 'Leche Gloria 1L',
      precio: 4.20,
      stock: almacen === 'principal' ? 60 : almacen === 'sucursal1' ? 30 : 15,
      categoria: 'Lácteos',
      tipo: 'producto'
    },
    // Servicios
    {
      codigo: 'SERV001',
      nombre: 'Delivery a Domicilio',
      precio: 5.00,
      stock: 999, // Los servicios no tienen stock limitado
      categoria: 'Servicios',
      tipo: 'servicio'
    },
    {
      codigo: 'SERV002',
      nombre: 'Instalación de Producto',
      precio: 15.00,
      stock: 999,
      categoria: 'Servicios',
      tipo: 'servicio'
    },
    {
      codigo: 'SERV003',
      nombre: 'Consultoría Especializada',
      precio: 50.00,
      stock: 999,
      categoria: 'Servicios',
      tipo: 'servicio'
    }
  ];

  const filteredProducts = productos.filter(product =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockBadge = (product: Product) => {
    if (product.tipo === 'servicio') {
      return <Badge className="bg-blue-100 text-blue-800">Servicio</Badge>;
    }
    
    if (product.stock === 0) {
      return <Badge variant="destructive">Sin Stock</Badge>;
    } else if (product.stock <= 10) {
      return <Badge className="bg-yellow-100 text-yellow-800">Stock Bajo</Badge>;
    } else {
      return <Badge className="bg-green-100 text-green-800">Disponible</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Buscar por nombre, código o categoría..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="rounded-md border max-h-96 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto/Servicio</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.codigo}>
                <TableCell>
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {product.tipo === 'servicio' ? (
                        <Package className="w-4 h-4 text-blue-500" />
                      ) : (
                        <Package className="w-4 h-4 text-green-500" />
                      )}
                      {product.nombre}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {product.codigo} - {product.categoria}
                    </div>
                  </div>
                </TableCell>
                <TableCell>S/ {product.precio.toFixed(2)}</TableCell>
                <TableCell>
                  {product.tipo === 'servicio' ? '∞' : product.stock}
                </TableCell>
                <TableCell>{getStockBadge(product)}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    onClick={() => onProductSelect(product)}
                    disabled={product.tipo === 'producto' && product.stock === 0}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No se encontraron productos</p>
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
