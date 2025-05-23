
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Server } from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-6"> {/* py-8 to py-6 */}
      <div className="flex items-center gap-2 mb-6"> {/* gap-3 mb-8 to gap-2 mb-6 */}
        <Server className="w-7 h-7 text-primary" /> {/* w-8 h-8 to w-7 h-7 */}
        <h1 className="text-2xl font-bold text-foreground">Service Management</h1> {/* text-3xl to text-2xl */}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Services List</CardTitle>
          <CardDescription>Manage all deployed services.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Service management interface will be displayed here. This includes a grid/list of services, ability to create services from templates, and a detailed view for each service with tabs for overview, actions, environment variables, resource limits, etc.</p> {/* text-muted-foreground to text-sm text-muted-foreground */}
        </CardContent>
      </Card>
    </div>
  );
}
