import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  Palette,
  Plus,
  TrendingUp,
  CreditCard
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const mainItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Invoices", url: "/invoices", icon: FileText },
  { title: "Create Invoice", url: "/create", icon: Plus },
  { title: "Clients", url: "/clients", icon: Users },
  { title: "Templates", url: "/templates", icon: Palette },
];

const otherItems = [
  { title: "Analytics", url: "/analytics", icon: TrendingUp },
  { title: "Billing", url: "/billing", icon: CreditCard },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar 
      className="sidebar-gradient border-r border-border"
      collapsible="icon"
    >
      <SidebarContent className="p-4">
        {!isCollapsed && (
          <div className="mb-6">
            <Button 
              className="w-full btn-gradient hover:shadow-lg transition-all"
              size="lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Invoice
            </Button>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className={`text-muted-foreground font-medium ${isCollapsed ? "text-center" : ""}`}>
            {isCollapsed ? "•••" : "Main"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
                        isActive(item.url)
                          ? "bg-primary text-primary-foreground shadow-glow"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${isCollapsed ? "mx-auto" : ""}`} />
                      {!isCollapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className={`text-muted-foreground font-medium ${isCollapsed ? "text-center" : ""}`}>
            {isCollapsed ? "•••" : "Other"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {otherItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                        isActive(item.url)
                          ? "bg-primary text-primary-foreground shadow-glow"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${isCollapsed ? "mx-auto" : ""}`} />
                      {!isCollapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}