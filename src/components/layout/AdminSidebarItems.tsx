"use client";

import { useAuthContext } from "@/lib/auth-context";
import Link from "next/link";
import { List, Users, FileOutput } from "lucide-react";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

export default function AdminSidebarItems() {
  const { isAdmin } = useAuthContext();

  if (!isAdmin) return null;

  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton asChild variant="ghost" className="w-full justify-start">
          <Link href="/cards">
            <List className="h-5 w-5" />
            <span className="ml-2">Manage Cards</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton asChild variant="ghost" className="w-full justify-start">
          <Link href="/investors">
            <Users className="h-5 w-5" />
            <span className="ml-2">Investors</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton asChild variant="ghost" className="w-full justify-start">
          <Link href="/export">
            <FileOutput className="h-5 w-5" />
            <span className="ml-2">Export</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </>
  );
}

