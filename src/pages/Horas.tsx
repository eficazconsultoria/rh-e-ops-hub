import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Download, ChevronLeft, ChevronRight, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const employees = [
  { id: "1", name: "João Silva" },
  { id: "2", name: "Maria Santos" },
  { id: "3", name: "Pedro Costa" },
  { id: "4", name: "Ana Ferreira" },
  { id: "5", name: "Carlos Oliveira" },
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getDayName(year: number, month: number, day: number) {
  return new Date(year, month, day).toLocaleDateString("pt-PT", { weekday: "short" });
}

const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function Horas() {
  const [selectedEmployee, setSelectedEmployee] = useState("1");
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const daysInMonth = getDaysInMonth(year, month);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Mock data
  const hoursData: Record<number, { normal: number; extra: number }> = {};
  days.forEach((d) => {
    const dayOfWeek = new Date(year, month, d).getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      hoursData[d] = { normal: 8, extra: Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0 };
    }
  });

  const totalNormal = Object.values(hoursData).reduce((s, h) => s + h.normal, 0);
  const totalExtra = Object.values(hoursData).reduce((s, h) => s + h.extra, 0);
  const daysWorked = Object.keys(hoursData).length;

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else setMonth(month - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else setMonth(month + 1);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display">Horas / Salários</h1>
          <p className="text-sm text-muted-foreground">Lançamento de horas mensal por colaborador</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Exportar CSV</Button>
          <Button className="bg-gradient-primary hover:opacity-90"><Save className="mr-2 h-4 w-4" /> Guardar</Button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={item} className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
          <SelectTrigger className="w-full sm:w-[220px] bg-card">
            <SelectValue placeholder="Selecionar colaborador" />
          </SelectTrigger>
          <SelectContent>
            {employees.map((e) => (
              <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-9 w-9" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="min-w-[160px] text-center">
            <span className="text-sm font-semibold">{months[month]} {year}</span>
          </div>
          <Button variant="outline" size="icon" className="h-9 w-9" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* Summary */}
      <motion.div variants={item} className="grid grid-cols-3 gap-4">
        {[
          { label: "Horas Normais", value: totalNormal, color: "text-primary" },
          { label: "Horas Extra", value: totalExtra, color: "text-warning" },
          { label: "Dias Trabalhados", value: daysWorked, color: "text-success" },
        ].map((s) => (
          <Card key={s.label} className="shadow-card border-border/60">
            <CardContent className="p-4 text-center">
              <p className={`text-2xl font-bold font-display ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Calendar grid */}
      <motion.div variants={item}>
        <Card className="shadow-card border-border/60 overflow-x-auto">
          <CardContent className="p-4">
            <div className="min-w-[600px]">
              <div className="grid grid-cols-[60px_1fr_1fr_1fr] gap-px bg-border rounded-lg overflow-hidden">
                {/* Header */}
                <div className="bg-muted/50 p-2 text-xs font-semibold text-muted-foreground">Dia</div>
                <div className="bg-muted/50 p-2 text-xs font-semibold text-muted-foreground text-center">H. Normais</div>
                <div className="bg-muted/50 p-2 text-xs font-semibold text-muted-foreground text-center">H. Extra</div>
                <div className="bg-muted/50 p-2 text-xs font-semibold text-muted-foreground text-center">Obs.</div>

                {days.map((d) => {
                  const dayOfWeek = new Date(year, month, d).getDay();
                  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                  const data = hoursData[d];
                  const bgClass = isWeekend ? "bg-muted/30" : "bg-card";

                  return (
                    <>
                      <div key={`day-${d}`} className={`${bgClass} p-2 text-xs`}>
                        <span className="font-semibold">{d}</span>
                        <span className="ml-1 text-muted-foreground capitalize">{getDayName(year, month, d)}</span>
                      </div>
                      <div key={`normal-${d}`} className={`${bgClass} p-1 text-center`}>
                        {!isWeekend && (
                          <Input
                            type="number"
                            defaultValue={data?.normal || 0}
                            className="h-7 text-center text-xs w-full border-0 bg-transparent"
                          />
                        )}
                      </div>
                      <div key={`extra-${d}`} className={`${bgClass} p-1 text-center`}>
                        {!isWeekend && (
                          <Input
                            type="number"
                            defaultValue={data?.extra || 0}
                            className="h-7 text-center text-xs w-full border-0 bg-transparent"
                          />
                        )}
                      </div>
                      <div key={`obs-${d}`} className={`${bgClass} p-1`}>
                        {!isWeekend && (
                          <Input className="h-7 text-xs w-full border-0 bg-transparent" placeholder="—" />
                        )}
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
