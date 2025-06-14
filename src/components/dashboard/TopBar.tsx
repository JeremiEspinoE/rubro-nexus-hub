
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bell, Search, Settings, User } from "lucide-react";
import { Input } from "@/components/ui/input";

interface TopBarProps {
  selectedBranch?: string;
  onBranchChange?: (branch: string) => void;
}

const TopBar = ({ selectedBranch = 'principal', onBranchChange }: TopBarProps) => {
  return (
    <div className="h-16 bg-background border-b border-border flex items-center justify-between px-6">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <Select value={selectedBranch} onValueChange={onBranchChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Seleccionar sucursal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="principal">Sucursal Principal</SelectItem>
            <SelectItem value="centro">Sucursal Centro</SelectItem>
            <SelectItem value="norte">Sucursal Norte</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar productos, clientes..."
            className="w-64 pl-9"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"></span>
        </Button>

        <div className="h-6 w-px bg-border"></div>

        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-sm font-medium text-foreground">Admin Usuario</div>
            <div className="text-xs text-muted-foreground">Administrador</div>
          </div>
          <Button variant="ghost" size="sm">
            <User className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
