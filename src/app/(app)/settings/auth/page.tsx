
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound } from "lucide-react";

export default function AuthSettingsPage() {
  return (
    <div className="container mx-auto py-6"> {/* py-8 to py-6 */}
      <div className="flex items-center gap-2 mb-6"> {/* gap-3 mb-8 to gap-2 mb-6 */}
        <KeyRound className="w-7 h-7 text-primary" /> {/* w-8 h-8 to w-7 h-7 */}
        <h1 className="text-2xl font-bold text-foreground">Authentication Settings</h1> {/* text-3xl to text-2xl */}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Security & Authentication</CardTitle>
          <CardDescription>Manage authentication methods, 2FA, and session settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Authentication settings interface will be displayed here. (e.g., Enable/Disable 2FA, Session timeout settings).</p> {/* text-muted-foreground to text-sm text-muted-foreground */}
        </CardContent>
      </Card>
    </div>
  );
}
