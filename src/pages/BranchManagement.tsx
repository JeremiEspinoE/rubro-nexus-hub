
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, MapPin, Clock, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BranchManagement = () => {
  const [branches, setBranches] = useState([
    {
      id: 1,
      name: 'Sucursal Principal',
      address: 'Av. Principal 123, Lima',
      phone: '01-234-5678',
      schedule: '8:00 AM - 10:00 PM',
      status: 'Activa'
    },
    {
      id: 2,
      name: 'Sucursal Centro',
      address: 'Jr. Centro 456, Lima',
      phone: '01-234-5679',
      schedule: '9:00 AM - 9:00 PM',
      status: 'Activa'
    }
  ]);

  const [newBranch, setNewBranch] = useState({
    name: '',
    address: '',
    phone: '',
    schedule: ''
  });

  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleAddBranch = () => {
    if (!newBranch.name || !newBranch.address) {
      toast({
        title: "Error",
        description: "Debes completar al menos el nombre y la dirección",
        variant: "destructive"
      });
      return;
    }

    const branch = {
      id: branches.length + 1,
      ...newBranch,
      status: 'Activa'
    };

    setBranches([...branches, branch]);
    setNewBranch({ name: '', address: '', phone: '', schedule: '' });
    setIsOpen(false);
    
    toast({
      title: "¡Sucursal agregada!",
      description: "La nueva sucursal ha sido registrada correctamente"
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gestión de Sucursales</h1>
          <p className="text-muted-foreground">Administra las sucursales de tu empresa</p>
        </div>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nueva Sucursal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nueva Sucursal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre de la Sucursal</Label>
                <Input
                  id="name"
                  value={newBranch.name}
                  onChange={(e) => setNewBranch({...newBranch, name: e.target.value})}
                  placeholder="Sucursal Norte"
                />
              </div>
              <div>
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  value={newBranch.address}
                  onChange={(e) => setNewBranch({...newBranch, address: e.target.value})}
                  placeholder="Av. Los Olivos 789, Lima"
                />
              </div>
              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={newBranch.phone}
                  onChange={(e) => setNewBranch({...newBranch, phone: e.target.value})}
                  placeholder="01-234-5680"
                />
              </div>
              <div>
                <Label htmlFor="schedule">Horario de Atención</Label>
                <Input
                  id="schedule"
                  value={newBranch.schedule}
                  onChange={(e) => setNewBranch({...newBranch, schedule: e.target.value})}
                  placeholder="8:00 AM - 8:00 PM"
                />
              </div>
              <Button onClick={handleAddBranch} className="w-full">
                Agregar Sucursal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map((branch) => (
          <Card key={branch.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">{branch.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                branch.status === 'Activa' 
                  ? 'bg-success/10 text-success' 
                  : 'bg-destructive/10 text-destructive'
              }`}>
                {branch.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{branch.address}</span>
              </div>

              {branch.phone && (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <span className="text-xs">📞</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{branch.phone}</span>
                </div>
              )}

              {branch.schedule && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{branch.schedule}</span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <Button variant="outline" size="sm" className="w-full">
                <Settings className="w-4 h-4 mr-2" />
                Configurar
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-8 p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Configuración Multi-sucursal</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-card/50">
            <h4 className="font-medium text-foreground mb-2">Inventario</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Cada sucursal maneja su propio inventario y stock independiente
            </p>
            <div className="text-xs text-success">✓ Configurado</div>
          </Card>

          <Card className="p-4 bg-card/50">
            <h4 className="font-medium text-foreground mb-2">Punto de Venta</h4>
            <p className="text-sm text-muted-foreground mb-3">
              POS independiente con facturación SUNAT por sucursal
            </p>
            <div className="text-xs text-success">✓ Configurado</div>
          </Card>

          <Card className="p-4 bg-card/50">
            <h4 className="font-medium text-foreground mb-2">Reportes</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Reportes consolidados y por sucursal individual
            </p>
            <div className="text-xs text-success">✓ Configurado</div>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default BranchManagement;
