
"use client";

import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import type { LucideProps } from 'lucide-react';

interface SparklineDataPoint {
  name: string;
  value: number;
}

interface ResourceMetricCardProps {
  title: string;
  iconComponent: React.ElementType<LucideProps>;
  valueDisplay: string;
  ringPercentage: number; // 0-100
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
    iconRing: "text-orange-500",
    iconItself: "text-orange-500",
    valueText: "text-orange-600 dark:text-orange-400",
    sparklineStroke: "stroke-orange-500",
  },
  blue: {
    cardBg: "bg-blue-50/70 dark:bg-blue-900/30",
    iconRing: "text-blue-500",
    iconItself: "text-blue-500",
    valueText: "text-blue-600 dark:text-blue-400",
    sparklineStroke: "stroke-blue-500",
  },
  green: {
    cardBg: "bg-green-50/70 dark:bg-green-900/30",
    iconRing: "text-green-600",
    iconItself: "text-green-600",
    valueText: "text-green-700 dark:text-green-500",
    sparklineStroke: "stroke-green-600",
  },
  purple: {
    cardBg: "bg-purple-50/70 dark:bg-purple-900/30",
    iconRing: "text-purple-500",
    iconItself: "text-purple-500",
    valueText: "text-purple-600 dark:text-purple-400",
    sparklineStroke: "stroke-purple-500",
  },
};

export function ResourceMetricCard({
  title,
  iconComponent: Icon,
  valueDisplay,
  ringPercentage,
  sparklineData,
  footerInfo1,
  footerInfo2,
  footerIcon1: FooterIcon1,
  footerIcon2: FooterIcon2,
  themeName,
}: ResourceMetricCardProps) {
  const styles = themeStyles[themeName];
  const circumference = 2 * Math.PI * 15.9155; // 2 * pi * radius

  return (
    <Card className={`p-3 rounded-lg shadow-md ${styles.cardBg}`}>
      <div className="flex items-start justify-between mb-1">
        <div className="flex items-center space-x-1.5">
          <div className="relative w-8 h-8">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className="text-gray-200 dark:text-gray-700/50"
                strokeWidth="2.5"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={styles.iconRing}
                strokeWidth="2.5"
                fill="none"
                strokeDasharray={`${(ringPercentage / 100) * circumference}, ${circumference}`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                transform="rotate(-90 18 18)" // Start the ring from the top
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon size={14} className={styles.iconItself} />
            </div>
          </div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{title}</p>
        </div>
      </div>

      <div className={`text-xl font-bold mb-1 ${styles.valueText}`}>
        {valueDisplay}
      </div>

      <div className="h-10 mb-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sparklineData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
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

      <div className="text-xs text-gray-500 dark:text-gray-400">
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
