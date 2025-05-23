
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, Lock, ShieldCheck, Clock } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function AuthSettingsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-2 mb-6">
        <Lock className="w-7 h-7 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Security Settings</h1>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> Two-Factor Authentication (2FA)</CardTitle>
          <CardDescription>Enhance your account security by enabling 2FA.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-md">
            <Label htmlFor="enable-2fa" className="text-sm">Enable Two-Factor Authentication</Label>
            <Switch id="enable-2fa" />
          </div>
          <p className="text-xs text-muted-foreground">
            When enabled, you'll be prompted for an OTP from your authenticator app during login. 
            The setup process (QR code, recovery codes) would appear here.
          </p>
          <Button size="sm" variant="outline" disabled>Configure 2FA (Simulated)</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Clock className="w-5 h-5" /> Session Management</CardTitle>
          <CardDescription>Control how long user sessions remain active.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
            <Input id="session-timeout" type="number" defaultValue="60" className="mt-1 w-full sm:w-40" />
            <p className="text-xs text-muted-foreground mt-1">Users will be automatically logged out after this period of inactivity.</p>
          </div>
          <Button size="sm">Save Session Settings (Simulated)</Button>
        </CardContent>
      </Card>
    </div>
  );
}
