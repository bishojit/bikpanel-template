
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ServerCog, RotateCcw, Terminal } from "lucide-react";

export default function ServerMaintenancePage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-2 mb-6">
        <ServerCog className="w-7 h-7 text-primary" />
        <h1 className="text-xl font-bold text-foreground">Server Maintenance</h1>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Server Actions</CardTitle>
          <CardDescription>Perform critical server operations.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">Use these actions with caution. Ensure you understand the implications before proceeding.</p>
          <div className="space-x-2">
            <Button variant="destructive" size="sm"><RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Restart Server (Simulated)</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>System Console Access</CardTitle>
          <CardDescription>View system-level console output.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-3 bg-muted rounded-md h-48 overflow-auto">
            <pre className="text-xs text-muted-foreground">
              [SYSTEM LOGS] System console output will appear here...
              [INFO] Server started successfully.
              [WARN] Low disk space on /var.
            </pre>
          </div>
           <Button variant="outline" size="sm" className="mt-3"><Terminal className="mr-1.5 h-3.5 w-3.5" /> Open Full Console (Simulated)</Button>
        </CardContent>
      </Card>
    </div>
  );
}
