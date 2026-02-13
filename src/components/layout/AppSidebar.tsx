import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Car,
  Clock,
  FileText,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth, ROLE_LABELS } from "@/contexts/AuthContext";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Building2, label: "Alojamentos", path: "/alojamentos" },
  { icon: Car, label: "Viaturas", path: "/viaturas" },
  { icon: Clock, label: "Horas / Salários", path: "/horas" },
  { icon: FileText, label: "Contratos & Docs", path: "/contratos" },
  { icon: Users, label: "Funcionários", path: "/funcionarios" },
  { icon: BarChart3, label: "Relatórios", path: "/relatorios" },
  { icon: Settings, label: "Configurações", path: "/configuracoes" },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  const location = useLocation();
  const { user, hasAccess } = useAuth();

  const visibleItems = menuItems.filter((item) => hasAccess(item.path));

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col bg-gradient-sidebar transition-all duration-300",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary">
          <Building2 className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="animate-slide-in-left overflow-hidden">
            <h1 className="text-sm font-bold text-sidebar-accent-foreground font-display tracking-tight">
              Portal RH
            </h1>
            <p className="text-[10px] text-sidebar-muted">& Operações</p>
          </div>
        )}
      </div>

      {/* Role badge */}
      {!collapsed && user && (
        <div className="mx-3 mt-3 rounded-lg bg-sidebar-accent/50 px-3 py-2">
          <p className="text-[10px] uppercase tracking-wider text-sidebar-muted">Perfil</p>
          <p className="text-xs font-semibold text-sidebar-accent-foreground">{ROLE_LABELS[user.role]}</p>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {visibleItems.map((item) => {
          const isActive =
            item.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  isActive ? "text-sidebar-primary" : "text-sidebar-muted group-hover:text-sidebar-foreground"
                )}
              />
              {!collapsed && (
                <span className="animate-slide-in-left truncate">{item.label}</span>
              )}
              {isActive && !collapsed && (
                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-sidebar-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Toggle */}
      <div className="border-t border-sidebar-border p-3">
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center gap-2 rounded-lg p-2 text-sidebar-muted transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {!collapsed && <span className="text-xs">Recolher menu</span>}
        </button>
      </div>
    </aside>
  );
}
