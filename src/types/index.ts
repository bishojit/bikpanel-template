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
  status: "development" | "live" | "archived" | "error" | "paused"; // Added 'paused'
  users: string[]; // User IDs - form will handle as comma-separated string in Textarea
  services: string[]; // Service IDs - form will handle as comma-separated string in Textarea
  envVars: EnvironmentVariable[]; // Changed for easier form handling
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
