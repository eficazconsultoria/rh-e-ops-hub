import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Car, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const anim = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function ViaturaNova() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Viatura criada", description: "A nova viatura foi registada com sucesso." });
    navigate("/viaturas");
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-2xl">
      <motion.div variants={anim} className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/viaturas")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold font-display">Nova Viatura</h1>
          <p className="text-sm text-muted-foreground">Registar um novo veículo na frota</p>
        </div>
      </motion.div>

      <motion.div variants={anim}>
        <Card className="shadow-card border-border/60">
          <CardHeader>
            <CardTitle className="text-base font-display flex items-center gap-2">
              <Car className="h-4 w-4 text-primary" /> Dados do Veículo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Matrícula</label>
                  <Input placeholder="Ex: 45-AB-12" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Modelo</label>
                  <Input placeholder="Ex: Renault Master" required />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ano</label>
                  <Input type="number" min={2000} max={2030} defaultValue={2024} required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tipo</label>
                  <Select defaultValue="comercial">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comercial">Comercial</SelectItem>
                      <SelectItem value="furgao">Furgão</SelectItem>
                      <SelectItem value="pesado">Pesado</SelectItem>
                      <SelectItem value="ligeiro">Ligeiro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quilometragem</label>
                  <Input type="number" min={0} placeholder="0" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Estado</label>
                <Select defaultValue="available">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Disponível</SelectItem>
                    <SelectItem value="in_use">Em Uso</SelectItem>
                    <SelectItem value="maintenance">Manutenção</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Observações</label>
                <Textarea placeholder="Observações adicionais..." className="resize-none" rows={3} />
              </div>

              <div className="flex gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => navigate("/viaturas")}>Cancelar</Button>
                <Button type="submit" className="bg-gradient-primary hover:opacity-90">
                  <Save className="mr-2 h-4 w-4" /> Registar Viatura
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
