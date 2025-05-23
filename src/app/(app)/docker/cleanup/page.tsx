import { DockerCleanupClient } from "@/components/docker/DockerCleanupClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Trash2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function DockerCleanupPage() {
  // RBAC checks (e.g. only admin/operator access) would be implemented here in a real application.

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Trash2 className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Intelligent Docker Cleanup</h1>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Analyze Docker Environment</CardTitle>
          <CardDescription>
            Provide lists of your current Docker images, containers, and volumes.
            The AI will analyze them and suggest items that might be obsolete and safe to remove.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DockerCleanupClient />
        </CardContent>
      </Card>

      <Alert variant="default" className="bg-accent/10 border-accent text-accent-foreground">
        <AlertCircle className="h-4 w-4 !text-accent" />
        <AlertTitle>Important Note</AlertTitle>
        <AlertDescription>
          The AI provides suggestions based on the names and simulated context. 
          Always review suggestions carefully before performing any cleanup operations. 
          BikPanel Lite is not responsible for any data loss due to incorrect cleanup.
          You must confirm each operation.
        </AlertDescription>
      </Alert>
    </div>
  );
}
