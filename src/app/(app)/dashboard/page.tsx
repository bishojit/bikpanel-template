
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cpu, HardDrive, Users, Package, Server as ServerIcon, AlertTriangle, Globe } from "lucide-react";
import { KpiCard } from "@/components/shared/KpiCard";
import {
  ChartContainer,
} from "@/components/ui/chart";
import { Bar, Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip, Legend as RechartsLegend, BarChart as RechartsBarChart } from "recharts";

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
  return (
    <div className="container mx-auto py-6"> {/* py-8 to py-6 */}
      <h1 className="text-xl font-bold mb-6 text-foreground">Dashboard Overview</h1> {/* text-2xl to text-xl */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"> {/* gap-6 mb-8 to gap-4 mb-6 */}
        <KpiCard title="Total Users" value="1,234" icon={<Users className="w-5 h-5 text-primary" />} /> {/* w-6 h-6 to w-5 h-5 */}
        <KpiCard title="Projects" value="56" icon={<Package className="w-5 h-5 text-primary" />} /> {/* w-6 h-6 to w-5 h-5 */}
        <KpiCard title="Services Running" value="102" icon={<ServerIcon className="w-5 h-5 text-primary" />} /> {/* w-6 h-6 to w-5 h-5 */}
        <KpiCard title="Server Alerts" value="3" icon={<AlertTriangle className="w-5 h-5 text-destructive" />} variant="destructive" /> {/* w-6 h-6 to w-5 h-5 */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6"> {/* gap-6 mb-8 to gap-4 mb-6 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Cpu className="w-4 h-4" /> CPU & RAM Usage</CardTitle> {/* w-5 h-5 to w-4 h-4 */}
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full"> {/* h-[300px] to h-[250px] */}
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
            <CardTitle className="flex items-center gap-2"><HardDrive className="w-4 h-4" /> Disk & Network Usage</CardTitle> {/* w-5 h-5 to w-4 h-4 */}
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full"> {/* h-[300px] to h-[250px] */}
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

      <Card className="mb-6"> {/* mb-8 to mb-6 */}
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2"> {/* gap-4 to gap-2 */}
          <Button variant="outline" size="sm"><ServerIcon className="mr-1.5 h-3.5 w-3.5" /> Deploy Service</Button> {/* Button size sm, icon size adjusted */}
          <Button variant="outline" size="sm"><Globe className="mr-1.5 h-3.5 w-3.5" /> Add Domain</Button>
          <Button variant="outline" size="sm"><Users className="mr-1.5 h-3.5 w-3.5" /> Add User</Button>
          <Button variant="destructive" size="sm"><AlertTriangle className="mr-1.5 h-3.5 w-3.5" /> Restart Server</Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* gap-6 to gap-4 */}
        <Card>
          <CardHeader>
            <CardTitle>Server Warnings / Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="p-2 rounded-md bg-destructive/10 text-destructive border border-destructive text-sm">High CPU usage on server-01</li> {/* p-3 to p-2, added text-sm */}
              <li className="p-2 rounded-md bg-muted text-muted-foreground text-sm">Disk space running low on backup-volume</li> {/* p-3 to p-2, added text-sm */}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Activity Feed / Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-xs"> {/* space-y-2 to space-y-1, text-sm to text-xs */}
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
