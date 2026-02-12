import { motion } from "framer-motion";
import { Building2, Plus, Search, Users, MapPin, MoreHorizontal, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const accommodations = [
  { id: 1, name: "Alojamento Central", address: "Rua das Flores 123, Lisboa", capacity: 24, occupied: 18, rooms: 8, status: "active" },
  { id: 2, name: "Residência Norte", address: "Av. da Liberdade 45, Porto", capacity: 30, occupied: 22, rooms: 10, status: "active" },
  { id: 3, name: "Casa Sul", address: "Rua do Comércio 78, Faro", capacity: 16, occupied: 12, rooms: 6, status: "active" },
  { id: 4, name: "Alojamento Leste", address: "Travessa da Serra 12, Coimbra", capacity: 16, occupied: 10, rooms: 5, status: "active" },
  { id: 5, name: "Residência Oeste", address: "Largo do Pelourinho 3, Évora", capacity: 0, occupied: 0, rooms: 4, status: "inactive" },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function Alojamentos() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display">Alojamentos</h1>
          <p className="text-sm text-muted-foreground">Gestão de alojamentos e quartos</p>
        </div>
        <Link to="/alojamentos/novo">
          <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
            <Plus className="mr-2 h-4 w-4" /> Novo Alojamento
          </Button>
        </Link>
      </motion.div>

      <motion.div variants={item} className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Pesquisar alojamento..." className="pl-9 bg-card border-border/60" />
        </div>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {accommodations.map((acc) => {
          const percentage = acc.capacity > 0 ? Math.round((acc.occupied / acc.capacity) * 100) : 0;
          return (
            <motion.div key={acc.id} variants={item}>
              <Card className="shadow-card border-border/60 hover:shadow-md transition-all group cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Building2 className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-sm font-semibold">{acc.name}</CardTitle>
                        <p className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" /> {acc.address}
                        </p>
                      </div>
                    </div>
                    <Badge variant={acc.status === "active" ? "default" : "secondary"} className={acc.status === "active" ? "bg-success/10 text-success border-0 text-[10px]" : "text-[10px]"}>
                      {acc.status === "active" ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-lg bg-muted/50 p-2">
                      <p className="text-lg font-bold font-display">{acc.rooms}</p>
                      <p className="text-[10px] text-muted-foreground">Quartos</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-2">
                      <p className="text-lg font-bold font-display">{acc.occupied}</p>
                      <p className="text-[10px] text-muted-foreground">Ocupados</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-2">
                      <p className="text-lg font-bold font-display text-success">{acc.capacity - acc.occupied}</p>
                      <p className="text-[10px] text-muted-foreground">Vagas</p>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Ocupação</span>
                      <span className="font-medium">{percentage}%</span>
                    </div>
                    <Progress value={percentage} className="h-1.5" />
                  </div>
                  <Link to={`/alojamentos/${acc.id}`}>
                    <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground group-hover:text-primary">
                      <Eye className="mr-1.5 h-3 w-3" /> Ver quartos e ocupação
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
