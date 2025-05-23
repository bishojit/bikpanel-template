
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, PlusCircle, LinkIcon, ToggleRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function GitHubSettingsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-2 mb-6">
        <Github className="w-7 h-7 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">GitHub Integration</h1>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Connect GitHub Account</CardTitle>
          <CardDescription>Securely link your GitHub account to enable repository access and auto-deployments.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label htmlFor="github-token">GitHub API Token</Label>
            <Input id="github-token" type="password" placeholder="Enter your GitHub Personal Access Token" />
            <p className="text-xs text-muted-foreground mt-1">Your token is stored securely. Ensure it has `repo` scope.</p>
          </div>
          <Button size="sm"><LinkIcon className="mr-1.5 h-3.5 w-3.5" /> Connect GitHub (Simulated)</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Repository Management</CardTitle>
          <CardDescription>Add repositories and configure auto-deployment settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <p className="text-sm text-muted-foreground">
            GitHub integration for repository linking and auto-deployment settings will be configured here. 
            This includes adding repositories, setting up webhooks, and toggling auto-deploy for specific branches.
          </p>
          <div className="space-y-2">
            <Button variant="outline" size="sm"><PlusCircle className="mr-1.5 h-3.5 w-3.5" /> Add Repository (Simulated)</Button>
            {/* Example of a listed repository */}
            <div className="p-3 border rounded-md flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">example/my-awesome-app</p>
                <p className="text-xs text-muted-foreground">Branch: main</p>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="auto-deploy-switch" className="text-xs">Auto-deploy</Label>
                <Switch id="auto-deploy-switch" defaultChecked />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
