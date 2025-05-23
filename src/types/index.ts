
export type Role = "admin" | "user" | "operator";

export interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
  status: "active" | "inactive" | "suspended";
  lastLogin?: Date | string;
}

export interface EnvironmentVariable {
  id: string; // For unique key in React lists and managing edits/deletes
  key: string;
  value: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: "development" | "live" | "archived" | "error" | "paused";
  users: string[];
  services: string[];
  envVars: EnvironmentVariable[];
}

export interface Service {
  id: string;
  name: string;
  template: "PHP" | "Node.js" | "MySQL" | "Redis" | "PostgreSQL" | "Custom";
  status: "running" | "stopped" | "error" | "starting" | "stopping" | "deploying" | "paused";
  uptime?: string; // e.g., "48 days", "N/A"
  lastDeployed?: Date | string;
  cpuUsage?: number; // percentage, e.g., 25
  ramUsage?: number; // MB, e.g., 512
  diskUsage?: number; // GB, e.g., 10
  linkedProject?: string; // Project ID
  notes?: string;
}

export interface Domain {
  id: string;
  name: string;
  sslStatus: "valid" | "expiring_soon" | "expired" | "pending" | "error";
  dnsRecords: { type: "A" | "CNAME" | "TXT" | "MX"; name: string; value: string; ttl: number }[];
}

export interface NavItem {
  title: string;
  href: string;
  icon?: React.ElementType;
  disabled?: boolean;
  external?: boolean;
  label?: string;
  children?: NavItem[];
  roles?: Role[]; // For RBAC
}

