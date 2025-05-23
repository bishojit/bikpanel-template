
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cpu, HardDrive, Users, Package, Server as ServerIcon, AlertTriangle, Globe, MemoryStick, Disc3, Gauge, ArrowDownToLine, ArrowUpFromLine } from "lucide-react"; // Added MemoryStick, Disc3, Gauge, ArrowDownToLine, ArrowUpFromLine
// Removed KpiCard import
import {
  ChartContainer,
  ChartLegendContent, // Keep if used by larger charts, otherwise remove
} from "@/components/ui/chart";
import { Bar, Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip, Legend as RechartsLegend, BarChart as RechartsBarChart } from "recharts";
import { ResourceMetricCard } from '@/components/dashboard/ResourceMetricCard'; // Import new card

// Sample data for charts - replace with real data fetching
const serverMetricsData = [
  { name: '10min ago', cpu: 65, ram: 70, disk: 40, network: 120 },
  { name: '8min ago', cpu: 68, ram: 72, disk: 41, network: 150 },
  { name: '6min ago', cpu: 70, ram: 68, disk: 42, network: 130 },
  { name: '4min ago', cpu: 60, ram: 75, disk: 42, network: 160 },
  { name: '2min ago', cpu: 75, ram: 78, disk: 43, network: 140 },
  { name: 'Now', cpu: 72, ram: 76, disk: 44, network: 155 },
];

const chartConfig = {
  cpu: { label: "CPU Usage (%)", color: "hsl(var(--chart-1))" },
  ram: { label: "RAM Usage (%)", color: "hsl(var(--chart-2))" },
  disk: { label: "Disk Usage (%)", color: "hsl(var(--chart-3))" },
  network: { label: "Network (Mbps)", color: "hsl(var(--chart-4))" },
};

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
          // ringPercentage={34.28} // Removed
          sparklineData={cpuSparkline}
          footerInfo1="Load 0.04, 0.02, 0.00"
          themeName="orange"
        />
        <ResourceMetricCard
          title="Memory"
          iconComponent={MemoryStick}
          valueDisplay="24.47%"
          // ringPercentage={24.47} // Removed
          sparklineData={memorySparkline}
          footerInfo1="Used 3.4 GB / 30 GB"
          themeName="blue"
        />
        <ResourceMetricCard
          title="Disk"
          iconComponent={Disc3}
          valueDisplay="12.75%"
          // ringPercentage={12.75} // Removed
          sparklineData={diskSparkline}
          footerInfo1="Used 39.7 GB / 1024 GB"
          themeName="green"
        />
        <ResourceMetricCard
          title="Network"
          iconComponent={Gauge}
          valueDisplay="0.24 / 2.75 Mbps"
          // ringPercentage={10} // Removed
          sparklineData={networkSparkline}
          footerInfo1="0.24 MB"
          footerInfo2="2.75 MB"
          footerIcon1={ArrowDownToLine}
          footerIcon2={ArrowUpFromLine}
          themeName="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Cpu className="w-3.5 h-3.5" /> CPU & RAM Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <LineChart data={serverMetricsData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10}/>
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10}/>
                <RechartsTooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <RechartsLegend wrapperStyle={{fontSize: "0.75rem"}} />
                <Line type="monotone" dataKey="cpu" stroke={chartConfig.cpu.color} activeDot={{ r: 6 }} name="CPU (%)" strokeWidth={2} />
                <Line type="monotone" dataKey="ram" stroke={chartConfig.ram.color} activeDot={{ r: 6 }} name="RAM (%)" strokeWidth={2}/>
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><HardDrive className="w-3.5 h-3.5" /> Disk & Network Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <RechartsBarChart data={serverMetricsData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10}/>
                <YAxis yAxisId="left" orientation="left" stroke={chartConfig.disk.color} fontSize={10}/>
                <YAxis yAxisId="right" orientation="right" stroke={chartConfig.network.color} fontSize={10}/>
                <RechartsTooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <RechartsLegend wrapperStyle={{fontSize: "0.75rem"}}/>
                <Bar yAxisId="left" dataKey="disk" fill={chartConfig.disk.color} name="Disk (%)" barSize={15} />
                <Bar yAxisId="right" dataKey="network" fill={chartConfig.network.color} name="Network (Mbps)" barSize={15}/>
              </RechartsBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

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
              <li className="p-2 rounded-md bg-destructive/10 text-destructive border border-destructive text-sm">High CPU usage on server-01</li>
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

