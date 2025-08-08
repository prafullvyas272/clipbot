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
import { TransparentNavbar } from "@/components/header";

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
      const userId = getCookieByName("userId") ?? "688afb45bcc538e5c78dd715";
      console.log(userId);
      const response = await axios.get(`/api/script?userId=${userId}`);
      setScripts(response.data || []);
    } catch (err) {
      console.log(err);
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
  const paginatedScripts = scripts.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-black to-gray-900 text-white">
      <TransparentNavbar />
      <section className="mt-20 flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl mx-auto text-center mt-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Generated Scripts
          </h1>
        </div>
      </section>
      <section className="mt-10 flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center text-gray-300 py-20">
              Loading scripts...
            </div>
          ) : error ? (
            <div className="text-center text-red-400 py-20">{error}</div>
          ) : scripts.length === 0 ? (
            <div className="text-center text-gray-400 py-20">
              No scripts found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {paginatedScripts.map((script) => (
                <div
                  key={script.id}
                  className="group bg-white/5 border border-white/10 rounded-2xl shadow-lg backdrop-blur-sm hover:bg-white/10 transition flex flex-col overflow-hidden"
                >
                  <div className="flex-1 flex flex-col p-6">
                    <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-purple-400 transition-colors break-words">
                      {script.prompt || "Untitled Prompt"}
                    </h3>
                    {/* Action buttons */}
                    <div className="flex items-center space-x-4 mb-4">
                      {/* Copy Icon Button */}
                      <button
                        title="Copy Script"
                        className="p-2 rounded hover:bg-purple-700/30 transition"
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(script.content);
                            toast.success("Script copied to clipboard!");
                          } catch {
                            toast.error("Failed to copy script.");
                          }
                        }}
                      >
                        {/* Copy SVG */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-200"
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
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                          />
                          <rect
                            x="3"
                            y="3"
                            width="13"
                            height="13"
                            rx="2"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                          />
                        </svg>
                      </button>
                      {/* Download Icon Button */}
                      <button
                        title="Download Script"
                        className="p-2 rounded hover:bg-purple-700/30 transition"
                        onClick={() => {
                          const blob = new Blob([script.content], {
                            type: "text/plain",
                          });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = (script.prompt || "script") + ".txt";
                          document.body.appendChild(a);
                          a.click();
                          setTimeout(() => {
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);
                          }, 0);
                        }}
                      >
                        {/* Download SVG */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400 mt-auto">
                      <span>
                        {script.createdAt
                          ? new Date(script.createdAt).toLocaleDateString()
                          : ""}
                      </span>
                      <span className="font-mono text-gray-500">
                        {script.id.slice(0, 8)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 space-x-2">
              <button
                className="px-3 py-1 rounded bg-white/10 text-white hover:bg-purple-600 transition disabled:opacity-50"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </button>
              <span className="px-3 py-1 text-gray-300">
                Page {page} of {totalPages}
              </span>
              <button
                className="px-3 py-1 rounded bg-white/10 text-white hover:bg-purple-600 transition disabled:opacity-50"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
