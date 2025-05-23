
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";

export default function DomainsPage() {
  return (
    <div className="container mx-auto py-6"> {/* py-8 to py-6 */}
      <div className="flex items-center gap-2 mb-6"> {/* gap-3 mb-8 to gap-2 mb-6 */}
        <Globe className="w-7 h-7 text-primary" /> {/* w-8 h-8 to w-7 h-7 */}
        <h1 className="text-2xl font-bold text-foreground">Domain Management</h1> {/* text-3xl to text-2xl */}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Domains List</CardTitle>
          <CardDescription>Manage all your domains and DNS settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Domain management interface will be displayed here. This includes a table of domains, forms for adding/editing domains, SSL setup, DNS record checks, and redirection management.</p> {/* text-muted-foreground to text-sm text-muted-foreground */}
        </CardContent>
      </Card>
    </div>
  );
}
