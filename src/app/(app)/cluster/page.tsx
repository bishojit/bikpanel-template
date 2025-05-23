
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Network } from "lucide-react";

export default function ClusterPage() {
  return (
    <div className="container mx-auto py-6"> {/* py-8 to py-6 */}
      <div className="flex items-center gap-2 mb-6"> {/* gap-3 mb-8 to gap-2 mb-6 */}
        <Network className="w-7 h-7 text-primary" /> {/* w-8 h-8 to w-7 h-7 */}
        <h1 className="text-2xl font-bold text-foreground">Cluster Management</h1> {/* text-3xl to text-2xl */}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Cluster Overview</CardTitle>
          <CardDescription>Manage your server cluster nodes and configurations.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Cluster management interface will be displayed here. This includes adding nodes, a list of nodes with status, sync status, load balancer rules, and removing nodes.</p> {/* text-muted-foreground to text-sm text-muted-foreground */}
        </CardContent>
      </Card>
    </div>
  );
}
