
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Combine, Trash2 } from "lucide-react";
import Link from "next/link";

export default function DockerSettingsPage() {
  return (
    <div className="container mx-auto py-6"> {/* py-8 to py-6 */}
      <div className="flex items-center gap-2 mb-6"> {/* gap-3 mb-8 to gap-2 mb-6 */}
        <Combine className="w-7 h-7 text-primary" /> {/* w-8 h-8 to w-7 h-7 */}
        <h1 className="text-2xl font-bold text-foreground">Docker Settings</h1> {/* text-3xl to text-2xl */}
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Global Docker Configuration</CardTitle>
          <CardDescription>Manage Docker system-wide settings and perform cleanup operations.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3"> {/* space-y-4 to space-y-3 */}
          <p className="text-sm text-muted-foreground">Configure global Docker settings, manage build caches, and perform system-wide cleanup operations.</p>
          <div className="space-x-2">
            <Button variant="outline" size="sm"><Trash2 className="mr-1.5 h-3.5 w-3.5" /> System Prune</Button> {/* size="sm", icon adjusted */}
            <Button variant="outline" size="sm"><Trash2 className="mr-1.5 h-3.5 w-3.5" /> Builder Cleanup</Button>
            <Button variant="outline" size="sm"><Trash2 className="mr-1.5 h-3.5 w-3.5" /> Image Cleanup</Button>
          </div>
          <p className="text-xs text-muted-foreground pt-3"> {/* text-sm to text-xs, pt-4 to pt-3 */}
            For intelligent, AI-powered cleanup suggestions, visit the <Link href="/docker/cleanup" className="text-primary hover:underline">Docker Cleanup</Link> page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
