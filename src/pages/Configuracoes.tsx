import { motion } from "framer-motion";
import { Settings, FileText, Users, Tag, Shield, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const docCategories = ["Contrato", "NDA", "Fiscal", "Informativo", "Adenda", "Certificado"];
const roles = [
  { name: "Admin", desc: "Acesso total ao sistema", users: 2 },
  { name: "RH", desc: "Colaboradores, contratos, horas, relatórios", users: 3 },
  { name: "Operações", desc: "Alojamentos, viaturas, atribuições", users: 4 },
  { name: "Funcionário", desc: "Perfil próprio, documentos, assinaturas", users: 35 },
];

export default function Configuracoes() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold font-display">Configurações</h1>
        <p className="text-sm text-muted-foreground">Gerir categorias, cargos, permissões e templates</p>
      </motion.div>

      <motion.div variants={item}>
        <Tabs defaultValue="roles" className="space-y-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="roles">Perfis & Permissões</TabsTrigger>
            <TabsTrigger value="categories">Categorias</TabsTrigger>
            <TabsTrigger value="general">Geral</TabsTrigger>
          </TabsList>

          <TabsContent value="roles" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {roles.map((r) => (
                <Card key={r.name} className="shadow-card border-border/60">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2">
                          <Shield className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{r.name}</p>
                          <p className="text-xs text-muted-foreground">{r.desc}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-[10px]">{r.users} utilizadores</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <Card className="shadow-card border-border/60">
              <CardHeader>
                <CardTitle className="text-base">Categorias de Documentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {docCategories.map((cat) => (
                    <Badge key={cat} variant="secondary" className="px-3 py-1.5">{cat}</Badge>
                  ))}
                  <Button variant="outline" size="sm" className="text-xs">+ Adicionar</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="general" className="space-y-4">
            <Card className="shadow-card border-border/60">
              <CardHeader>
                <CardTitle className="text-base">Informações da Empresa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nome da Empresa</label>
                    <Input defaultValue="Empresa Exemplo, Lda." className="bg-card" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">NIF</label>
                    <Input defaultValue="123456789" className="bg-card" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium">Morada</label>
                    <Input defaultValue="Rua Exemplo 123, 1000-100 Lisboa" className="bg-card" />
                  </div>
                </div>
                <Button className="bg-gradient-primary hover:opacity-90">Guardar Alterações</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
