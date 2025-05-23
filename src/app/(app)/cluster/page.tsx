import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Network } from "lucide-react";

export default function ClusterPage() {
  // TODO: Implement RBAC check
  // TODO: Implement Cluster Management UI (Add Node, Node List, Sync Status, Load Balancer Rules, Remove Node)
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-3 mb-8">
        <Network className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Cluster Management</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Cluster Overview</CardTitle>
          <CardDescription>Manage your server cluster nodes and configurations.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Cluster management interface will be displayed here. This includes adding nodes, a list of nodes with status, sync status, load balancer rules, and removing nodes.</p>
          {/* Placeholder for AddNodeForm, NodeList, etc. */}
        </CardContent>
      </Card>
    </div>
  );
}
