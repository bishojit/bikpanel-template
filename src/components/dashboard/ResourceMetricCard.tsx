
"use client";

import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import type { LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SparklineDataPoint {
  name: string;
  value: number;
}

interface ResourceMetricCardProps {
  title: string;
  iconComponent: React.ElementType<LucideProps>;
  valueDisplay: string;
  // ringPercentage: number; // 0-100 - Removed
  sparklineData: SparklineDataPoint[];
  footerInfo1: string;
  footerInfo2?: string; // For network card's upload value
  footerIcon1?: React.ElementType<LucideProps>;
  footerIcon2?: React.ElementType<LucideProps>;
  themeName: "orange" | "blue" | "green" | "purple";
}

const themeStyles = {
  orange: {
    cardBg: "bg-orange-50/70 dark:bg-orange-900/30",
    iconItself: "text-orange-500",
    valueText: "text-orange-600 dark:text-orange-400",
    sparklineStroke: "stroke-orange-500",
  },
  blue: {
    cardBg: "bg-blue-50/70 dark:bg-blue-900/30",
    iconItself: "text-blue-500",
    valueText: "text-blue-600 dark:text-blue-400",
    sparklineStroke: "stroke-blue-500",
  },
  green: {
    cardBg: "bg-green-50/70 dark:bg-green-900/30",
    iconItself: "text-green-600",
    valueText: "text-green-700 dark:text-green-500",
    sparklineStroke: "stroke-green-600",
  },
  purple: {
    cardBg: "bg-purple-50/70 dark:bg-purple-900/30",
    iconItself: "text-purple-500",
    valueText: "text-purple-600 dark:text-purple-400",
    sparklineStroke: "stroke-purple-500",
  },
};

export function ResourceMetricCard({
  title,
  iconComponent: Icon,
  valueDisplay,
  // ringPercentage, // Removed
  sparklineData,
  footerInfo1,
  footerInfo2,
  footerIcon1: FooterIcon1,
  footerIcon2: FooterIcon2,
  themeName,
}: ResourceMetricCardProps) {
  const styles = themeStyles[themeName];

  return (
    <Card className={cn("p-3 rounded-lg shadow-md flex flex-col justify-between", styles.cardBg)}>
      <div>
        <div className="flex items-center space-x-1.5 mb-0.5">
          <Icon size={16} className={styles.iconItself} />
          <p className="text-xs font-medium text-muted-foreground">{title}</p>
        </div>

        <div className={cn("text-2xl font-bold mb-0.5", styles.valueText)}>
          {valueDisplay}
        </div>

        <div className="h-10 mt-1 mb-1"> {/* Adjusted margins for sparkline */}
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparklineData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
              <Line
                type="monotone"
                dataKey="value"
                className={styles.sparklineStroke}
                strokeWidth={1.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="text-xs text-muted-foreground mt-auto"> {/* Ensures footer is at the bottom */}
        {FooterIcon1 && FooterIcon2 && footerInfo2 ? ( // Special layout for Network
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              <FooterIcon1 size={12} className="inline mr-0.5" />
              {footerInfo1}
            </span>
            <span className="flex items-center">
              <FooterIcon2 size={12} className="inline mr-0.5" />
              {footerInfo2}
            </span>
          </div>
        ) : (
          footerInfo1
        )}
      </div>
    </Card>
  );
}
