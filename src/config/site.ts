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
        { title: "General", href: "/settings/general", icon: Settings },
        { title: "Docker", href: "/settings/docker", icon: Combine }, // Duplicate of Docker Cleanup? Maybe this is for global settings
        { title: "Authentication", href: "/settings/auth", icon: KeyRound },
        { title: "Notifications", href: "/settings/notifications", icon: ShieldAlert },
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
      icon: KeyRound, // Consider a more specific icon for license
      roles: ["admin"],
    },
  ] as NavItem[],
};
