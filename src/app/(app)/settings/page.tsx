
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Combine, KeyRound, ShieldAlert, Brush, Github, ServerCog, Network } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const settingsCategories = [
    { title: "General Settings", href: "/settings/general", icon: Settings, description: "Basic application configurations." },
    { title: "Server Maintenance", href: "/settings/server", icon: ServerCog, description: "Restart server, access system console." },
    { title: "Docker Settings", href: "/settings/docker", icon: Combine, description: "Global Docker configurations and cleanup tools." },
    { title: "Security Settings", href: "/settings/auth", icon: KeyRound, description: "Manage 2FA, session timeouts, etc." },
    { title: "Notification Settings", href: "/settings/notifications", icon: ShieldAlert, description: "Configure email and web push notifications." },
    { title: "Branding Setup", href: "/settings/branding", icon: Brush, description: "Customize logo, favicon, and color scheme." },
    { title: "GitHub Integration", href: "/settings/github", icon: Github, description: "Connect repositories and manage auto-deploy." },
    { title: "Cluster Setup", href: "/cluster", icon: Network, description: "Manage cluster nodes and configurations." },
    { title: "License Setup", href: "/license", icon: KeyRound, description: "Manage your BikPanel Lite license." },
  ];

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-7 h-7 text-primary" />
        <h1 className="text-xl font-bold text-foreground">Server Settings</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
          <CardDescription>Manage global settings for your BikPanel Lite instance.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xs text-muted-foreground">Select a category below to configure specific settings. This section covers Docker global settings, system logging, server restarts, GitHub integration, branding, notifications, authentication, license, and cluster setup.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {settingsCategories.map(cat => (
              <Link href={cat.href} key={cat.href} passHref>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      {cat.icon && <cat.icon className="w-4 h-4" />} 
                      {cat.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">{cat.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
