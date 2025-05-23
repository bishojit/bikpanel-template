
import { DockerCleanupClient } from "@/components/docker/DockerCleanupClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Trash2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function DockerCleanupPage() {
  return (
    <div className="container mx-auto py-6"> {/* py-8 to py-6 */}
      <div className="flex items-center justify-between mb-6"> {/* mb-8 to mb-6 */}
        <div className="flex items-center gap-2"> {/* gap-3 to gap-2 */}
          <Trash2 className="w-7 h-7 text-primary" /> {/* w-8 h-8 to w-7 h-7 */}
          <h1 className="text-2xl font-bold text-foreground">Intelligent Docker Cleanup</h1> {/* text-3xl to text-2xl */}
        </div>
      </div>
      
      <Card className="mb-4"> {/* mb-6 to mb-4 */}
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

      <Alert variant="default" className="bg-accent/10 border-accent text-accent-foreground text-xs"> {/* Added text-xs */}
        <AlertCircle className="h-3.5 w-3.5 !text-accent" /> {/* h-4 w-4 to h-3.5 w-3.5 */}
        <AlertTitle className="text-sm">Important Note</AlertTitle> {/* Added text-sm to AlertTitle */}
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
