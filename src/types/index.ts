export type Role = "admin" | "user" | "operator";

export interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
  status: "active" | "inactive" | "suspended";
  lastLogin?: Date | string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: "development" | "live" | "archived" | "error";
  users: string[]; // User IDs
  services: string[]; // Service IDs
  envVars: Record<string, string>;
}

export interface Service {
  id: string;
  name: string;
  template: string;
  status: "running" | "stopped" | "error" | "starting" | "stopping";
  uptime?: string; // Could be a duration string or timestamp
  // Add other service-specific properties
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
