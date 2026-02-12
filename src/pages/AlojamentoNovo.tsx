import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function AlojamentoNovo() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Alojamento criado",
      description: "O novo alojamento foi registado com sucesso.",
    });
    navigate("/alojamentos");
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-2xl">
      <motion.div variants={item} className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/alojamentos")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold font-display">Novo Alojamento</h1>
          <p className="text-sm text-muted-foreground">Preencha os dados para registar um novo alojamento</p>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <form onSubmit={handleSubmit}>
          <Card className="shadow-card border-border/60">
            <CardHeader>
              <CardTitle className="text-base font-display flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" /> Informações do Alojamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nome do Alojamento <span className="text-destructive">*</span></label>
                <Input placeholder="Ex: Alojamento Central" required />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Endereço <span className="text-destructive">*</span></label>
                <Input placeholder="Ex: Rua das Flores 123, Lisboa" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Capacidade Total</label>
                  <Input type="number" placeholder="0" min={0} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Estado</label>
                  <Select defaultValue="active">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Ativo</SelectItem>
                      <SelectItem value="inactive">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Observações</label>
                <Textarea placeholder="Informações adicionais sobre o alojamento..." className="resize-none" rows={3} />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => navigate("/alojamentos")}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-gradient-primary hover:opacity-90">
                  <Save className="mr-2 h-4 w-4" /> Criar Alojamento
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </motion.div>
    </motion.div>
  );
}
