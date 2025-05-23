
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
  ShieldAlert,
  Brush,
  Github,
  ServerCog,
  BarChart3, // Added for Metrics page
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
      title: "Metrics", // New Metrics Page
      href: "/metrics",
      icon: BarChart3,
      roles: ["admin", "user", "operator"],
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
      title: "Users",
      href: "/users",
      icon: Users,
      roles: ["admin"],
    },
    {
      title: "Domains",
      href: "/domains",
      icon: Globe,
      roles: ["admin", "operator"],
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
      roles: ["admin"],
      children: [
        { title: "General", href: "/settings/general", icon: Settings, roles: ["admin"] },
        { title: "Security", href: "/settings/auth", icon: KeyRound, roles: ["admin"] },
        { title: "Server Maintenance", href: "/settings/server", icon: ServerCog, roles: ["admin"] },
        { title: "Docker", href: "/settings/docker", icon: Combine, roles: ["admin"] },
        { title: "Notifications", href: "/settings/notifications", icon: ShieldAlert, roles: ["admin"] },
        { title: "GitHub", href: "/settings/github", icon: Github, roles: ["admin"] },
        { title: "Branding", href: "/settings/branding", icon: Brush, roles: ["admin"] },
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
