import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Alojamentos from "./pages/Alojamentos";
import AlojamentoDetalhe from "./pages/AlojamentoDetalhe";
import AlojamentoNovo from "./pages/AlojamentoNovo";
import Viaturas from "./pages/Viaturas";
import ViaturaDetalhe from "./pages/ViaturaDetalhe";
import ViaturaNova from "./pages/ViaturaNova";
import Horas from "./pages/Horas";
import Contratos from "./pages/Contratos";
import Funcionarios from "./pages/Funcionarios";
import Relatorios from "./pages/Relatorios";
import Configuracoes from "./pages/Configuracoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/alojamentos" element={<Alojamentos />} />
              <Route path="/alojamentos/novo" element={<AlojamentoNovo />} />
              <Route path="/alojamentos/:id" element={<AlojamentoDetalhe />} />
            <Route path="/viaturas" element={<Viaturas />} />
            <Route path="/viaturas/nova" element={<ViaturaNova />} />
            <Route path="/viaturas/:id" element={<ViaturaDetalhe />} />
              <Route path="/horas" element={<Horas />} />
              <Route path="/contratos" element={<Contratos />} />
              <Route path="/funcionarios" element={<Funcionarios />} />
              <Route path="/relatorios" element={<Relatorios />} />
              <Route path="/configuracoes" element={<Configuracoes />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
