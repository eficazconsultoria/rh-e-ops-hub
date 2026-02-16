import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Plus, Search, Send, Eye, Clock, CheckCircle2, Upload, ExternalLink, Link2, X, File } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";

interface Document {
  id: number;
  title: string;
  employee: string;
  category: string;
  status: string;
  date: string;
  deadline: string | null;
  docusignUrl?: string;
  attachments?: string[];
}

const initialDocuments: Document[] = [
  { id: 1, title: "Contrato de Trabalho — Termo Certo", employee: "João Silva", category: "Contrato", status: "pending_signature", date: "2024-01-15", deadline: "2024-01-30", docusignUrl: "https://app.docusign.com/documents/abc123" },
  { id: 2, title: "Acordo de Confidencialidade", employee: "Maria Santos", category: "NDA", status: "signed", date: "2024-01-10", deadline: null, docusignUrl: "https://app.docusign.com/documents/def456" },
  { id: 3, title: "Regulamento Interno", employee: "Todos", category: "Informativo", status: "sent", date: "2024-01-05", deadline: null },
  { id: 4, title: "Contrato de Trabalho — Sem Termo", employee: "Pedro Costa", category: "Contrato", status: "draft", date: "2024-01-18", deadline: "2024-02-01" },
  { id: 5, title: "Adenda Salarial", employee: "Ana Ferreira", category: "Contrato", status: "pending_signature", date: "2024-01-20", deadline: "2024-02-05", docusignUrl: "https://app.docusign.com/documents/ghi789" },
  { id: 6, title: "Declaração de IRS", employee: "Carlos Oliveira", category: "Fiscal", status: "signed", date: "2024-01-08", deadline: null, attachments: ["declaracao_irs_2024.pdf"] },
];

const templates = [
  { id: 1, name: "Contrato Termo Certo", variables: 8, lastUsed: "Há 3 dias" },
  { id: 2, name: "Contrato Sem Termo", variables: 7, lastUsed: "Há 1 semana" },
  { id: 3, name: "Acordo de Confidencialidade", variables: 5, lastUsed: "Há 2 semanas" },
  { id: 4, name: "Adenda Salarial", variables: 4, lastUsed: "Há 1 mês" },
];

const statusMap: Record<string, { label: string; icon: any; class: string }> = {
  draft: { label: "Rascunho", icon: FileText, class: "bg-muted text-muted-foreground" },
  sent: { label: "Enviado", icon: Send, class: "bg-info/10 text-info" },
  pending_signature: { label: "Aguarda Assinatura", icon: Clock, class: "bg-warning/10 text-warning" },
  signed: { label: "Assinado", icon: CheckCircle2, class: "bg-success/10 text-success" },
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function Contratos() {
  const [documents] = useState<Document[]>(initialDocuments);
  const [addOpen, setAddOpen] = useState(false);
  const [viewDoc, setViewDoc] = useState<Document | null>(null);
  const [newDoc, setNewDoc] = useState({ title: "", employee: "", category: "Contrato", docusignUrl: "", notes: "" });
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const names = Array.from(files).map(f => f.name);
      setUploadedFiles(prev => [...prev, ...names]);
    }
    e.target.value = "";
  };

  const removeFile = (name: string) => {
    setUploadedFiles(prev => prev.filter(f => f !== name));
  };

  const handleSave = () => {
    if (!newDoc.title.trim()) {
      toast.error("Preencha o título do documento.");
      return;
    }
    toast.success("Contrato registado com sucesso!");
    setAddOpen(false);
    setNewDoc({ title: "", employee: "", category: "Contrato", docusignUrl: "", notes: "" });
    setUploadedFiles([]);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display">Contratos & Documentos</h1>
          <p className="text-sm text-muted-foreground">Gestão de contratos, templates e assinaturas via DocuSign</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Send className="mr-2 h-4 w-4" /> Enviar Documento</Button>
          <Button className="bg-gradient-primary hover:opacity-90" onClick={() => setAddOpen(true)}><Plus className="mr-2 h-4 w-4" /> Novo Contrato</Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total", value: "24", color: "text-foreground" },
          { label: "Pendentes", value: "5", color: "text-warning" },
          { label: "Assinados", value: "16", color: "text-success" },
          { label: "Rascunhos", value: "3", color: "text-muted-foreground" },
        ].map((s) => (
          <Card key={s.label} className="shadow-card border-border/60">
            <CardContent className="p-4 text-center">
              <p className={`text-2xl font-bold font-display ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <motion.div variants={item}>
        <Tabs defaultValue="documents" className="space-y-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="documents">Documentos</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="documents" className="space-y-4">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Pesquisar documento..." className="pl-9 bg-card border-border/60" />
            </div>

            <Card className="shadow-card border-border/60 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="font-semibold">Documento</TableHead>
                    <TableHead className="font-semibold hidden sm:table-cell">Funcionário</TableHead>
                    <TableHead className="font-semibold hidden md:table-cell">Categoria</TableHead>
                    <TableHead className="font-semibold">Estado</TableHead>
                    <TableHead className="font-semibold hidden lg:table-cell">DocuSign</TableHead>
                    <TableHead className="font-semibold hidden lg:table-cell">Anexos</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => {
                    const st = statusMap[doc.status];
                    return (
                      <TableRow key={doc.id} className="hover:bg-muted/30 cursor-pointer" onClick={() => setViewDoc(doc)}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary shrink-0" />
                            <span className="text-sm font-medium">{doc.title}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-sm">{doc.employee}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="secondary" className="text-[10px]">{doc.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={`${st.class} border-0 text-[10px]`}>
                            {st.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {doc.docusignUrl ? (
                            <a
                              href={doc.docusignUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                            >
                              <ExternalLink className="h-3 w-3" /> Abrir
                            </a>
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {doc.attachments && doc.attachments.length > 0 ? (
                            <Badge variant="secondary" className="text-[10px]">
                              <File className="h-3 w-3 mr-1" />{doc.attachments.length}
                            </Badge>
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); setViewDoc(doc); }}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {templates.map((t) => (
                <Card key={t.id} className="shadow-card border-border/60 hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2.5">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{t.name}</p>
                          <p className="text-xs text-muted-foreground">{t.variables} variáveis · {t.lastUsed}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs">Usar</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Modal: Novo Contrato */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Novo Contrato / Documento</DialogTitle>
            <DialogDescription>Registe um contrato com link DocuSign ou faça upload de documentos digitalizados.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Título *</Label>
              <Input placeholder="Ex: Contrato de Trabalho — Termo Certo" value={newDoc.title} onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Funcionário</Label>
                <Input placeholder="Nome do funcionário" value={newDoc.employee} onChange={(e) => setNewDoc({ ...newDoc, employee: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Categoria</Label>
                <Select value={newDoc.category} onValueChange={(v) => setNewDoc({ ...newDoc, category: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Contrato">Contrato</SelectItem>
                    <SelectItem value="NDA">NDA</SelectItem>
                    <SelectItem value="Informativo">Informativo</SelectItem>
                    <SelectItem value="Fiscal">Fiscal</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* DocuSign Link */}
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1.5">
                <Link2 className="h-3.5 w-3.5 text-primary" /> Link DocuSign
              </Label>
              <Input placeholder="https://app.docusign.com/documents/..." value={newDoc.docusignUrl} onChange={(e) => setNewDoc({ ...newDoc, docusignUrl: e.target.value })} />
              <p className="text-[11px] text-muted-foreground">Cole aqui o link do envelope DocuSign para gestão de assinatura.</p>
            </div>

            {/* Upload */}
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1.5">
                <Upload className="h-3.5 w-3.5 text-primary" /> Documentos Digitalizados
              </Label>
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border/80 bg-muted/30 p-4 text-sm text-muted-foreground hover:bg-muted/50 transition-colors">
                <Upload className="h-4 w-4" />
                <span>Clique para selecionar ficheiros (PDF, imagem, etc.)</span>
                <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" className="hidden" onChange={handleFileSelect} />
              </label>
              {uploadedFiles.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {uploadedFiles.map((f) => (
                    <Badge key={f} variant="secondary" className="gap-1 pr-1">
                      <File className="h-3 w-3" /> {f}
                      <button onClick={() => removeFile(f)} className="ml-1 rounded-full p-0.5 hover:bg-muted">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <Label>Observações</Label>
              <Textarea placeholder="Notas adicionais..." rows={2} value={newDoc.notes} onChange={(e) => setNewDoc({ ...newDoc, notes: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancelar</Button>
            <Button onClick={handleSave}>Guardar Contrato</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Ver Detalhes */}
      <Dialog open={!!viewDoc} onOpenChange={() => setViewDoc(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{viewDoc?.title}</DialogTitle>
            <DialogDescription>Detalhes do documento</DialogDescription>
          </DialogHeader>
          {viewDoc && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Funcionário:</span> <span className="font-medium">{viewDoc.employee}</span></div>
                <div><span className="text-muted-foreground">Categoria:</span> <Badge variant="secondary" className="text-[10px] ml-1">{viewDoc.category}</Badge></div>
                <div><span className="text-muted-foreground">Estado:</span> <Badge variant="secondary" className={`${statusMap[viewDoc.status].class} border-0 text-[10px] ml-1`}>{statusMap[viewDoc.status].label}</Badge></div>
                <div><span className="text-muted-foreground">Data:</span> <span className="font-medium">{viewDoc.date}</span></div>
                {viewDoc.deadline && <div className="col-span-2"><span className="text-muted-foreground">Prazo:</span> <span className="font-medium">{viewDoc.deadline}</span></div>}
              </div>

              {viewDoc.docusignUrl && (
                <div className="rounded-lg border border-border/60 bg-muted/20 p-3">
                  <p className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1"><Link2 className="h-3.5 w-3.5" /> DocuSign</p>
                  <a href={viewDoc.docusignUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium">
                    <ExternalLink className="h-3.5 w-3.5" /> Abrir no DocuSign
                  </a>
                  <p className="text-[11px] text-muted-foreground mt-1">A gestão de assinaturas é feita diretamente no DocuSign.</p>
                </div>
              )}

              {viewDoc.attachments && viewDoc.attachments.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1"><File className="h-3.5 w-3.5" /> Anexos</p>
                  <div className="flex flex-wrap gap-2">
                    {viewDoc.attachments.map((a) => (
                      <Badge key={a} variant="secondary" className="gap-1"><File className="h-3 w-3" /> {a}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {!viewDoc.docusignUrl && !viewDoc.attachments?.length && (
                <p className="text-sm text-muted-foreground italic">Nenhum link DocuSign ou anexo associado.</p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
