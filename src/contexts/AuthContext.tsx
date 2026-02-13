import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "admin" | "rh" | "operacoes" | "funcionario";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  initials: string;
}

const MOCK_USERS: MockUser[] = [
  { id: "1", name: "Administrador", email: "admin@empresa.pt", role: "admin", initials: "AD" },
  { id: "2", name: "Ana Recursos Humanos", email: "rh@empresa.pt", role: "rh", initials: "RH" },
  { id: "3", name: "Carlos Operações", email: "ops@empresa.pt", role: "operacoes", initials: "OP" },
  { id: "4", name: "João Silva", email: "joao@empresa.pt", role: "funcionario", initials: "JS" },
];

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: "Administrador",
  rh: "Recursos Humanos",
  operacoes: "Operações",
  funcionario: "Funcionário",
};

// Which routes each role can access
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: ["/", "/alojamentos", "/viaturas", "/horas", "/contratos", "/funcionarios", "/relatorios", "/configuracoes"],
  rh: ["/", "/horas", "/contratos", "/funcionarios", "/relatorios"],
  operacoes: ["/", "/alojamentos", "/viaturas"],
  funcionario: ["/", "/contratos"],
};

interface AuthContextType {
  user: MockUser | null;
  login: (email: string) => boolean;
  logout: () => void;
  hasAccess: (path: string) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  logout: () => {},
  hasAccess: () => false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(() => {
    const saved = sessionStorage.getItem("mock_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string) => {
    const found = MOCK_USERS.find((u) => u.email === email);
    if (found) {
      setUser(found);
      sessionStorage.setItem("mock_user", JSON.stringify(found));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("mock_user");
  };

  const hasAccess = (path: string) => {
    if (!user) return false;
    const perms = ROLE_PERMISSIONS[user.role];
    return perms.some((p) => (p === "/" ? path === "/" : path.startsWith(p)));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasAccess }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export { MOCK_USERS };
