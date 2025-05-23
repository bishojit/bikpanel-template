import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github } from "lucide-react";

export default function GitHubSettingsPage() {
  // TODO: Implement RBAC check
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-3 mb-8">
        <Github className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">GitHub Integration</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Connect GitHub</CardTitle>
          <CardDescription>Manage repository connections and auto-deployment settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">GitHub integration settings interface will be displayed here.</p>
          {/* Placeholder for GitHub integration settings form elements */}
        </CardContent>
      </Card>
    </div>
  );
}
