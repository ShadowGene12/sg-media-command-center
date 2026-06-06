import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Calculator, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ProfitCalculator = () => {
  const [revenue, setRevenue] = useState<number>(50000);
  const [cogsPercent, setCogsPercent] = useState<number>(20);
  const [opex, setOpex] = useState<number>(15000);
  const [cac, setCac] = useState<number>(500);
  const [newCustomers, setNewCustomers] = useState<number>(20);

  // Calculations
  const cogs = (revenue * cogsPercent) / 100;
  const grossProfit = revenue - cogs;
  const totalCac = cac * newCustomers;
  const netProfit = grossProfit - opex - totalCac;
  const netMargin = (netProfit / revenue) * 100;

  // Projection data (Current vs +10% Price vs -10% CAC)
  const data = [
    { name: "Current", net: netProfit, gross: grossProfit },
    { name: "+10% Price", net: (grossProfit + (revenue * 0.1)) - opex - totalCac, gross: grossProfit + (revenue * 0.1) },
    { name: "-10% CAC", net: grossProfit - opex - (totalCac * 0.9), gross: grossProfit },
    { name: "Combined", net: (grossProfit + (revenue * 0.1)) - opex - (totalCac * 0.9), gross: grossProfit + (revenue * 0.1) }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <Link to="/tools">
          <Button variant="ghost" size="icon" className="rounded-full bg-white/5 border border-white/10 hover:bg-white/20">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-[#F59E0B]" />
            <h1 className="text-3xl font-display font-bold text-foreground">Profit Calculator</h1>
          </div>
          <p className="text-muted-foreground mt-1">Model your margins and find hidden profit leaks.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input Panel */}
        <div className="lg:col-span-1 space-y-6 bg-card/30 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-xl">
          <h2 className="text-lg font-semibold border-b border-white/10 pb-2 mb-4">Financial Inputs</h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Monthly Revenue ($)</label>
              <Input 
                type="number" 
                value={revenue} 
                onChange={(e) => setRevenue(Number(e.target.value))}
                className="bg-black/20 border-white/10 focus-visible:ring-[#F59E0B] font-mono text-lg"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">COGS (%)</label>
              <Input 
                type="number" 
                value={cogsPercent} 
                onChange={(e) => setCogsPercent(Number(e.target.value))}
                className="bg-black/20 border-white/10 focus-visible:ring-[#F59E0B] font-mono text-lg"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Fixed OpEx ($)</label>
              <Input 
                type="number" 
                value={opex} 
                onChange={(e) => setOpex(Number(e.target.value))}
                className="bg-black/20 border-white/10 focus-visible:ring-[#F59E0B] font-mono text-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">CAC ($)</label>
                <Input 
                  type="number" 
                  value={cac} 
                  onChange={(e) => setCac(Number(e.target.value))}
                  className="bg-black/20 border-white/10 focus-visible:ring-[#F59E0B] font-mono text-lg"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">New Cust.</label>
                <Input 
                  type="number" 
                  value={newCustomers} 
                  onChange={(e) => setNewCustomers(Number(e.target.value))}
                  className="bg-black/20 border-white/10 focus-visible:ring-[#F59E0B] font-mono text-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-2xl p-6 backdrop-blur-md">
              <p className="text-sm font-semibold text-[#F59E0B] mb-1">Net Profit</p>
              <p className="text-4xl font-mono font-bold text-white">${netProfit.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-2">{netMargin.toFixed(1)}% margin</p>
            </div>
            <div className="bg-card/40 border border-white/5 rounded-2xl p-6 backdrop-blur-xl">
              <p className="text-sm font-semibold text-muted-foreground mb-1">Gross Profit</p>
              <p className="text-4xl font-mono font-bold text-white">${grossProfit.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-2">{((grossProfit/revenue)*100).toFixed(1)}% margin</p>
            </div>
          </div>

          <div className="bg-card/30 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-xl h-[400px]">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#10B981]" />
              Optimization Projections
            </h2>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorGross" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6D4AE6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6D4AE6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#A8B2BD" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#A8B2BD" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(10, 10, 12, 0.9)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}
                  itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="gross" stroke="#6D4AE6" fillOpacity={1} fill="url(#colorGross)" />
                <Area type="monotone" dataKey="net" stroke="#F59E0B" strokeWidth={3} fillOpacity={1} fill="url(#colorNet)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitCalculator;
