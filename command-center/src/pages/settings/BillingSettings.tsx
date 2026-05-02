import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, ExternalLink, Download, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BillingSettings() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <Card className="bg-slate-900 border-primary/30 shadow-[0_0_20px_rgba(139,92,246,0.1)]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-primary" /> Current Plan
          </CardTitle>
          <CardDescription>Manage your subscription and billing cycle.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-xl bg-slate-800/50 border border-white/5">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-bold text-white">Pro Tier</span>
                <span className="px-2 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded">Active</span>
              </div>
              <p className="text-slate-400">₹4,900 / month. Next billing date: Nov 15, 2026</p>
            </div>
            <div className="flex gap-3">
              <Link to="/pricing">
                <Button className="bg-white/10 hover:bg-white/20 text-white border-white/10">
                  Change Plan
                </Button>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Payment Method</h3>
            <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-slate-900">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-slate-800 rounded flex items-center justify-center border border-white/10 text-xs font-bold text-slate-300">
                  VISA
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Visa ending in 4242</div>
                  <div className="text-xs text-slate-500">Expires 12/28</div>
                </div>
              </div>
              <Button variant="ghost" className="text-slate-400 hover:text-white flex items-center gap-2">
                Edit <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-2">Payments are securely processed by Stripe.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-white/10">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: 'Oct 15, 2026', amount: '₹4,900', status: 'Paid', invoice: 'INV-2026-10' },
              { date: 'Sep 15, 2026', amount: '₹4,900', status: 'Paid', invoice: 'INV-2026-09' },
            ].map((inv) => (
              <div key={inv.invoice} className="flex items-center justify-between p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-colors">
                <div>
                  <div className="font-medium text-white">{inv.date}</div>
                  <div className="text-sm text-slate-400">{inv.amount} • {inv.status}</div>
                </div>
                <Button variant="ghost" className="text-slate-400 hover:text-white">
                  <Download className="w-4 h-4 mr-2" /> PDF
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="pt-8 border-t border-red-500/20">
        <h3 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" /> Danger Zone
        </h3>
        <p className="text-sm text-slate-400 mb-4">Canceling your subscription will lock your account at the end of your billing cycle. You will lose access to premium SOPs, sprint tracking, and AI Advisor.</p>
        <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
          Cancel Subscription
        </Button>
      </div>
    </div>
  );
}
