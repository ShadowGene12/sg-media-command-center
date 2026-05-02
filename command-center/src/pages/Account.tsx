import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Building, Mail } from "lucide-react";

const Account = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

          <div className="space-y-6">
            {/* Profile */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Profile Information</h2>
              </div>

              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Sarah" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Thompson" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <Input id="email" type="email" defaultValue="sarah@growthsolutions.com" />
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
                <h2 className="text-xl font-bold">Company Information</h2>
              </div>

              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" defaultValue="Growth Solutions LLC" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="revenue">Annual Revenue Range</Label>
                  <select 
                    id="revenue" 
                    className="w-full p-2 border rounded-md bg-background"
                    defaultValue="1m-5m"
                  >
                    <option value="0-250k">$0 - $250K</option>
                    <option value="250k-1m">$250K - $1M</option>
                    <option value="1m-5m">$1M - $5M</option>
                    <option value="5m+">$5M+</option>
                  </select>
                </div>

                <Button type="submit">Save Changes</Button>
              </form>
            </Card>

            {/* Password */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Change Password</h2>
              <form className="space-y-4">
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

            {/* Danger Zone */}
            <Card className="p-6 border-destructive">
              <h2 className="text-xl font-bold mb-4 text-destructive">Danger Zone</h2>
              <p className="text-muted-foreground mb-4">
                Permanently delete your account and all associated data
              </p>
              <Button variant="destructive">Delete Account</Button>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Account;
