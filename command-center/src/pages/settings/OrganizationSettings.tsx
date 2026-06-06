import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, UserPlus, Shield, MoreVertical } from 'lucide-react';

const TEAM_MEMBERS = [
  { id: 1, name: 'Shadow', email: 'shadow@sgmedia.com', role: 'Owner', active: true },
  { id: 2, name: 'Alex Manager', email: 'alex@sgmedia.com', role: 'Admin', active: true },
  { id: 3, name: 'Sam Sales', email: 'sam@sgmedia.com', role: 'Member', active: false }, // Pending
];

export default function OrganizationSettings() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <Card className="bg-slate-900 border-white/10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" /> Workspace Settings
          </CardTitle>
          <CardDescription>Manage your team workspace and basic branding.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium text-slate-400 mb-2 block">Workspace Name</label>
            <div className="flex gap-4">
              <Input defaultValue="SG Media Internal" className="max-w-md h-12 bg-slate-800 border-white/10" />
              <Button className="h-12 bg-white/10 hover:bg-white/20 text-white">Save</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-white/10">
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-bold">Team Members</CardTitle>
            <CardDescription>Invite colleagues to collaborate on sprints and pathways. (3/5 seats used)</CardDescription>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]">
            <UserPlus className="w-4 h-4 mr-2" /> Invite Member
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {TEAM_MEMBERS.map((member) => (
              <div key={member.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border border-white/5 bg-slate-800/50 hover:bg-white/5 transition-colors gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shrink-0">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-white flex items-center gap-2">
                      {member.name} 
                      {!member.active && <span className="text-xs font-normal text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">Pending</span>}
                    </div>
                    <div className="text-sm text-slate-400">{member.email}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4">
                  <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-white/5">
                    {member.role === 'Owner' && <Shield className="w-3.5 h-3.5 text-primary" />}
                    {member.role}
                  </div>
                  {member.role !== 'Owner' && (
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
