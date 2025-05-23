
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Added useRouter
import type { ReactNode } from "react";
import * as Collapsible from "@radix-ui/react-collapsible"; // Import Collapsible
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
import { ChevronDown, LogOut, UserCircle, Settings as SettingsIconLucide, BarChart3 } from "lucide-react"; // Renamed Settings to avoid conflict
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

  const renderNavItem = (item: NavItem, index: number) => {
    const Icon = item.icon;
    const isActiveParent = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href || '---'));
    const isChildActive = item.children?.some(child => pathname === child.href || pathname.startsWith(child.href || '---'));

    if (item.children && item.children.length > 0) {
      return (
        <Collapsible.Root asChild key={`${item.href}-${index}`} defaultOpen={isActiveParent || isChildActive}>
          <SidebarMenuItem className="group"> {/* Added group for chevron rotation */}
            <Collapsible.Trigger asChild>
              <SidebarMenuButton
                isActive={isActiveParent && !isChildActive} // Parent active only if no child is specifically active
                className="justify-between"
              >
                <span className="flex items-center gap-2">
                  {Icon && <Icon />}
                  <span>{item.title}</span>
                </span>
                {/* Chevron will rotate based on the Collapsible's data-state on SidebarMenuItem */}
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </SidebarMenuButton>
            </Collapsible.Trigger>
            <Collapsible.Content asChild>
              <SidebarMenuSub>
                {item.children.map((child, childIndex) => (
                   <SidebarMenuSubItem key={`${child.href}-${childIndex}`}>
                    <Link href={child.href} passHref legacyBehavior>
                      <SidebarMenuSubButton isActive={pathname === child.href || pathname.startsWith(child.href || '---')}>
                        {child.icon && <child.icon />}
                        <span>{child.title}</span>
                      </SidebarMenuSubButton>
                    </Link>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </Collapsible.Content>
          </SidebarMenuItem>
        </Collapsible.Root>
      );
    }
    
    // For items without children
    return (
      <SidebarMenuItem key={`${item.href}-${index}`}>
        <Link href={item.href} passHref legacyBehavior>
          <SidebarMenuButton isActive={isActiveParent} tooltip={item.title}>
            {Icon && <Icon />}
            <span>{item.title}</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    );
  };


  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <Link href="/dashboard" className="flex items-center gap-2 p-2">
            <Logo className="w-6 h-6" /> {/* Adjusted logo size for compactness */}
            <span className="font-semibold text-base group-data-[collapsible=icon]:hidden">{siteConfig.name}</span> {/* Adjusted font size */}
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
        <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-3 border-b shrink-0 bg-background sm:px-4"> {/* h-16 to h-14, px-4 to px-3, sm:px-6 to sm:px-4 */}
            <SidebarTrigger className="md:hidden"/>
            <div className="flex-1"> {/* Placeholder for breadcrumbs or global search */} </div>
            <div className="flex items-center gap-1.5"> {/* gap-2 to gap-1.5 */}
              <ThemeSwitcher />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative w-7 h-7 rounded-full"> {/* w-8 h-8 to w-7 h-7 */}
                    <Avatar className="w-7 h-7"> {/* w-8 h-8 to w-7 h-7 */}
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
        <main className="flex-1 p-2 sm:p-3">  {/* Removed overflow-auto */}
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

