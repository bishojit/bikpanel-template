
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Added useRouter
import type { ReactNode } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/shared/Logo";
import { siteConfig } from "@/config/site";
import type { NavItem } from "@/types";
import { ChevronDown, LogOut, UserCircle, Settings as SettingsIconLucide } from "lucide-react"; // Renamed Settings to avoid conflict
import { ThemeSwitcher } from "./ThemeSwitcher";


interface AppLayoutProps {
  children: ReactNode;
}

// Mock user and logout for prototype purposes
const mockUser = { 
  name: "Admin User", 
  email: "admin@example.com", 
  avatar: "https://placehold.co/100x100.png?text=AU",
  // role: "admin" // Role would be used for RBAC in a real app
};

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    console.log("Logout clicked (simulated)");
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mockAuthToken'); // Simulate clearing auth token
    }
    router.push("/login");
  };

  const accessibleNavItems = siteConfig.sidebarNav;

  const renderNavItem = (item: NavItem, index: number, isSubItem = false) => {
    const Icon = item.icon;
    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href || '---')); 

    if (item.children && item.children.length > 0) {
      return (
        <SidebarMenuItem key={`${item.href}-${index}`}>
          <SidebarMenuButton
            isActive={isActive}
            className="justify-between"
          >
            <span className="flex items-center gap-2">
              {Icon && <Icon />}
              <span>{item.title}</span>
            </span>
            <ChevronDown className="h-4 w-4" />
          </SidebarMenuButton>
          <SidebarMenuSub>
            {item.children.map((child, childIndex) => (
               <SidebarMenuSubItem key={`${child.href}-${childIndex}`}>
                <Link href={child.href} passHref legacyBehavior>
                  <SidebarMenuSubButton isActive={pathname === child.href}>
                    {child.icon && <child.icon />}
                    <span>{child.title}</span>
                  </SidebarMenuSubButton>
                </Link>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </SidebarMenuItem>
      );
    }
    
    const MenuButtonComponent = isSubItem ? SidebarMenuSubButton : SidebarMenuButton;
    const ItemComponent = isSubItem ? SidebarMenuSubItem : SidebarMenuItem;

    return (
      <ItemComponent key={`${item.href}-${index}`}>
        <Link href={item.href} passHref legacyBehavior>
          <MenuButtonComponent isActive={isActive} tooltip={item.title}>
            {Icon && <Icon />}
            <span>{item.title}</span>
          </MenuButtonComponent>
        </Link>
      </ItemComponent>
    );
  };


  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <Link href="/dashboard" className="flex items-center gap-2 p-2">
            <Logo className="w-8 h-8" />
            <span className="font-semibold text-lg group-data-[collapsible=icon]:hidden">{siteConfig.name}</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {accessibleNavItems.map((item, index) => renderNavItem(item, index))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:items-center">
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 border-b shrink-0 bg-background sm:px-6">
            <SidebarTrigger className="md:hidden"/>
            <div className="flex-1"> {/* Placeholder for breadcrumbs or global search */} </div>
            <div className="flex items-center gap-2">
              <ThemeSwitcher />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative w-8 h-8 rounded-full">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={mockUser?.avatar} alt={mockUser?.name || "User"} data-ai-hint="person avatar" />
                      <AvatarFallback>{mockUser?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{mockUser?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {mockUser?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/settings/general')}>
                    <UserCircle className="w-3.5 h-3.5 mr-2" />
                    Profile (Settings)
                  </DropdownMenuItem>
                   <DropdownMenuItem onClick={() => router.push('/settings')}>
                    <SettingsIconLucide className="w-3.5 h-3.5 mr-2" /> 
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="w-3.5 h-3.5 mr-2" /> 
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
        </header>
        <main className="flex-1 p-3 overflow-auto sm:p-4"> 
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
