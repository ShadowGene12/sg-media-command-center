import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const pricingTiers = [
  {
    name: 'Free',
    price: '$0',
    description: 'Basic bottleneck detection',
    features: [
      'Master Bottleneck Scanner (1 run/mo)',
      'Basic Growth Score',
      'Community Access',
      <span key="no-ai" className="text-slate-500 flex items-center line-through"><X className="h-4 w-4 mr-2" /> AI Advisor</span>,
      <span key="no-sprint" className="text-slate-500 flex items-center line-through"><X className="h-4 w-4 mr-2" /> Sprint Tracking</span>,
    ],
    cta: 'Current Plan',
    disabled: true,
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/month',
    description: 'Full growth infrastructure',
    popular: true,
    features: [
      'Unlimited Bottleneck Scans',
      'Full Library Access (SOPs & Frameworks)',
      '1 Active Sprint Track',
      '1 Pathway Active',
      '100 AI Advisor Credits/mo',
    ],
    cta: 'Upgrade to Pro',
    disabled: false,
  },
  {
    name: 'Studio',
    price: '$149',
    period: '/month',
    description: 'Agency-level execution',
    features: [
      'Everything in Pro',
      '3 Active Sprint Tracks',
      'Unlimited Pathways',
      '500 AI Advisor Credits/mo',
      'Organization Management (up to 5 seats)',
    ],
    cta: 'Upgrade to Studio',
    disabled: false,
  },
  {
    name: 'Done For You',
    price: 'Custom',
    description: 'Tier 4 Onsite partnership',
    features: [
      'Dedicated Account Manager',
      'Custom SOP Development',
      'Bi-weekly Review Calls',
      'Priority Support',
      'Direct Implementation',
    ],
    cta: 'Apply for Waitlist',
    disabled: false,
  }
];

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B0819] text-white py-20 px-4 flex flex-col items-center">
      <div className="text-center mb-16 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          Scale Your Growth Infrastructure
        </h1>
        <p className="text-lg text-slate-400">
          Choose the tier that fits your current operational needs. Upgrade anytime as you grow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {pricingTiers.map((tier) => (
          <Card 
            key={tier.name} 
            className={`bg-slate-900/50 border-white/5 backdrop-blur-xl relative overflow-hidden flex flex-col
              ${tier.popular ? 'border-primary/50 shadow-[0_0_30px_rgba(139,92,246,0.15)] transform md:-translate-y-2' : ''}
            `}
          >
            {tier.popular && (
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-purple-500" />
            )}
            {tier.popular && (
              <div className="absolute top-3 right-3 text-xs font-semibold px-2 py-1 bg-primary/20 text-primary rounded-full border border-primary/20">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl font-bold">{tier.name}</CardTitle>
              <CardDescription className="text-slate-400 min-h-[40px]">{tier.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">{tier.price}</span>
                {tier.period && <span className="text-slate-400">{tier.period}</span>}
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    {typeof feature === 'string' ? (
                      <>
                        <Check className="h-5 w-5 text-primary shrink-0 mr-3" />
                        <span className="text-sm text-slate-300">{feature}</span>
                      </>
                    ) : (
                      feature
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => {
                  if (tier.name === 'Done For You') {
                    navigate('/onsite');
                  } else {
                    // Logic for Stripe redirect in future
                    console.log(`Select ${tier.name}`);
                  }
                }}
                disabled={tier.disabled}
                variant={tier.popular ? "default" : "outline"}
                className={`w-full ${
                  tier.popular 
                    ? "bg-primary hover:bg-primary/90 text-white" 
                    : "border-white/10 hover:bg-white/5"
                }`}
              >
                {tier.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
