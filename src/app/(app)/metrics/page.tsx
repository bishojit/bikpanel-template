
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu, HardDrive } from "lucide-react";
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

export default function MetricsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-xl font-bold mb-6 text-foreground">Server Performance Metrics</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
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
    </div>
  );
}
