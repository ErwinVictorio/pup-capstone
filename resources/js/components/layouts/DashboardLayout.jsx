import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../app-sidebar";


export default function DashboardLayout({ children }) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                {/* Your side navigation */}
                <AppSidebar />

                {/* Main page content area */}
                <main className="flex-1 p-6">
                    <header className="flex items-center gap-2 mb-4">
                        {/* The toggle button to collapse/expand the sidebar */}
                        <SidebarTrigger />
                    </header>

                    {/* Your page content gets injected here */}
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
}