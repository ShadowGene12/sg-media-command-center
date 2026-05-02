import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ORGANIZATION, PILLARS } from "@/lib/mockData";
import { Building2, User, Mail, Calendar, Settings, Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Account() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Account & Organization</h1>
        <p className="text-muted-foreground mt-1">Organization profile, engagement details, and workspace settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Organization Profile */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>Organization Profile</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">MG</span>
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">{ORGANIZATION.name}</p>
                <p className="text-sm text-muted-foreground">{ORGANIZATION.industry}</p>
              </div>
            </div>
            <Separator />
            {[
              { icon: User, label: "Primary Contact", value: ORGANIZATION.owner },
              { icon: Mail, label: "Email", value: ORGANIZATION.email },
              { icon: Shield, label: "Role", value: ORGANIZATION.ownerRole },
              { icon: Calendar, label: "Start Date", value: ORGANIZATION.startDate },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3">
                <item.icon className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm text-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Engagement Details */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>Engagement Details</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Program</p>
              <p className="text-sm font-medium text-foreground mt-1">{ORGANIZATION.program}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Current Phase</p>
              <Badge variant="outline" className="mt-1">{ORGANIZATION.currentPhase}</Badge>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Status</p>
              <Badge className="bg-status-success/10 text-status-success border-0 mt-1">{ORGANIZATION.status}</Badge>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Health Score</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xl font-bold text-foreground">{ORGANIZATION.healthScore}/100</span>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-status-success" style={{ width: `${ORGANIZATION.healthScore}%` }} />
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Summary</p>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{ORGANIZATION.engagementSummary}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pillar Coverage */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>Pillar Coverage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PILLARS.map(p => {
              const active = ORGANIZATION.pillarFocus.includes(p.id);
              return (
                <div key={p.id} className={`flex items-center gap-3 p-3 rounded-lg border ${active ? 'bg-muted/50' : 'opacity-50'}`}>
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: `hsl(var(--pillar-${p.id}))` }} />
                  <span className="text-sm text-foreground">{p.name}</span>
                  {active && <Badge variant="outline" className="text-[10px] ml-auto">Active</Badge>}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Communication Preferences */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>Communication Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Weekly Review", value: "Every Friday, 10:00 AM" },
              { label: "Monthly Review", value: "First Monday of month" },
              { label: "Preferred Channel", value: "Email + Slack" },
              { label: "Escalation Contact", value: "Alexandra Reiner" },
            ].map(pref => (
              <div key={pref.label} className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground">{pref.label}</p>
                <p className="text-sm text-foreground mt-1">{pref.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
