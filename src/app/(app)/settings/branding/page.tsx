
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brush, UploadCloud, Palette } from "lucide-react";

export default function BrandingSettingsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-2 mb-6">
        <Brush className="w-7 h-7 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Branding Settings</h1>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Customize Appearance</CardTitle>
          <CardDescription>Set your custom logo, favicon, and color scheme for the panel.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="logo-upload">Custom Logo</Label>
            <Input id="logo-upload" type="file" className="text-xs" />
            <p className="text-xs text-muted-foreground">Recommended: SVG or PNG, max 2MB.</p>
          </div>
          <div className="space-y-1">
            <Label htmlFor="favicon-upload">Custom Favicon</Label>
            <Input id="favicon-upload" type="file" className="text-xs" />
            <p className="text-xs text-muted-foreground">Recommended: ICO or PNG (32x32px).</p>
          </div>
           <Button size="sm" variant="outline"><UploadCloud className="mr-1.5 h-3.5 w-3.5" /> Upload Assets (Simulated)</Button>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Palette className="w-4 h-4" /> Color Scheme</CardTitle>
          <CardDescription>Select primary and accent colors for the UI.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
           <p className="text-sm text-muted-foreground">
            A color picker or theme selection interface will be available here to customize the panel's primary and accent colors, potentially allowing users to save and manage multiple themes.
            Currently, theme colors are managed in `src/app/globals.css`.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary border-2 border-primary-foreground shadow"></div>
            <span className="text-sm">Primary: Deep Indigo</span>
          </div>
           <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent border-2 border-accent-foreground shadow"></div>
            <span className="text-sm">Accent: Electric Purple</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
