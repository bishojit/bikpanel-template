"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { ChevronDown, LogOut, UserCircle } from "lucide-react";
// import { useAuth } from "@/hooks/useAuth"; // Placeholder for auth hook

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  // const { user, logout } = useAuth(); // Placeholder
  const user = { name: "Admin User", email: "admin@example.com", role: "admin", avatar: "https://placehold.co/100x100.png" }; // Placeholder user
  const logout = () => { console.log("Logout clicked"); window.location.href = "/login"; }; // Placeholder logout

  // TODO: Implement RBAC filtering for nav items based on user.role
  const accessibleNavItems = siteConfig.sidebarNav; //.filter(item => item.roles?.includes(user.role));

  const renderNavItem = (item: NavItem, index: number, isSubItem = false) => {
    const Icon = item.icon;
    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

    if (item.children && item.children.length > 0) {
      return (
        <SidebarMenuItem key={`${item.href}-${index}`}>
          <SidebarMenuButton
            isActive={isActive}
            className="justify-between"
            // Implement open/close state for submenus if Radix Collapsible is used or similar
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
           {/* Placeholder: User info / logout */}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 border-b shrink-0 bg-background sm:px-6">
            <SidebarTrigger className="md:hidden"/>
            <div className="flex-1"> {/* Placeholder for breadcrumbs or global search */} </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative w-8 h-8 rounded-full">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.avatar} alt={user?.name || "User"} data-ai-hint="person avatar" />
                    <AvatarFallback>{user?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserCircle className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </header>
        <main className="flex-1 p-4 overflow-auto sm:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
