import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Car, User, Calendar, Clock, MapPin, Fuel,
  Plus, UserPlus, CheckCircle2, AlertCircle, Wrench,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const vehiclesData: Record<string, {
  id: number; plate: string; model: string; year: number; type: string; km: number; status: string; observations: string;
  currentDriver: string | null;
  assignments: { id: number; driver: string; startDate: string; endDate: string | null; purpose: string }[];
}> = {
  "1": {
    id: 1, plate: "45-AB-12", model: "Renault Master", year: 2022, type: "Furgão", km: 45230, status: "in_use", observations: "Seguro válido até 06/2026",
    currentDriver: "Pedro Costa",
    assignments: [
      { id: 1, driver: "Pedro Costa", startDate: "2026-02-10 08:00", endDate: null, purpose: "Transporte de materiais — Obra Lisboa Norte" },
      { id: 2, driver: "João Silva", startDate: "2026-01-20 07:30", endDate: "2026-02-09 18:00", purpose: "Distribuição semanal — Zona Centro" },
      { id: 3, driver: "Carlos Oliveira", startDate: "2026-01-05 09:00", endDate: "2026-01-19 17:00", purpose: "Apoio logístico — Faro" },
      { id: 4, driver: "Pedro Costa", startDate: "2025-12-01 08:00", endDate: "2026-01-04 18:00", purpose: "Transporte de equipa — Porto" },
      { id: 5, driver: "Bruno Martins", startDate: "2025-11-10 07:00", endDate: "2025-11-30 17:00", purpose: "Entrega de equipamento — Coimbra" },
    ],
  },
  "2": {
    id: 2, plate: "78-CD-34", model: "Peugeot Partner", year: 2023, type: "Comercial", km: 18500, status: "available", observations: "",
    currentDriver: null,
    assignments: [
      { id: 6, driver: "Ana Ferreira", startDate: "2026-01-15 08:00", endDate: "2026-02-05 17:00", purpose: "Visitas a clientes — Grande Lisboa" },
      { id: 7, driver: "Maria Santos", startDate: "2025-12-10 09:00", endDate: "2026-01-14 18:00", purpose: "Acompanhamento de obras — Setúbal" },
    ],
  },
  "3": {
    id: 3, plate: "12-EF-56", model: "Citroën Berlingo", year: 2021, type: "Comercial", km: 62100, status: "in_use", observations: "Revisão agendada para 03/2026",
    currentDriver: "Ana Ferreira",
    assignments: [
      { id: 8, driver: "Ana Ferreira", startDate: "2026-02-08 08:00", endDate: null, purpose: "Apoio administrativo — Zona Norte" },
      { id: 9, driver: "Tiago Nunes", startDate: "2026-01-01 07:30", endDate: "2026-02-07 18:00", purpose: "Transporte interno — Sede" },
    ],
  },
  "4": {
    id: 4, plate: "34-GH-78", model: "Mercedes Sprinter", year: 2020, type: "Furgão", km: 98700, status: "maintenance", observations: "Motor em reparação",
    currentDriver: null,
    assignments: [
      { id: 10, driver: "João Silva", startDate: "2025-11-01 08:00", endDate: "2026-01-31 17:00", purpose: "Transporte pesado — Algarve" },
    ],
  },
  "5": {
    id: 5, plate: "56-IJ-90", model: "Ford Transit", year: 2023, type: "Furgão", km: 12300, status: "in_use", observations: "",
    currentDriver: "João Silva",
    assignments: [
      { id: 11, driver: "João Silva", startDate: "2026-02-01 08:00", endDate: null, purpose: "Mudanças de equipa — Braga" },
    ],
  },
  "6": {
    id: 6, plate: "90-KL-12", model: "VW Caddy", year: 2022, type: "Comercial", km: 35600, status: "available", observations: "",
    currentDriver: null,
    assignments: [],
  },
};

const availableDrivers = [
  { id: 1, name: "Pedro Costa" },
  { id: 2, name: "João Silva" },
  { id: 3, name: "Ana Ferreira" },
  { id: 4, name: "Carlos Oliveira" },
  { id: 5, name: "Bruno Martins" },
  { id: 6, name: "Tiago Nunes" },
];

const statusMap: Record<string, { label: string; class: string; icon: React.ReactNode }> = {
  in_use: { label: "Em Uso", class: "bg-info/10 text-info", icon: <Car className="h-4 w-4" /> },
  available: { label: "Disponível", class: "bg-success/10 text-success", icon: <CheckCircle2 className="h-4 w-4" /> },
  maintenance: { label: "Manutenção", class: "bg-warning/10 text-warning", icon: <Wrench className="h-4 w-4" /> },
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const anim = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function ViaturaDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = vehiclesData[id || "1"];
  const [assignOpen, setAssignOpen] = useState(false);

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Car className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-lg font-semibold">Viatura não encontrada</h2>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/viaturas")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>
      </div>
    );
  }

  const status = statusMap[data.status];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Header */}
      <motion.div variants={anim} className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <Button variant="ghost" size="icon" className="mt-0.5 shrink-0" onClick={() => navigate("/viaturas")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold font-display">{data.model}</h1>
              <Badge variant="secondary" className={`${status.class} border-0 text-[10px]`}>{status.label}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1 font-mono">{data.plate}</p>
          </div>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90" onClick={() => setAssignOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" /> Atribuir Motorista
        </Button>
      </motion.div>

      {/* Info cards */}
      <motion.div variants={anim} className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Ano", value: data.year, icon: Calendar, color: "text-primary" },
          { label: "Tipo", value: data.type, icon: Car, color: "text-foreground" },
          { label: "Quilometragem", value: `${data.km.toLocaleString("pt-PT")} km`, icon: Fuel, color: "text-warning" },
          { label: "Motorista Atual", value: data.currentDriver || "Nenhum", icon: User, color: data.currentDriver ? "text-info" : "text-muted-foreground" },
        ].map((s) => (
          <Card key={s.label} className="shadow-card border-border/60">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="rounded-lg bg-muted/50 p-2">
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
              <div className="min-w-0">
                <p className={`text-sm font-bold font-display ${s.color} truncate`}>{s.value}</p>
                <p className="text-[10px] text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Observations */}
      {data.observations && (
        <motion.div variants={anim}>
          <Card className="shadow-card border-border/60">
            <CardContent className="p-4">
              <p className="text-xs font-medium text-muted-foreground mb-1">Observações</p>
              <p className="text-sm">{data.observations}</p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Assignment history */}
      <motion.div variants={anim}>
        <h2 className="text-lg font-semibold font-display mb-4">Histórico de Condução</h2>
        {data.assignments.length === 0 ? (
          <Card className="shadow-card border-border/60">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <User className="h-10 w-10 text-muted-foreground mb-3" />
              <p className="text-sm font-medium">Sem histórico de atribuições</p>
              <p className="text-xs text-muted-foreground mt-1">Atribua um motorista para começar o registo.</p>
              <Button variant="outline" size="sm" className="mt-4" onClick={() => setAssignOpen(true)}>
                <UserPlus className="mr-1.5 h-3 w-3" /> Atribuir Motorista
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-card border-border/60 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="font-semibold">Motorista</TableHead>
                  <TableHead className="font-semibold">Início</TableHead>
                  <TableHead className="font-semibold hidden sm:table-cell">Fim</TableHead>
                  <TableHead className="font-semibold hidden md:table-cell">Finalidade</TableHead>
                  <TableHead className="font-semibold w-20">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.assignments.map((a) => (
                  <TableRow key={a.id} className="hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                          {a.driver.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <span className="text-sm font-medium">{a.driver}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{a.startDate}</TableCell>
                    <TableCell className="hidden sm:table-cell text-sm">{a.endDate || "—"}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground max-w-[200px] truncate">{a.purpose}</TableCell>
                    <TableCell>
                      {a.endDate ? (
                        <Badge variant="secondary" className="bg-muted text-muted-foreground border-0 text-[10px]">Concluída</Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-info/10 text-info border-0 text-[10px]">Ativa</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </motion.div>

      {/* Assign Driver Dialog */}
      <Dialog open={assignOpen} onOpenChange={setAssignOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">Atribuir Motorista</DialogTitle>
            <DialogDescription>
              Atribua um motorista ao veículo {data.plate} — {data.model}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Motorista</label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Selecionar motorista" /></SelectTrigger>
                <SelectContent>
                  {availableDrivers.map((d) => (
                    <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Data Início</label>
                <Input type="date" defaultValue={new Date().toISOString().split("T")[0]} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Hora Início</label>
                <Input type="time" defaultValue="08:00" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Data Fim (opcional)</label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Hora Fim</label>
                <Input type="time" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Finalidade / Observações</label>
              <Textarea placeholder="Motivo da atribuição..." className="resize-none" rows={2} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignOpen(false)}>Cancelar</Button>
            <Button className="bg-gradient-primary hover:opacity-90" onClick={() => setAssignOpen(false)}>
              <UserPlus className="mr-2 h-4 w-4" /> Confirmar Atribuição
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
