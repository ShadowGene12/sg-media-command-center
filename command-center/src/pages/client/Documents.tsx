import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DOCUMENTS, PILLARS } from "@/lib/mockData";
import { FileText, Download, FolderOpen } from "lucide-react";

const categories = ["All", "SOPs", "Frameworks", "Deliverables", "Templates", "Strategy Notes", "Meeting Notes", "Reports"];
const typeIcon: Record<string, string> = { PDF: "📄", Document: "📝", Spreadsheet: "📊" };

export default function Documents() {
  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Documents & SOP Vault</h1>
        <p className="text-muted-foreground mt-1">Organized library of frameworks, SOPs, deliverables, and strategy notes.</p>
      </div>

      {/* Category stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {["SOPs", "Frameworks", "Deliverables", "Templates"].map(cat => (
          <Card key={cat}>
            <CardContent className="p-4 flex items-center gap-3">
              <FolderOpen className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-lg font-bold text-foreground">{DOCUMENTS.filter(d => d.category === cat).length}</p>
                <p className="text-xs text-muted-foreground">{cat}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="All">
        <TabsList className="flex-wrap">
          {categories.map(c => <TabsTrigger key={c} value={c} className="text-xs">{c}</TabsTrigger>)}
        </TabsList>
        {categories.map(cat => (
          <TabsContent key={cat} value={cat} className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {DOCUMENTS.filter(d => cat === "All" || d.category === cat).map(doc => {
                const pillar = PILLARS.find(p => p.id === doc.pillar);
                return (
                  <Card key={doc.id} className="hover:shadow-md transition-shadow cursor-pointer group">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{typeIcon[doc.type] || "📄"}</span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-foreground leading-snug">{doc.title}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-[10px]">{doc.category}</Badge>
                            <span className="text-[10px] text-muted-foreground">{doc.type}</span>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-1.5">
                              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: `hsl(var(--pillar-${doc.pillar}))` }} />
                              <span className="text-[10px] text-muted-foreground">{pillar?.name}</span>
                            </div>
                            <span className="text-[10px] text-muted-foreground">{doc.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="flex items-center gap-1.5 text-xs text-status-info hover:underline">
                          <Download className="h-3 w-3" /> Download
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
