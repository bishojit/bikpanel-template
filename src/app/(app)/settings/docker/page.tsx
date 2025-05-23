import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Combine, Trash2 } from "lucide-react";
import Link from "next/link";

export default function DockerSettingsPage() {
  // RBAC checks would be implemented here in a real application.
  // Docker global settings UI (System Prune, Builder Cleanup, Image Cleanup buttons, etc.) is partially implemented with placeholder buttons.
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-3 mb-8">
        <Combine className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Docker Settings</h1>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Global Docker Configuration</CardTitle>
          <CardDescription>Manage Docker system-wide settings and perform cleanup operations.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">Configure global Docker settings, manage build caches, and perform system-wide cleanup operations.</p>
          <div className="space-x-2">
            <Button variant="outline"><Trash2 className="mr-2 h-4 w-4" /> System Prune</Button>
            <Button variant="outline"><Trash2 className="mr-2 h-4 w-4" /> Builder Cleanup</Button>
            <Button variant="outline"><Trash2 className="mr-2 h-4 w-4" /> Image Cleanup</Button>
          </div>
          <p className="text-sm text-muted-foreground pt-4">
            For intelligent, AI-powered cleanup suggestions, visit the <Link href="/docker/cleanup" className="text-primary hover:underline">Docker Cleanup</Link> page.
          </p>
          {/* Placeholder for other Docker settings */}
        </CardContent>
      </Card>
    </div>
  );
}
