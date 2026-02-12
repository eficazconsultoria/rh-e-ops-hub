import { motion } from "framer-motion";
import { Users, Plus, Search, MoreHorizontal, Mail, Phone, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const funcionarios = [
  { id: 1, name: "João Silva", role: "Operador", email: "joao.silva@empresa.pt", phone: "+351 912 345 678", status: "approved", docs: 3, pending: 1 },
  { id: 2, name: "Maria Santos", role: "Administrativa", email: "maria.santos@empresa.pt", phone: "+351 923 456 789", status: "approved", docs: 5, pending: 0 },
  { id: 3, name: "Pedro Costa", role: "Motorista", email: "pedro.costa@empresa.pt", phone: "+351 934 567 890", status: "review", docs: 2, pending: 2 },
  { id: 4, name: "Ana Ferreira", role: "Técnica", email: "ana.ferreira@empresa.pt", phone: "+351 945 678 901", status: "approved", docs: 4, pending: 1 },
  { id: 5, name: "Carlos Oliveira", role: "Operador", email: "carlos.oliveira@empresa.pt", phone: "+351 956 789 012", status: "incomplete", docs: 1, pending: 3 },
  { id: 6, name: "Sofia Mendes", role: "Administrativa", email: "sofia.mendes@empresa.pt", phone: "+351 967 890 123", status: "approved", docs: 6, pending: 0 },
  { id: 7, name: "Rui Almeida", role: "Motorista", email: "rui.almeida@empresa.pt", phone: "+351 978 901 234", status: "review", docs: 2, pending: 1 },
];

const statusMap: Record<string, { label: string; class: string }> = {
  approved: { label: "Aprovado", class: "bg-success/10 text-success" },
  review: { label: "Em Revisão", class: "bg-warning/10 text-warning" },
  incomplete: { label: "Incompleto", class: "bg-destructive/10 text-destructive" },
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function Funcionarios() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display">Funcionários</h1>
          <p className="text-sm text-muted-foreground">Gestão de colaboradores e perfis</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90"><Plus className="mr-2 h-4 w-4" /> Novo Funcionário</Button>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total", value: "42", color: "text-foreground" },
          { label: "Aprovados", value: "35", color: "text-success" },
          { label: "Em Revisão", value: "4", color: "text-warning" },
          { label: "Incompletos", value: "3", color: "text-destructive" },
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
        <Input placeholder="Pesquisar funcionário..." className="pl-9 bg-card border-border/60" />
      </motion.div>

      <motion.div variants={item}>
        <Card className="shadow-card border-border/60 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="font-semibold">Nome</TableHead>
                <TableHead className="font-semibold hidden sm:table-cell">Cargo</TableHead>
                <TableHead className="font-semibold hidden md:table-cell">Contacto</TableHead>
                <TableHead className="font-semibold">Perfil</TableHead>
                <TableHead className="font-semibold hidden lg:table-cell">Docs</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {funcionarios.map((f) => {
                const st = statusMap[f.status];
                return (
                  <TableRow key={f.id} className="hover:bg-muted/30 cursor-pointer">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          {f.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{f.name}</p>
                          <p className="text-xs text-muted-foreground sm:hidden">{f.role}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm">{f.role}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="space-y-0.5">
                        <p className="flex items-center gap-1 text-xs"><Mail className="h-3 w-3" /> {f.email}</p>
                        <p className="flex items-center gap-1 text-xs text-muted-foreground"><Phone className="h-3 w-3" /> {f.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`${st.class} border-0 text-[10px]`}>{st.label}</Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="text-xs">
                        <span>{f.docs} docs</span>
                        {f.pending > 0 && (
                          <Badge variant="secondary" className="ml-2 bg-warning/10 text-warning border-0 text-[10px]">
                            {f.pending} pendente{f.pending > 1 ? "s" : ""}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </motion.div>
    </motion.div>
  );
}
