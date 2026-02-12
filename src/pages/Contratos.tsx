import { motion } from "framer-motion";
import { FileText, Plus, Search, Send, PenTool, Eye, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const documents = [
  { id: 1, title: "Contrato de Trabalho — Termo Certo", employee: "João Silva", category: "Contrato", status: "pending_signature", date: "2024-01-15", deadline: "2024-01-30" },
  { id: 2, title: "Acordo de Confidencialidade", employee: "Maria Santos", category: "NDA", status: "signed", date: "2024-01-10", deadline: null },
  { id: 3, title: "Regulamento Interno", employee: "Todos", category: "Informativo", status: "sent", date: "2024-01-05", deadline: null },
  { id: 4, title: "Contrato de Trabalho — Sem Termo", employee: "Pedro Costa", category: "Contrato", status: "draft", date: "2024-01-18", deadline: "2024-02-01" },
  { id: 5, title: "Adenda Salarial", employee: "Ana Ferreira", category: "Contrato", status: "pending_signature", date: "2024-01-20", deadline: "2024-02-05" },
  { id: 6, title: "Declaração de IRS", employee: "Carlos Oliveira", category: "Fiscal", status: "signed", date: "2024-01-08", deadline: null },
];

const templates = [
  { id: 1, name: "Contrato Termo Certo", variables: 8, lastUsed: "Há 3 dias" },
  { id: 2, name: "Contrato Sem Termo", variables: 7, lastUsed: "Há 1 semana" },
  { id: 3, name: "Acordo de Confidencialidade", variables: 5, lastUsed: "Há 2 semanas" },
  { id: 4, name: "Adenda Salarial", variables: 4, lastUsed: "Há 1 mês" },
];

const statusMap: Record<string, { label: string; icon: any; class: string }> = {
  draft: { label: "Rascunho", icon: FileText, class: "bg-muted text-muted-foreground" },
  sent: { label: "Enviado", icon: Send, class: "bg-info/10 text-info" },
  pending_signature: { label: "Aguarda Assinatura", icon: Clock, class: "bg-warning/10 text-warning" },
  signed: { label: "Assinado", icon: CheckCircle2, class: "bg-success/10 text-success" },
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function Contratos() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display">Contratos & Documentos</h1>
          <p className="text-sm text-muted-foreground">Gestão de contratos, templates e assinaturas</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Send className="mr-2 h-4 w-4" /> Enviar Documento</Button>
          <Button className="bg-gradient-primary hover:opacity-90"><Plus className="mr-2 h-4 w-4" /> Gerar Contrato</Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total", value: "24", color: "text-foreground" },
          { label: "Pendentes", value: "5", color: "text-warning" },
          { label: "Assinados", value: "16", color: "text-success" },
          { label: "Rascunhos", value: "3", color: "text-muted-foreground" },
        ].map((s) => (
          <Card key={s.label} className="shadow-card border-border/60">
            <CardContent className="p-4 text-center">
              <p className={`text-2xl font-bold font-display ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <motion.div variants={item}>
        <Tabs defaultValue="documents" className="space-y-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="documents">Documentos</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="documents" className="space-y-4">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Pesquisar documento..." className="pl-9 bg-card border-border/60" />
            </div>

            <Card className="shadow-card border-border/60 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="font-semibold">Documento</TableHead>
                    <TableHead className="font-semibold hidden sm:table-cell">Funcionário</TableHead>
                    <TableHead className="font-semibold hidden md:table-cell">Categoria</TableHead>
                    <TableHead className="font-semibold">Estado</TableHead>
                    <TableHead className="font-semibold hidden lg:table-cell">Prazo</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => {
                    const st = statusMap[doc.status];
                    return (
                      <TableRow key={doc.id} className="hover:bg-muted/30 cursor-pointer">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary shrink-0" />
                            <span className="text-sm font-medium">{doc.title}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-sm">{doc.employee}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="secondary" className="text-[10px]">{doc.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={`${st.class} border-0 text-[10px]`}>
                            {st.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                          {doc.deadline || "—"}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {templates.map((t) => (
                <Card key={t.id} className="shadow-card border-border/60 hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2.5">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{t.name}</p>
                          <p className="text-xs text-muted-foreground">{t.variables} variáveis · {t.lastUsed}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs">Usar</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
