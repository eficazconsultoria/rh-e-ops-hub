import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft, BedDouble, Users, UserPlus, LogOut, MapPin, Building2,
  Plus, MoreHorizontal, CheckCircle2, Clock, AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

// Mock data
const accommodationsData: Record<string, {
  id: number; name: string; address: string; capacity: number; occupied: number; status: string; observations: string;
  rooms: { id: number; name: string; capacity: number; occupied: number; gender: string; status: string;
    occupants: { id: number; name: string; checkIn: string; checkOut: string | null }[];
  }[];
}> = {
  "1": {
    id: 1, name: "Alojamento Central", address: "Rua das Flores 123, Lisboa", capacity: 24, occupied: 18, status: "active", observations: "Perto da estação de metro",
    rooms: [
      { id: 1, name: "Quarto 101", capacity: 3, occupied: 2, gender: "Masculino", status: "active", occupants: [
        { id: 1, name: "João Silva", checkIn: "2026-01-15 14:00", checkOut: null },
        { id: 2, name: "Pedro Costa", checkIn: "2026-01-20 10:00", checkOut: null },
      ]},
      { id: 2, name: "Quarto 102", capacity: 3, occupied: 3, gender: "Masculino", status: "active", occupants: [
        { id: 3, name: "Carlos Oliveira", checkIn: "2026-01-10 09:00", checkOut: null },
        { id: 4, name: "Rui Almeida", checkIn: "2026-01-12 11:00", checkOut: null },
        { id: 5, name: "André Lopes", checkIn: "2026-01-18 15:00", checkOut: null },
      ]},
      { id: 3, name: "Quarto 103", capacity: 3, occupied: 2, gender: "Feminino", status: "active", occupants: [
        { id: 6, name: "Maria Santos", checkIn: "2026-02-01 08:00", checkOut: null },
        { id: 7, name: "Ana Ferreira", checkIn: "2026-02-03 13:00", checkOut: null },
      ]},
      { id: 4, name: "Quarto 104", capacity: 3, occupied: 3, gender: "Misto", status: "active", occupants: [
        { id: 8, name: "Sofia Mendes", checkIn: "2026-01-25 16:00", checkOut: null },
        { id: 9, name: "Tiago Nunes", checkIn: "2026-01-28 10:00", checkOut: null },
        { id: 10, name: "Inês Ribeiro", checkIn: "2026-02-05 09:00", checkOut: null },
      ]},
      { id: 5, name: "Quarto 201", capacity: 3, occupied: 2, gender: "Masculino", status: "active", occupants: [
        { id: 11, name: "Bruno Martins", checkIn: "2026-02-01 14:00", checkOut: null },
        { id: 12, name: "Diogo Pereira", checkIn: "2026-02-04 11:00", checkOut: null },
      ]},
      { id: 6, name: "Quarto 202", capacity: 3, occupied: 3, gender: "Masculino", status: "active", occupants: [
        { id: 13, name: "Miguel Gomes", checkIn: "2026-01-22 09:00", checkOut: null },
        { id: 14, name: "Luís Fernandes", checkIn: "2026-01-23 10:00", checkOut: null },
        { id: 15, name: "Hugo Rocha", checkIn: "2026-01-30 12:00", checkOut: null },
      ]},
      { id: 7, name: "Quarto 203", capacity: 3, occupied: 1, gender: "Feminino", status: "active", occupants: [
        { id: 16, name: "Catarina Lima", checkIn: "2026-02-08 08:00", checkOut: null },
      ]},
      { id: 8, name: "Quarto 204", capacity: 3, occupied: 2, gender: "Misto", status: "active", occupants: [
        { id: 17, name: "Ricardo Sousa", checkIn: "2026-02-06 15:00", checkOut: null },
        { id: 18, name: "Patrícia Dias", checkIn: "2026-02-07 10:00", checkOut: null },
      ]},
    ],
  },
  "2": {
    id: 2, name: "Residência Norte", address: "Av. da Liberdade 45, Porto", capacity: 30, occupied: 22, status: "active", observations: "",
    rooms: [
      { id: 9, name: "Quarto A1", capacity: 3, occupied: 2, gender: "Masculino", status: "active", occupants: [
        { id: 19, name: "Fernando Reis", checkIn: "2026-02-01 09:00", checkOut: null },
        { id: 20, name: "Gonçalo Tavares", checkIn: "2026-02-02 11:00", checkOut: null },
      ]},
      { id: 10, name: "Quarto A2", capacity: 3, occupied: 3, gender: "Feminino", status: "active", occupants: [
        { id: 21, name: "Joana Moreira", checkIn: "2026-01-28 14:00", checkOut: null },
        { id: 22, name: "Beatriz Castro", checkIn: "2026-01-29 10:00", checkOut: null },
        { id: 23, name: "Clara Pinto", checkIn: "2026-02-01 16:00", checkOut: null },
      ]},
    ],
  },
};

// Fill missing IDs with fallback data
["3","4","5"].forEach((id) => {
  accommodationsData[id] = {
    id: Number(id),
    name: id === "3" ? "Casa Sul" : id === "4" ? "Alojamento Leste" : "Residência Oeste",
    address: id === "3" ? "Rua do Comércio 78, Faro" : id === "4" ? "Travessa da Serra 12, Coimbra" : "Largo do Pelourinho 3, Évora",
    capacity: id === "5" ? 0 : 16,
    occupied: id === "3" ? 12 : id === "4" ? 10 : 0,
    status: id === "5" ? "inactive" : "active",
    observations: "",
    rooms: [],
  };
});

const availableEmployees = [
  { id: 100, name: "Marcos Vieira" },
  { id: 101, name: "Teresa Cunha" },
  { id: 102, name: "Paulo Barros" },
  { id: 103, name: "Filipa Neves" },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const anim = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function AlojamentoDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = accommodationsData[id || "1"];
  const [checkinOpen, setCheckinOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [addRoomOpen, setAddRoomOpen] = useState(false);

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-lg font-semibold">Alojamento não encontrado</h2>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/alojamentos")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>
      </div>
    );
  }

  const totalOccupied = data.rooms.reduce((s, r) => s + r.occupied, 0);
  const totalCapacity = data.rooms.reduce((s, r) => s + r.capacity, 0);
  const percentage = totalCapacity > 0 ? Math.round((totalOccupied / totalCapacity) * 100) : 0;

  const getRoomStatusColor = (room: typeof data.rooms[0]) => {
    if (room.occupied >= room.capacity) return "border-destructive/40 bg-destructive/5";
    if (room.occupied > 0) return "border-warning/40 bg-warning/5";
    return "border-success/40 bg-success/5";
  };

  const getRoomBadge = (room: typeof data.rooms[0]) => {
    if (room.occupied >= room.capacity) return { label: "Lotado", class: "bg-destructive/10 text-destructive" };
    if (room.occupied > 0) return { label: `${room.capacity - room.occupied} vaga(s)`, class: "bg-success/10 text-success" };
    return { label: "Vazio", class: "bg-success/10 text-success" };
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Header */}
      <motion.div variants={anim} className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <Button variant="ghost" size="icon" className="mt-0.5 shrink-0" onClick={() => navigate("/alojamentos")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold font-display">{data.name}</h1>
              <Badge variant="secondary" className={data.status === "active" ? "bg-success/10 text-success border-0 text-[10px]" : "text-[10px]"}>
                {data.status === "active" ? "Ativo" : "Inativo"}
              </Badge>
            </div>
            <p className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="h-3.5 w-3.5" /> {data.address}
            </p>
            {data.observations && <p className="text-xs text-muted-foreground mt-1">{data.observations}</p>}
          </div>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90" onClick={() => setAddRoomOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Adicionar Quarto
        </Button>
      </motion.div>

      {/* Summary stats */}
      <motion.div variants={anim} className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Quartos", value: data.rooms.length, icon: BedDouble, color: "text-primary" },
          { label: "Capacidade", value: totalCapacity, icon: Users, color: "text-foreground" },
          { label: "Ocupados", value: totalOccupied, icon: CheckCircle2, color: "text-warning" },
          { label: "Vagas", value: totalCapacity - totalOccupied, icon: BedDouble, color: "text-success" },
        ].map((s) => (
          <Card key={s.label} className="shadow-card border-border/60">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="rounded-lg bg-muted/50 p-2">
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
              <div>
                <p className={`text-xl font-bold font-display ${s.color}`}>{s.value}</p>
                <p className="text-[10px] text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Occupancy bar */}
      <motion.div variants={anim}>
        <Card className="shadow-card border-border/60">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Ocupação Geral</span>
              <span className="text-muted-foreground">{totalOccupied} / {totalCapacity} — {percentage}%</span>
            </div>
            <Progress value={percentage} className="h-2.5" />
          </CardContent>
        </Card>
      </motion.div>

      {/* Rooms Grid */}
      <motion.div variants={anim}>
        <h2 className="text-lg font-semibold font-display mb-4">Quartos</h2>
        {data.rooms.length === 0 ? (
          <Card className="shadow-card border-border/60">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <BedDouble className="h-10 w-10 text-muted-foreground mb-3" />
              <p className="text-sm font-medium">Nenhum quarto registado</p>
              <p className="text-xs text-muted-foreground mt-1">Adicione quartos para começar a gerir a ocupação.</p>
              <Button variant="outline" size="sm" className="mt-4" onClick={() => setAddRoomOpen(true)}><Plus className="mr-1.5 h-3 w-3" /> Adicionar Quarto</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.rooms.map((room) => {
              const badge = getRoomBadge(room);
              const isFull = room.occupied >= room.capacity;
              return (
                <Card key={room.id} className={`shadow-card transition-all hover:shadow-md border-2 ${getRoomStatusColor(room)}`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-semibold">{room.name}</CardTitle>
                      <Badge variant="secondary" className={`${badge.class} border-0 text-[10px]`}>{badge.label}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                      <span>Cap: {room.capacity}</span>
                      <span>·</span>
                      <span>{room.gender}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {/* Occupants */}
                    {room.occupants.length > 0 && (
                      <div className="space-y-1.5">
                        {room.occupants.map((occ) => (
                          <div key={occ.id} className="flex items-center justify-between rounded-md bg-card p-2 border border-border/40">
                            <div className="flex items-center gap-2">
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[9px] font-bold text-primary">
                                {occ.name.split(" ").map(n => n[0]).join("")}
                              </div>
                              <div>
                                <p className="text-xs font-medium leading-tight">{occ.name}</p>
                                <p className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                                  <Clock className="h-2.5 w-2.5" /> {occ.checkIn}
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px] text-destructive hover:text-destructive">
                              <LogOut className="h-3 w-3 mr-0.5" /> Saída
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Check-in button */}
                    {!isFull && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs border-dashed hover:border-primary/40 hover:bg-primary/5"
                        onClick={() => { setSelectedRoom(room.id); setCheckinOpen(true); }}
                      >
                        <UserPlus className="mr-1.5 h-3 w-3" /> Alocar Trabalhador
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Check-in Dialog */}
      <Dialog open={checkinOpen} onOpenChange={setCheckinOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">Alocar Trabalhador</DialogTitle>
            <DialogDescription>
              Selecione o trabalhador para alocar no quarto selecionado.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Trabalhador</label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Selecionar trabalhador" /></SelectTrigger>
                <SelectContent>
                  {availableEmployees.map((e) => (
                    <SelectItem key={e.id} value={String(e.id)}>{e.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Data Check-in</label>
                <Input type="date" defaultValue={new Date().toISOString().split("T")[0]} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Hora</label>
                <Input type="time" defaultValue="08:00" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Observações</label>
              <Textarea placeholder="Motivo ou observações..." className="resize-none" rows={2} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCheckinOpen(false)}>Cancelar</Button>
            <Button className="bg-gradient-primary hover:opacity-90" onClick={() => setCheckinOpen(false)}>
              <UserPlus className="mr-2 h-4 w-4" /> Confirmar Check-in
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Room Dialog */}
      <Dialog open={addRoomOpen} onOpenChange={setAddRoomOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Adicionar Quarto</DialogTitle>
            <DialogDescription>
              Preencha os dados do novo quarto para "{data.name}".
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome / Número do Quarto</label>
              <Input placeholder="Ex: Quarto 301" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Capacidade</label>
                <Input type="number" min={1} max={20} defaultValue={2} placeholder="Nº de camas" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Género / Regra</label>
                <Select defaultValue="misto">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="feminino">Feminino</SelectItem>
                    <SelectItem value="misto">Misto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Estado</label>
              <Select defaultValue="active">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                  <SelectItem value="maintenance">Em manutenção</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Observações</label>
              <Textarea placeholder="Observações adicionais..." className="resize-none" rows={2} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddRoomOpen(false)}>Cancelar</Button>
            <Button className="bg-gradient-primary hover:opacity-90" onClick={() => setAddRoomOpen(false)}>
              <Plus className="mr-2 h-4 w-4" /> Criar Quarto
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
