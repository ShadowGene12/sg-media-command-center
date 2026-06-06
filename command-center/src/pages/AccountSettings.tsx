import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Building, Mail, Shield, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const AccountSettings = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-display font-bold">Account Settings</h1>

      {/* Current Plan */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <CreditCard className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-display font-semibold">Current Plan</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-lg font-bold">Free Tier</p>
            <p className="text-sm text-muted-foreground">Basic bottleneck diagnostic access</p>
          </div>
          <Link to="/upgrade">
            <Button>Upgrade to DIY →</Button>
          </Link>
        </div>
      </Card>

      {/* Profile */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <User className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-display font-semibold">Profile Information</h2>
        </div>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="Shadow" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <Input id="email" type="email" defaultValue="shadow@sgmedia.in" />
            </div>
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </Card>

      {/* Company */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Building className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-display font-semibold">Company Information</h2>
        </div>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <Input id="company" defaultValue="SG Media" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="revenue">Annual Revenue Range</Label>
            <select id="revenue" className="w-full p-2 border border-border rounded-md bg-secondary text-foreground" defaultValue="1m-5m">
              <option value="0-10l">₹0 - ₹10 Lakh</option>
              <option value="10l-50l">₹10 Lakh - ₹50 Lakh</option>
              <option value="50l-1cr">₹50 Lakh - ₹1 Crore</option>
              <option value="1cr-5cr">₹1 Crore - ₹5 Crore</option>
              <option value="5cr+">₹5 Crore+</option>
            </select>
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </Card>

      {/* Password */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-display font-semibold">Change Password</h2>
        </div>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" />
          </div>
          <Button type="submit">Update Password</Button>
        </form>
      </Card>
    </div>
  );
};

export default AccountSettings;
