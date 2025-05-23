
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound } from "lucide-react"; 

export default function LicensePage() {
  return (
    <div className="container mx-auto py-6"> {/* py-8 to py-6 */}
      <div className="flex items-center gap-2 mb-6"> {/* gap-3 mb-8 to gap-2 mb-6 */}
        <KeyRound className="w-7 h-7 text-primary" /> {/* w-8 h-8 to w-7 h-7 */}
        <h1 className="text-xl font-bold text-foreground">License Management</h1> {/* text-2xl to text-xl */}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>License Details</CardTitle>
          <CardDescription>Manage your BikPanel Lite license.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">License management interface will be displayed here. This includes uploading a license key, displaying license information (expiry, type, features), alerts for expiry, and feature-based access control UI.</p> {/* text-muted-foreground to text-sm text-muted-foreground */}
        </CardContent>
      </Card>
    </div>
  );
}
