"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  FileText,
  ScrollText,
  Speech,
  PieChart,
  Settings2,
  SquareTerminal,
  AudioLines,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

// Sample static data (projects, teams)
const data = {
  teams: [
    {
      name: "ClipBot",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  projects: [
    {
      name: "Generate Script",
      url: "/generate-script",
      icon: FileText,
    },
    {
      name: "View Scripts",
      url: "/scripts",
      icon: ScrollText,
    },
    {
      name: "Text To Speech",
      url: "/text-to-speech",
      icon: Speech,
    },
    {
      name: "View All Speech",
      url: "/speeches",
      icon: AudioLines,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  type User = {
    name: string;
    email: string;
    avatar?: string;
  };

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userId = getCookie("userId");
    if (!userId) return;

    fetch("/api/user", {
      headers: { "x-user-id": userId.toString() },
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent>
        <NavProjects projects={data.projects} />
        {/* <NavMain items={data.navMain} /> */}
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={
            user
              ? {
                  name: user?.name,
                  email: user?.email,
                  avatar: user?.avatar || "/avatars/default.png",
                }
              : {
                  name: "Loading...",
                  email: "",
                  avatar: "/avatars/default.png",
                }
          }
        />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
