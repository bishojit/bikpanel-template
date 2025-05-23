
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github } from "lucide-react";

export default function GitHubSettingsPage() {
  return (
    <div className="container mx-auto py-6"> {/* py-8 to py-6 */}
      <div className="flex items-center gap-2 mb-6"> {/* gap-3 mb-8 to gap-2 mb-6 */}
        <Github className="w-7 h-7 text-primary" /> {/* w-8 h-8 to w-7 h-7 */}
        <h1 className="text-2xl font-bold text-foreground">GitHub Integration</h1> {/* text-3xl to text-2xl */}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Connect GitHub</CardTitle>
          <CardDescription>Manage repository connections and auto-deployment settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">GitHub integration settings interface will be displayed here.</p> {/* text-muted-foreground to text-sm text-muted-foreground */}
        </CardContent>
      </Card>
    </div>
  );
}
