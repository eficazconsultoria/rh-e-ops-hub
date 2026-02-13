import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Car, Plus, Search, Fuel, Calendar, User, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const vehicles = [
  { id: 1, plate: "45-AB-12", model: "Renault Master", year: 2022, type: "Furgão", km: 45230, status: "in_use", driver: "Pedro Costa" },
  { id: 2, plate: "78-CD-34", model: "Peugeot Partner", year: 2023, type: "Comercial", km: 18500, status: "available", driver: null },
  { id: 3, plate: "12-EF-56", model: "Citroën Berlingo", year: 2021, type: "Comercial", km: 62100, status: "in_use", driver: "Ana Ferreira" },
  { id: 4, plate: "34-GH-78", model: "Mercedes Sprinter", year: 2020, type: "Furgão", km: 98700, status: "maintenance", driver: null },
  { id: 5, plate: "56-IJ-90", model: "Ford Transit", year: 2023, type: "Furgão", km: 12300, status: "in_use", driver: "João Silva" },
  { id: 6, plate: "90-KL-12", model: "VW Caddy", year: 2022, type: "Comercial", km: 35600, status: "available", driver: null },
];

const statusMap: Record<string, { label: string; class: string }> = {
  in_use: { label: "Em Uso", class: "bg-info/10 text-info" },
  available: { label: "Disponível", class: "bg-success/10 text-success" },
  maintenance: { label: "Manutenção", class: "bg-warning/10 text-warning" },
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function Viaturas() {
  const navigate = useNavigate();

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display">Viaturas</h1>
          <p className="text-sm text-muted-foreground">Gestão de veículos e atribuições</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Calendar className="mr-2 h-4 w-4" /> Agenda</Button>
          <Button className="bg-gradient-primary hover:opacity-90" onClick={() => navigate("/viaturas/nova")}><Plus className="mr-2 h-4 w-4" /> Nova Viatura</Button>
        </div>
      </motion.div>

      {/* Summary cards */}
      <motion.div variants={item} className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total", value: "12", color: "text-foreground" },
          { label: "Em Uso", value: "5", color: "text-info" },
          { label: "Disponíveis", value: "4", color: "text-success" },
          { label: "Manutenção", value: "3", color: "text-warning" },
        ].map((s) => (
          <Card key={s.label} className="shadow-card border-border/60">
            <CardContent className="p-4 text-center">
              <p className={`text-2xl font-bold font-display ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <motion.div variants={item} className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Pesquisar viatura..." className="pl-9 bg-card border-border/60" />
      </motion.div>

      <motion.div variants={item}>
        <Card className="shadow-card border-border/60 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="font-semibold">Matrícula</TableHead>
                <TableHead className="font-semibold">Modelo</TableHead>
                <TableHead className="font-semibold hidden sm:table-cell">Tipo</TableHead>
                <TableHead className="font-semibold hidden md:table-cell">Km</TableHead>
                <TableHead className="font-semibold">Estado</TableHead>
                <TableHead className="font-semibold hidden lg:table-cell">Motorista</TableHead>
                <TableHead className="font-semibold w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map((v) => (
                <TableRow key={v.id} className="hover:bg-muted/30 cursor-pointer" onClick={() => navigate(`/viaturas/${v.id}`)}>
                  <TableCell className="font-mono font-semibold text-sm">{v.plate}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{v.model}</p>
                      <p className="text-xs text-muted-foreground">{v.year}</p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm">{v.type}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm">{v.km.toLocaleString("pt-PT")} km</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`${statusMap[v.status].class} border-0 text-[10px]`}>
                      {statusMap[v.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm">
                    {v.driver ? (
                      <div className="flex items-center gap-1.5">
                        <User className="h-3 w-3 text-muted-foreground" />
                        {v.driver}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </motion.div>
    </motion.div>
  );
}
