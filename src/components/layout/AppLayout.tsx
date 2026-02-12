import { useState } from "react";
import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import AppTopbar from "./AppTopbar";
import { cn } from "@/lib/utils";

export default function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar - desktop */}
      <div className="hidden lg:block">
        <AppSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      </div>

      {/* Sidebar - mobile */}
      <div
        className={cn(
          "lg:hidden fixed inset-y-0 left-0 z-40 transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <AppSidebar collapsed={false} onToggle={() => setMobileOpen(false)} />
      </div>

      {/* Main */}
      <div
        className={cn(
          "flex flex-col transition-all duration-300",
          sidebarCollapsed ? "lg:ml-[72px]" : "lg:ml-[260px]"
        )}
      >
        <AppTopbar onMobileMenuToggle={() => setMobileOpen(!mobileOpen)} />
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
