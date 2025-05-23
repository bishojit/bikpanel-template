
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ShieldAlert, Mail, Bell } from "lucide-react";

export default function NotificationSettingsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-2 mb-6">
        <ShieldAlert className="w-7 h-7 text-primary" />
        <h1 className="text-xl font-bold text-foreground">Notification Configuration</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Notifications</CardTitle>
          <CardDescription>Configure how you receive alerts and notifications from BikPanel Lite.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-base font-medium mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" /> Email Notifications
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-md">
                <Label htmlFor="email-server-alerts" className="text-sm">Server Alerts (High CPU, Low Disk)</Label>
                <Switch id="email-server-alerts" defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <Label htmlFor="email-deployment-status" className="text-sm">Deployment Status Updates</Label>
                <Switch id="email-deployment-status" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <Label htmlFor="email-security-events" className="text-sm">Security Events (New Logins)</Label>
                <Switch id="email-security-events" defaultChecked />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base font-medium mb-2 flex items-center gap-2">
              <Bell className="w-4 h-4 text-muted-foreground" /> Web Push Notifications
            </h3>
             <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-md">
                <Label htmlFor="webpush-server-alerts" className="text-sm">Server Alerts</Label>
                <Switch id="webpush-server-alerts" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <Label htmlFor="webpush-important-updates" className="text-sm">Important System Updates</Label>
                <Switch id="webpush-important-updates" defaultChecked />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Web Push notifications require browser permission. Actual implementation would involve service workers and a push notification service.
            </p>
          </div>
           <p className="text-sm text-muted-foreground pt-2">
            This interface allows enabling/disabling various notification types via email or web push.
            Further customization like notification frequency or specific event triggers would be part of a more advanced setup.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
