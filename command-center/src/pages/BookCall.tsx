import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Video, CheckCircle2 } from "lucide-react";

const BookCall = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Book Your Strategy Call
                </h1>
                <p className="text-lg text-muted-foreground">
                  45-minute session to review your diagnostics and map your growth roadmap
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">45 Minutes</h3>
                    <p className="text-sm text-muted-foreground">
                      Focused session reviewing your specific bottlenecks
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                    <Video className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Video Call</h3>
                    <p className="text-sm text-muted-foreground">
                      Zoom or Google Meet - your preference
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Flexible Scheduling</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose a time that works for your schedule
                    </p>
                  </div>
                </div>
              </div>

              <Card className="p-6 bg-success-light border-success">
                <h3 className="font-semibold mb-3">What We'll Cover:</h3>
                <ul className="space-y-2">
                  {[
                    "Review your diagnostic results",
                    "Identify immediate opportunities",
                    "Prioritize next steps",
                    "Discuss solution fit and timeline"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Right: Form */}
            <Card className="p-8 shadow-lg">
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Smith" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@company.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" placeholder="Your Company LLC" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="revenue">Approximate Annual Revenue</Label>
                  <select 
                    id="revenue" 
                    className="w-full p-2 border rounded-md bg-background"
                  >
                    <option value="">Select range</option>
                    <option value="0-250k">$0 - $250K</option>
                    <option value="250k-1m">$250K - $1M</option>
                    <option value="1m-5m">$1M - $5M</option>
                    <option value="5m+">$5M+</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="challenge">Primary Challenge</Label>
                  <Textarea 
                    id="challenge" 
                    placeholder="What's the main issue you're trying to solve?"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Preferred Date & Time</Label>
                  <Input id="date" type="datetime-local" />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Request Strategy Call
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  We'll confirm your booking within 24 hours via email
                </p>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default BookCall;
