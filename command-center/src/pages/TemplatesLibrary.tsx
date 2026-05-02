import { Button } from "@/components/ui/button";
import { Download, FileText, FileSpreadsheet, File } from "lucide-react";

const TEMPLATES = [
  { name: "Weekly KPI Dashboard", pillar: "Financial Control", color: "#D85A30", format: "Google Sheets", icon: FileSpreadsheet },
  { name: "Sales Process SOP", pillar: "Sales & Conversion", color: "#1D9E75", format: "PDF", icon: FileText },
  { name: "ICP Worksheet", pillar: "Market & Offer", color: "#6D4AE6", format: "Notion", icon: File },
  { name: "Funnel Mapping Canvas", pillar: "Customer Acquisition", color: "#378ADD", format: "PDF", icon: FileText },
  { name: "Pricing Analysis Template", pillar: "Profit Optimization", color: "#F59E0B", format: "Google Sheets", icon: FileSpreadsheet },
  { name: "Monthly Review Template", pillar: "Cross-Pillar", color: "#6D4AE6", format: "Notion", icon: File },
  { name: "Objection Handling Script", pillar: "Sales & Conversion", color: "#1D9E75", format: "Google Docs", icon: FileText },
  { name: "Cash Flow Projection", pillar: "Financial Control", color: "#D85A30", format: "Google Sheets", icon: FileSpreadsheet },
  { name: "Content Calendar", pillar: "Customer Acquisition", color: "#378ADD", format: "Notion", icon: File },
];

const TemplatesLibrary = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold">Templates</h1>
        <p className="text-muted-foreground mt-1">Ready-to-use SOPs, worksheets, and trackers for every pillar.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEMPLATES.map((template) => (
          <div key={template.name} className="bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition-all group">
            <div className="flex items-start justify-between mb-3">
              <div className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${template.color}15` }}>
                <template.icon className="h-5 w-5" style={{ color: template.color }} />
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground font-mono">{template.format}</span>
            </div>
            <h3 className="text-sm font-semibold mb-1">{template.name}</h3>
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: `${template.color}20`, color: template.color }}>
              {template.pillar}
            </span>
            <div className="mt-4">
              <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Download className="h-3.5 w-3.5 mr-1.5" /> Download
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatesLibrary;
