import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  // TODO: Implement RBAC check
  // TODO: Implement Server Settings UI (Docker Global Settings, Logging, Restart, GitHub, Branding, Notifications, Auth, License, Cluster Setup)
  
  const settingsCategories = [
    { title: "General Settings", href: "/settings/general", description: "Basic application configurations." },
    { title: "Docker Settings", href: "/settings/docker", description: "Global Docker configurations and cleanup tools." },
    { title: "Authentication", href: "/settings/auth", description: "Manage 2FA, session timeouts, etc." },
    { title: "Notifications", href: "/settings/notifications", description: "Configure email and web push notifications." },
    { title: "Branding", href: "/settings/branding", description: "Customize logo, favicon, and color scheme." },
    { title: "GitHub Integration", href: "/settings/github", description: "Connect repositories and manage auto-deploy." },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-3 mb-8">
        <Settings className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Server Settings</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
          <CardDescription>Manage global settings for your BikPanel Lite instance.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">Select a category below to configure specific settings. This section will allow management of Docker global settings, system logging, server restarts, GitHub integration, branding, notifications, authentication, license, and initial cluster setup.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {settingsCategories.map(cat => (
              <Link href={cat.href} key={cat.href} passHref>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{cat.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{cat.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
           {/* Placeholder for specific settings sections */}
        </CardContent>
      </Card>
    </div>
  );
}
