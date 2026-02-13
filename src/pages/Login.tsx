import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Eye, EyeOff, Mail, Lock, Shield, Users, Wrench, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useAuth, MOCK_USERS, ROLE_LABELS, type UserRole } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const ROLE_ICONS: Record<UserRole, React.ReactNode> = {
  admin: <Shield className="h-4 w-4" />,
  rh: <Users className="h-4 w-4" />,
  operacoes: <Wrench className="h-4 w-4" />,
  funcionario: <User className="h-4 w-4" />,
};

const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  admin: "Acesso total a todos os módulos",
  rh: "Colaboradores, contratos, horas, relatórios",
  operacoes: "Alojamentos, quartos, viaturas",
  funcionario: "Perfil próprio, documentos e assinatura",
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("admin@empresa.pt");
  const [password, setPassword] = useState("password");
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email)) {
      navigate("/");
    } else {
      toast({ title: "Credenciais inválidas", description: "Utilize um dos emails de demonstração.", variant: "destructive" });
    }
  };

  const handleDemoLogin = (demoEmail: string) => {
    if (login(demoEmail)) {
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-primary items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 h-64 w-64 rounded-full bg-accent blur-3xl" />
          <div className="absolute bottom-20 right-20 h-48 w-48 rounded-full bg-primary-foreground blur-3xl" />
        </div>
        <div className="relative z-10 max-w-md text-center">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent">
            <Building2 className="h-8 w-8 text-accent-foreground" />
          </div>
          <h1 className="mb-4 text-3xl font-bold text-primary-foreground font-display">
            Portal RH & Operações
          </h1>
          <p className="text-primary-foreground/70 text-sm leading-relaxed">
            Plataforma centralizada para gestão de alojamentos, viaturas, contratos, horas e documentos da empresa.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="mb-8 text-center lg:hidden">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold font-display">Portal RH & Operações</h1>
          </div>

          <div className="space-y-2 mb-6">
            <h2 className="text-2xl font-bold font-display">Iniciar Sessão</h2>
            <p className="text-sm text-muted-foreground">Introduza as suas credenciais para aceder</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input type="email" placeholder="seu.email@empresa.pt" className="pl-9" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Palavra-passe</label>
                <button type="button" className="text-xs text-primary hover:underline">Esqueci a palavra-passe</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-9 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90 h-10">
              Entrar
            </Button>
          </form>

          {/* Demo accounts */}
          <div className="mt-8">
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-2 text-muted-foreground">Contas de demonstração</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {MOCK_USERS.map((u) => (
                <button
                  key={u.id}
                  onClick={() => handleDemoLogin(u.email)}
                  className="flex flex-col items-start gap-1 rounded-lg border border-border p-3 text-left transition-colors hover:bg-secondary/80"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-primary">{ROLE_ICONS[u.role]}</span>
                    <span className="text-xs font-semibold">{ROLE_LABELS[u.role]}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground leading-tight">{ROLE_DESCRIPTIONS[u.role]}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Portal RH & Operações. Todos os direitos reservados.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
