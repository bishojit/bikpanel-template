
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cpu, Users, Server as ServerIcon, AlertTriangle, Globe, MemoryStick, Disc3, Gauge, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { ResourceMetricCard } from '@/components/dashboard/ResourceMetricCard';

const generateSparklineData = () => {
  return Array.from({ length: 10 }, (_, i) => ({
    name: `t${i}`,
    value: Math.floor(Math.random() * 80) + 10,
  }));
};


export default function DashboardPage() {
  const cpuSparkline = generateSparklineData();
  const memorySparkline = generateSparklineData();
  const diskSparkline = generateSparklineData();
  const networkSparkline = generateSparklineData();

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-xl font-bold mb-6 text-foreground">Dashboard Overview</h1>

      {/* Updated Resource Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <ResourceMetricCard
          title="CPU"
          iconComponent={Cpu}
          valueDisplay="34.28%"
          sparklineData={cpuSparkline}
          footerInfo1="Load 0.04, 0.02, 0.00"
          themeName="orange"
        />
        <ResourceMetricCard
          title="Memory"
          iconComponent={MemoryStick}
          valueDisplay="24.47%"
          sparklineData={memorySparkline}
          footerInfo1="Used 3.4 GB / 30 GB"
          themeName="blue"
        />
        <ResourceMetricCard
          title="Disk"
          iconComponent={Disc3}
          valueDisplay="12.75%"
          sparklineData={diskSparkline}
          footerInfo1="Used 39.7 GB / 1024 GB"
          themeName="green"
        />
        <ResourceMetricCard
          title="Network"
          iconComponent={Gauge}
          valueDisplay="0.24 / 2.75 Mbps"
          sparklineData={networkSparkline}
          footerInfo1="0.24 MB"
          footerInfo2="2.75 MB"
          footerIcon1={ArrowDownToLine}
          footerIcon2={ArrowUpFromLine}
          themeName="purple"
        />
      </div>

      {/* Graphs have been moved to /metrics page */}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm"><ServerIcon className="mr-1.5 h-3.5 w-3.5" /> Deploy Service</Button>
          <Button variant="outline" size="sm"><Globe className="mr-1.5 h-3.5 w-3.5" /> Add Domain</Button>
          <Button variant="outline" size="sm"><Users className="mr-1.5 h-3.5 w-3.5" /> Add User</Button>
          <Button variant="destructive" size="sm"><AlertTriangle className="mr-1.5 h-3.5 w-3.5" /> Restart Server</Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card>
          <CardHeader>
            <CardTitle>Server Warnings / Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="p-2 rounded-md bg-destructive/10 text-destructive dark:text-destructive-foreground border border-destructive text-sm">High CPU usage on server-01</li>
              <li className="p-2 rounded-md bg-muted text-muted-foreground text-sm">Disk space running low on backup-volume</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Activity Feed / Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-xs">
              <li>User 'john.doe' logged in.</li>
              <li>Project 'WebApp' deployed successfully.</li>
              <li>Service 'RedisCache' restarted.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
