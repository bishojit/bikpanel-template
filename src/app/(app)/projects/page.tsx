import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";

export default function ProjectsPage() {
  // TODO: Implement RBAC check
  // TODO: Implement Project Management UI (List, Create/Edit Form, Assign Users, Link Services, Env Vars)
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-3 mb-8">
        <Package className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Project Management</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Projects List</CardTitle>
          <CardDescription>Manage all your projects.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Project management interface will be displayed here. This includes a list of projects with status indicators, forms for creating/editing projects, assigning users, linking services, and setting environment variables.</p>
          {/* Placeholder for ProjectList, ProjectForm, etc. */}
        </CardContent>
      </Card>
    </div>
  );
}
