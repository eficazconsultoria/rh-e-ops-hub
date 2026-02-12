import { motion } from "framer-motion";
import {
  Building2,
  Car,
  Clock,
  FileSignature,
  Users,
  BedDouble,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const stats = [
  {
    title: "Vagas Disponíveis",
    value: "24",
    subtitle: "de 86 camas totais",
    icon: BedDouble,
    color: "text-info",
    bg: "bg-info/10",
    trend: "+3 hoje",
  },
  {
    title: "Ocupação Atual",
    value: "72%",
    subtitle: "62 ocupados / 86 total",
    icon: Building2,
    color: "text-success",
    bg: "bg-success/10",
    trend: "Estável",
  },
  {
    title: "Docs Pendentes",
    value: "8",
    subtitle: "3 contratos, 5 documentos",
    icon: FileSignature,
    color: "text-warning",
    bg: "bg-warning/10",
    trend: "2 novos hoje",
  },
  {
    title: "Viaturas em Uso",
    value: "5",
    subtitle: "de 12 no total",
    icon: Car,
    color: "text-primary",
    bg: "bg-primary/10",
    trend: "3 disponíveis",
  },
];

const shortcuts = [
  { icon: Building2, label: "Cadastrar Alojamento", path: "/alojamentos" },
  { icon: Car, label: "Atribuir Motorista", path: "/viaturas" },
  { icon: Clock, label: "Lançar Horas", path: "/horas" },
  { icon: FileSignature, label: "Gerar Contrato", path: "/contratos" },
];

const recentActivities = [
  { text: "João Silva fez check-in no Quarto 204", time: "Há 30 min", type: "checkin" },
  { text: "Contrato de Maria Santos assinado", time: "Há 1 hora", type: "signature" },
  { text: "Viatura 45-AB-12 atribuída a Pedro Costa", time: "Há 2 horas", type: "vehicle" },
  { text: "Horas de Janeiro processadas — 15 colaboradores", time: "Há 3 horas", type: "hours" },
  { text: "Ana Ferreira completou dados pessoais", time: "Há 5 horas", type: "profile" },
];

const accommodationSummary = [
  { name: "Alojamento Central", occupied: 18, total: 24, percentage: 75 },
  { name: "Residência Norte", occupied: 22, total: 30, percentage: 73 },
  { name: "Casa Sul", occupied: 12, total: 16, percentage: 75 },
  { name: "Alojamento Leste", occupied: 10, total: 16, percentage: 63 },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function Dashboard() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Header */}
      <motion.div variants={item} className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold font-display text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Visão geral das operações — {new Date().toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.title} variants={item}>
            <Card className="shadow-card border-border/60 hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold font-display text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                  </div>
                  <div className={`rounded-xl p-2.5 ${stat.bg}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1.5">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-xs text-success font-medium">{stat.trend}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Shortcuts */}
      <motion.div variants={item}>
        <Card className="shadow-card border-border/60">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {shortcuts.map((sc) => (
                <Link key={sc.label} to={sc.path}>
                  <Button
                    variant="outline"
                    className="h-auto w-full flex-col gap-2 py-4 border-dashed hover:border-primary/40 hover:bg-primary/5 transition-all"
                  >
                    <sc.icon className="h-5 w-5 text-primary" />
                    <span className="text-xs font-medium">{sc.label}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Accommodation overview */}
        <motion.div variants={item}>
          <Card className="shadow-card border-border/60">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-display">Ocupação de Alojamentos</CardTitle>
                <Link to="/alojamentos">
                  <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                    Ver todos <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {accommodationSummary.map((acc) => (
                <div key={acc.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{acc.name}</span>
                    <span className="text-muted-foreground">
                      {acc.occupied}/{acc.total}
                    </span>
                  </div>
                  <Progress value={acc.percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent activity */}
        <motion.div variants={item}>
          <Card className="shadow-card border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display">Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg p-2 hover:bg-muted/50 transition-colors">
                    <div className="mt-0.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{activity.text}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
