
import type { NavItem } from "@/types";
import {
  LayoutDashboard,
  Users,
  Package,
  Server,
  Globe,
  Settings,
  Combine,
  KeyRound,
  Network,
  Trash2,
  ShieldAlert,
  Brush,
  Github,
  ServerCog, // Added for Server Maintenance
} from "lucide-react";

export const siteConfig = {
  name: "BikPanel Lite",
  description: "Next-gen server management panel.",
  url: "https://bikpanel.example.com", // Replace with your actual URL
  ogImage: "https://bikpanel.example.com/og.jpg", // Replace
  links: {
    twitter: "https://twitter.com/bikpanel", // Replace
    github: "https://github.com/bikpanel", // Replace
  },
  mainNav: [] as NavItem[], // Main navigation for public pages (if any)
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      roles: ["admin", "user", "operator"],
    },
    {
      title: "Users",
      href: "/users",
      icon: Users,
      roles: ["admin"],
    },
    {
      title: "Projects",
      href: "/projects",
      icon: Package,
      roles: ["admin", "user", "operator"],
    },
    {
      title: "Services",
      href: "/services",
      icon: Server,
      roles: ["admin", "user", "operator"],
    },
    {
      title: "Domains",
      href: "/domains",
      icon: Globe,
      roles: ["admin", "operator"],
    },
    {
      title: "Docker Cleanup",
      href: "/docker/cleanup",
      icon: Trash2,
      roles: ["admin", "operator"],
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
      roles: ["admin"],
      children: [
        { title: "General", href: "/settings/general", icon: Settings, roles: ["admin"] },
        { title: "Server Maintenance", href: "/settings/server", icon: ServerCog, roles: ["admin"] },
        { title: "Docker", href: "/settings/docker", icon: Combine, roles: ["admin"] },
        { title: "Security", href: "/settings/auth", icon: KeyRound, roles: ["admin"] }, // Renamed for clarity
        { title: "Notifications", href: "/settings/notifications", icon: ShieldAlert, roles: ["admin"] },
        { title: "Branding", href: "/settings/branding", icon: Brush, roles: ["admin"] },
        { title: "GitHub", href: "/settings/github", icon: Github, roles: ["admin"] },
      ],
    },
    {
      title: "Cluster Management",
      href: "/cluster",
      icon: Network,
      roles: ["admin"],
    },
    {
      title: "License",
      href: "/license",
      icon: KeyRound,
      roles: ["admin"],
    },
  ] as NavItem[],
};
