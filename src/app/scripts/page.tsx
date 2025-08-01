"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getCookieByName } from "../services/CookieService";
import axios from "axios";

type Script = {
  id: string;
  userId: string;
  prompt: string;
  content: string;
  createdAt: string;
};

export default function Page() {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Fetch scripts from API
  const fetchScripts = async () => {
    setLoading(true);
    setError(null);
    try {
      const userId = getCookieByName('userId') ?? '688afb45bcc538e5c78dd715';
      console.log(userId)
      const response = await axios.get(`/api/script?userId=${userId}`);
      setScripts(response.data || []);
    } catch (err) {
      console.log(err)
      setError("Failed to fetch scripts.");
      setScripts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScripts();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(scripts.length / pageSize);
  const paginatedScripts = scripts.slice((page - 1) * pageSize, page * pageSize);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Scripts Grid Header */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Your Generated Scripts</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={fetchScripts}
                disabled={loading}
              >
                Refresh
              </Button>
            </div>
          </div>
          {error && (
            <div className="text-red-500 text-sm mb-2">{error}</div>
          )}
          <div className="flex-1 bg-muted/50 rounded-xl p-4 min-h-[200px] overflow-auto">
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <span className="animate-spin mr-2">⏳</span> Loading scripts...
              </div>
            ) : paginatedScripts.length === 0 ? (
              <div className="text-muted-foreground text-center py-8">
                No scripts found.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paginatedScripts.map((script) => (
                  <div
                    key={script.id}
                    className="bg-background rounded-lg shadow p-4 flex flex-col gap-2 border"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {new Date(script.createdAt).toLocaleString()}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Copy script"
                        onClick={() => {
                          navigator.clipboard.writeText(script.content);
                          toast.success("Script copied to clipboard.");
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <rect
                            x="9"
                            y="9"
                            width="13"
                            height="13"
                            rx="2"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                          />
                          <rect
                            x="3"
                            y="3"
                            width="13"
                            height="13"
                            rx="2"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                          />
                        </svg>
                      </Button>
                    </div>
                    <div>
                      <div className="font-medium text-sm mb-1 text-primary">
                        Prompt:
                      </div>
                      <div className="text-sm mb-2 break-words">
                        {script.prompt}
                      </div>
                      <div className="font-medium text-sm mb-1 text-primary">
                        Script:
                      </div>
                      <pre className="text-muted-foreground whitespace-pre-wrap break-words text-xs bg-muted rounded p-2">
                        {script.content.length > 200
                          ? script.content.slice(0, 200) + "..."
                          : script.content}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="text-sm">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
