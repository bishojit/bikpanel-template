
export type Role = "admin" | "user" | "operator";
export type UserType = "Root" | "Reseller" | "Customer";

export interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
  type: UserType; // Added user type
  status: "active" | "inactive" | "suspended";
  lastLogin?: Date | string;
  fullName?: string; // Added to match users.json
  timeCreated?: Date | string; // Added to match users.json
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

export type DnsRecordType = "A" | "CNAME" | "TXT" | "MX";
export type SslStatusType = "valid" | "expiring_soon" | "expired" | "pending" | "error" | "disabled";

export interface DnsRecord {
  id: string;
  type: DnsRecordType;
  name: string; // Typically '@' for root, or subdomain
  value: string;
  ttl?: number; // Default to a common value like 3600
}
export interface Domain {
  id: string;
  name: string;
  sslStatus: SslStatusType;
  autoSsl: boolean;
  primaryDnsRecord: { // Simplified for table display and basic form
    type: "A" | "CNAME";
    value: string;
  };
  // fullDnsRecords: DnsRecord[]; // For more advanced DNS management later
  // redirections: Redirect[]; // For redirection management later
  lastValidated?: Date | string;
}

export interface Redirect {
  id: string;
  sourcePath: string;
  targetUrl: string;
  statusCode: 301 | 302;
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
