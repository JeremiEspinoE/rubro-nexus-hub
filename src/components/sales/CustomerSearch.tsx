
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, User, Building } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Customer {
  documento: string;
  nombre: string;
  tipo: 'natural' | 'juridica';
  email?: string;
  telefono?: string;
}

interface CustomerSearchProps {
  onCustomerSelect: (customer: Customer) => void;
}

const CustomerSearch = ({ onCustomerSelect }: CustomerSearchProps) => {
  const [documento, setDocumento] = useState('');
  const [loading, setLoading] = useState(false);

  // Simulación de base de datos de clientes
  const clientesSimulados = {
    '12345678': {
      documento: '12345678',
      nombre: 'Juan Carlos Pérez López',
      tipo: 'natural' as const,
      email: 'juan.perez@email.com',
      telefono: '987654321'
    },
    '87654321': {
      documento: '87654321',
      nombre: 'María García Rodríguez',
      tipo: 'natural' as const,
      email: 'maria.garcia@email.com',
      telefono: '987654322'
    },
    '20123456789': {
      documento: '20123456789',
      nombre: 'Empresa ABC SAC',
      tipo: 'juridica' as const,
      email: 'contacto@empresaabc.com',
      telefono: '014567890'
    },
    '20987654321': {
      documento: '20987654321',
      nombre: 'Distribuidora XYZ EIRL',
      tipo: 'juridica' as const,
      email: 'ventas@distribuidoraxyz.com',
      telefono: '014567891'
    }
  };

  const buscarCliente = async () => {
    if (!documento.trim()) {
      toast({
        title: "Error",
        description: "Ingrese un DNI o RUC",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // Simular delay de búsqueda en RENIEC/SUNAT
      await new Promise(resolve => setTimeout(resolve, 1500));

      const clienteEncontrado = clientesSimulados[documento as keyof typeof clientesSimulados];
      
      if (clienteEncontrado) {
        onCustomerSelect(clienteEncontrado);
        toast({
          title: "Cliente encontrado",
          description: `Cliente: ${clienteEncontrado.nombre}`,
        });
      } else {
        // Simular creación de cliente nuevo con datos básicos
        const esRUC = documento.length === 11;
        const clienteNuevo: Customer = {
          documento,
          nombre: esRUC ? `Empresa - ${documento}` : `Cliente - ${documento}`,
          tipo: esRUC ? 'juridica' : 'natural'
        };
        
        onCustomerSelect(clienteNuevo);
        toast({
          title: "Cliente creado",
          description: "Se creó un nuevo cliente con los datos básicos",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al buscar cliente",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const limpiarCliente = () => {
    setDocumento('');
    onCustomerSelect(null as any);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>DNI o RUC del Cliente</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Ingrese DNI (8 dígitos) o RUC (11 dígitos)"
            value={documento}
            onChange={(e) => setDocumento(e.target.value.replace(/\D/g, ''))}
            maxLength={11}
          />
          <Button 
            onClick={buscarCliente} 
            disabled={loading}
            variant="outline"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setDocumento('12345678');
            setTimeout(buscarCliente, 100);
          }}
        >
          <User className="w-4 h-4 mr-2" />
          Cliente Natural
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setDocumento('20123456789');
            setTimeout(buscarCliente, 100);
          }}
        >
          <Building className="w-4 h-4 mr-2" />
          Cliente Empresa
        </Button>
      </div>

      <Button variant="ghost" size="sm" onClick={limpiarCliente} className="w-full">
        Limpiar Cliente
      </Button>
    </div>
  );
};

export default CustomerSearch;
