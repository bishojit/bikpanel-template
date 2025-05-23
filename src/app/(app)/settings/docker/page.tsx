
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Combine, Trash2, FileText } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";


export default function DockerSettingsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-2 mb-6">
        <Combine className="w-7 h-7 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Docker Settings</h1>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Global Docker Configuration</CardTitle>
          <CardDescription>Manage Docker system-wide settings and perform cleanup operations.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="logging-level" className="text-xs">System Logging Level</Label>
            <Select defaultValue="info">
              <SelectTrigger id="logging-level" className="w-full sm:w-[200px] mt-1">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="debug">Debug</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warn">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-1.5">Maintenance Operations</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm"><Trash2 className="mr-1.5 h-3.5 w-3.5" /> System Prune</Button>
              <Button variant="outline" size="sm"><Trash2 className="mr-1.5 h-3.5 w-3.5" /> Builder Cleanup</Button>
              <Button variant="outline" size="sm"><Trash2 className="mr-1.5 h-3.5 w-3.5" /> Image Cleanup</Button>
            </div>
          </div>

          <p className="text-xs text-muted-foreground pt-2">
            For intelligent, AI-powered cleanup suggestions, visit the <Link href="/docker/cleanup" className="text-primary hover:underline">Docker Cleanup</Link> page.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><FileText className="w-4 h-4"/> Docker Activity Logs</CardTitle>
          <CardDescription>Review recent Docker system activity.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-3 bg-muted rounded-md h-40 overflow-auto">
            <pre className="text-xs text-muted-foreground">
              [Docker Daemon] Listening on /var/run/docker.sock
              [Docker Daemon] Image pull: ubuntu:latest complete.
              [Docker Daemon] Container created: my-web-app
              [Docker Daemon] Container started: my-web-app
            </pre>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Full Docker activity logs and filtering will be available here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
