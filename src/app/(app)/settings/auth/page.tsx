import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound } from "lucide-react";

export default function AuthSettingsPage() {
  // TODO: Implement RBAC check
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-3 mb-8">
        <KeyRound className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Authentication Settings</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Security & Authentication</CardTitle>
          <CardDescription>Manage authentication methods, 2FA, and session settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Authentication settings interface will be displayed here. (e.g., Enable/Disable 2FA, Session timeout settings).</p>
          {/* Placeholder for auth settings form elements */}
        </CardContent>
      </Card>
    </div>
  );
}
