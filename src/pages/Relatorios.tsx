import { motion } from "framer-motion";
import { BarChart3, Download, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const reports = [
  { title: "Ocupação de Alojamentos", description: "Relatório mensal de ocupação por alojamento e quarto", type: "accommodation" },
  { title: "Utilização de Viaturas", description: "Histórico de utilização e quilometragem por veículo", type: "vehicles" },
  { title: "Resumo de Horas Mensal", description: "Total de horas normais, extras e faltas por colaborador", type: "hours" },
  { title: "Documentos e Assinaturas", description: "Estado de contratos e documentos pendentes", type: "documents" },
  { title: "Perfis de Funcionários", description: "Estado dos perfis e dados incompletos", type: "employees" },
  { title: "Auditoria de Ações", description: "Registo de ações críticas no sistema", type: "audit" },
];

export default function Relatorios() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display">Relatórios</h1>
          <p className="text-sm text-muted-foreground">Relatórios e exportações</p>
        </div>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((r) => (
          <motion.div key={r.type} variants={item}>
            <Card className="shadow-card border-border/60 hover:shadow-md transition-shadow h-full">
              <CardContent className="flex flex-col justify-between p-5 h-full gap-4">
                <div className="space-y-2">
                  <div className="rounded-lg bg-primary/10 p-2.5 w-fit">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm font-display">{r.title}</h3>
                  <p className="text-xs text-muted-foreground">{r.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs flex-1">
                    <Calendar className="mr-1.5 h-3 w-3" /> Filtrar
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs flex-1">
                    <Download className="mr-1.5 h-3 w-3" /> Exportar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
