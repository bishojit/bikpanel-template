
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const settingsCategories = [
    { title: "General Settings", href: "/settings/general", description: "Basic application configurations." },
    { title: "Docker Settings", href: "/settings/docker", description: "Global Docker configurations and cleanup tools." },
    { title: "Authentication", href: "/settings/auth", description: "Manage 2FA, session timeouts, etc." },
    { title: "Notifications", href: "/settings/notifications", description: "Configure email and web push notifications." },
    { title: "Branding", href: "/settings/branding", description: "Customize logo, favicon, and color scheme." },
    { title: "GitHub Integration", href: "/settings/github", description: "Connect repositories and manage auto-deploy." },
  ];

  return (
    <div className="container mx-auto py-6"> {/* py-8 to py-6 */}
      <div className="flex items-center gap-2 mb-6"> {/* gap-3 mb-8 to gap-2 mb-6 */}
        <Settings className="w-7 h-7 text-primary" /> {/* w-8 h-8 to w-7 h-7 */}
        <h1 className="text-2xl font-bold text-foreground">Server Settings</h1> {/* text-3xl to text-2xl */}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
          <CardDescription>Manage global settings for your BikPanel Lite instance.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3"> {/* space-y-4 to space-y-3 */}
          <p className="text-sm text-muted-foreground">Select a category below to configure specific settings. This section will allow management of Docker global settings, system logging, server restarts, GitHub integration, branding, notifications, authentication, license, and initial cluster setup.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"> {/* gap-4 to gap-3 */}
            {settingsCategories.map(cat => (
              <Link href={cat.href} key={cat.href} passHref>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-base">{cat.title}</CardTitle> {/* text-lg to text-base */}
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">{cat.description}</p> {/* text-sm to text-xs */}
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
