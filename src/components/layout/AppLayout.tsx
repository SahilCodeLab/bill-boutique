import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <header className="h-16 flex items-center justify-between border-b border-border bg-card px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="lg:hidden" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <span className="text-white font-bold text-sm">IP</span>
                </div>
                <h1 className="text-xl font-semibold text-gradient">InvoicePro</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-success/10 text-success rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                Pro Plan
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                <span className="text-white font-medium text-sm">JD</span>
              </div>
            </div>
          </header>
          
          <div className="flex-1 p-6 bg-background-secondary/30">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}