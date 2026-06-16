import React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";
import { Link } from "@inertiajs/react";
import { LayoutDashboard, Users, Settings, File, Calendar } from "lucide-react";

// Define your navigation links
const items = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Accreditation Documents", url: "#", icon: Users },
    { title: "File Submission", url: "#", icon: File },
    { title: "Events", url: "#", icon: Calendar },
];

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton className='text-[#800000]' asChild>
                                        {/* Use Inertia's Link instead of <a> for SPA routing */}
                                        <Link href={item.url}>
                                            <item.icon className="w-4 h-4 mr-2" />
                                            <span>{item.title}</span>
                                        </Link>
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