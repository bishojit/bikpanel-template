import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Cpu, HardDrive, LineChartIcon, Network, Users, Package, Server as ServerIcon, AlertTriangle } from "lucide-react";
import { KpiCard } from "@/components/shared/KpiCard";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Bar, Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip, Legend as RechartsLegend, ResponsiveContainer } from "recharts";

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


export default function DashboardPage() {
  // TODO: Implement RBAC checks for quick actions and other elements

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-foreground">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KpiCard title="Total Users" value="1,234" icon={<Users className="w-6 h-6 text-primary" />} />
        <KpiCard title="Projects" value="56" icon={<Package className="w-6 h-6 text-primary" />} />
        <KpiCard title="Services Running" value="102" icon={<ServerIcon className="w-6 h-6 text-primary" />} />
        <KpiCard title="Server Alerts" value="3" icon={<AlertTriangle className="w-6 h-6 text-destructive" />} variant="destructive" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Cpu className="w-5 h-5" /> CPU & RAM Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={serverMetricsData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <RechartsLegend />
                  <Line type="monotone" dataKey="cpu" stroke={chartConfig.cpu.color} activeDot={{ r: 8 }} name="CPU (%)" />
                  <Line type="monotone" dataKey="ram" stroke={chartConfig.ram.color} activeDot={{ r: 8 }} name="RAM (%)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><HardDrive className="w-5 h-5" /> Disk & Network Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serverMetricsData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis yAxisId="left" orientation="left" stroke={chartConfig.disk.color} />
                  <YAxis yAxisId="right" orientation="right" stroke={chartConfig.network.color} />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <RechartsLegend />
                  <Bar yAxisId="left" dataKey="disk" fill={chartConfig.disk.color} name="Disk (%)" />
                  <Bar yAxisId="right" dataKey="network" fill={chartConfig.network.color} name="Network (Mbps)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button variant="outline"><ServerIcon className="mr-2 h-4 w-4" /> Deploy Service</Button>
          <Button variant="outline"><Globe className="mr-2 h-4 w-4" /> Add Domain</Button>
          <Button variant="outline"><Users className="mr-2 h-4 w-4" /> Add User</Button>
          <Button variant="destructive"><AlertTriangle className="mr-2 h-4 w-4" /> Restart Server</Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Server Warnings / Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            {/* TODO: Implement alerts list - use Toast for real-time, this is for persistent ones */}
            <ul className="space-y-2">
              <li className="p-3 rounded-md bg-destructive/10 text-destructive-foreground border border-destructive">High CPU usage on server-01</li>
              <li className="p-3 rounded-md bg-muted text-muted-foreground">Disk space running low on backup-volume</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Activity Feed / Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            {/* TODO: Implement activity feed */}
            <ul className="space-y-2 text-sm">
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
