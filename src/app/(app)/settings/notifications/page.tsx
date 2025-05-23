
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";

export default function NotificationSettingsPage() {
  return (
    <div className="container mx-auto py-6"> {/* py-8 to py-6 */}
      <div className="flex items-center gap-2 mb-6"> {/* gap-3 mb-8 to gap-2 mb-6 */}
        <ShieldAlert className="w-7 h-7 text-primary" /> {/* w-8 h-8 to w-7 h-7 */}
        <h1 className="text-2xl font-bold text-foreground">Notification Settings</h1> {/* text-3xl to text-2xl */}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Alerts & Notifications</CardTitle>
          <CardDescription>Configure how you receive notifications (email, web push).</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Notification settings interface will be displayed here.</p> {/* text-muted-foreground to text-sm text-muted-foreground */}
        </CardContent>
      </Card>
    </div>
  );
}
