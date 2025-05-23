
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReactNode } from "react";

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  variant?: "default" | "destructive";
}

export function KpiCard({ title, value, icon, description, variant = "default" }: KpiCardProps) {
  return (
    <Card className={variant === "destructive" ? "border-destructive bg-destructive/10" : ""}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1"> {/* pb-2 to pb-1 */}
        <CardTitle className={`text-xs font-medium ${variant === "destructive" ? "text-destructive-foreground" : "text-muted-foreground"}`}> {/* text-sm to text-xs */}
          {title}
        </CardTitle>
        {icon} {/* Icon size controlled by usage, e.g. w-5 h-5 */}
      </CardHeader>
      <CardContent>
        <div className={`text-xl font-bold ${variant === "destructive" ? "text-destructive-foreground" : "text-foreground"}`}> {/* text-2xl to text-xl */}
          {value}
        </div>
        {description && (
          <p className={`text-xs ${variant === "destructive" ? "text-destructive-foreground/80" : "text-muted-foreground"}`}>
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
