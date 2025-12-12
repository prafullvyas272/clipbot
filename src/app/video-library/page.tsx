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
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getCookieByName } from "../services/CookieService";
import axios from "axios";
import Loader from "@/components/ui/loader";
import { Input } from "@/components/ui/input";

import {
  Copy,
  Download,
  Share2,
  Archive as ArchiveIcon,
  Trash,
  Grid,
  Table as TableIcon,
} from "lucide-react";

type Video = {
  id: string;
  title?: string;
  thumbnail?: string;
  videoFile: string;
  size: number;
  duration: number;
  createdAt: string;
  updatedAt: string;
  userId?: string;
  isArchived: boolean;
  isDeleted: boolean;
};

export default function Page() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [viewType, setViewType] = useState<"card" | "table">("card");

  // Search & Filters
  const [search, setSearch] = useState("");
  const [filterArchived, setFilterArchived] = useState("all");
  const [filterDeleted, setFilterDeleted] = useState("all");

  // Sorting
  const [sortField, setSortField] = useState("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  // Fetch Videos
  const fetchVideos = async () => {
    setLoading(true);
    setError(null);
    try {
      const userId =
        getCookieByName("userId") ?? "688afb45bcc538e5c78dd715";

      const response = await axios.get(`/api/video?userId=${userId}`);
      setVideos(response?.data ?? []);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch videos.");
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Apply Search, Filters, Sorting
  const filteredVideos = useMemo(() => {
    let data = [...videos];

    // Search
    if (search.trim()) {
      data = data.filter((v) =>
        v.title?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Archive Filter
    if (filterArchived !== "all") {
      data = data.filter(
        (v) => v.isArchived === (filterArchived === "true")
      );
    }

    // Deleted Filter
    if (filterDeleted !== "all") {
      data = data.filter(
        (v) => v.isDeleted === (filterDeleted === "true")
      );
    }

    // Sorting
    data.sort((a, b) => {
      let A: any = a[sortField as keyof Video];
      let B: any = b[sortField as keyof Video];

      if (sortField === "createdAt") {
        A = new Date(A).getTime();
        B = new Date(B).getTime();
      }

      return sortDir === "asc" ? A - B : B - A;
    });

    return data;
  }, [videos, search, filterArchived, filterDeleted, sortField, sortDir]);

  // Pagination
  const totalPages = Math.ceil(filteredVideos.length / pageSize);
  const paginatedVideos = filteredVideos.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Top Bar */}
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Videos</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Video Library</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Page Body */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">

          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Videos</h2>

            <div className="flex items-center gap-3">
              {/* View Switch */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewType("card")}
                className={viewType === "card" ? "bg-primary text-white" : ""}
              >
                <Grid size={18} />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewType("table")}
                className={viewType === "table" ? "bg-primary text-white" : ""}
              >
                <TableIcon size={18} />
              </Button>

              <Button variant="outline" onClick={fetchVideos}>
                Refresh
              </Button>
            </div>
          </div>

          {/* Search + Filters */}
          <div className="bg-muted/50 p-4 rounded-xl grid grid-cols-1 md:grid-cols-4 gap-4">

            {/* Search */}
            <div>
              <label className="text-xs text-muted-foreground">Search</label>
              <Input
                placeholder="Search title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Archived */}
            <div>
              <label className="text-xs text-muted-foreground">Archived</label>
              <select
                className="w-full border rounded p-2 bg-white"
                value={filterArchived}
                onChange={(e) => setFilterArchived(e.target.value)}
              >
                <option value="all">All</option>
                <option value="true">Archived</option>
                <option value="false">Active</option>
              </select>
            </div>

            {/* Deleted */}
            <div>
              <label className="text-xs text-muted-foreground">Deleted</label>
              <select
                className="w-full border rounded p-2 bg-white"
                value={filterDeleted}
                onChange={(e) => setFilterDeleted(e.target.value)}
              >
                <option value="all">All</option>
                <option value="true">Deleted</option>
                <option value="false">Active</option>
              </select>
            </div>

            {/* Sorting */}
            <div>
              <label className="text-xs text-muted-foreground">Sort</label>
              <div className="flex gap-2">
                <select
                  className="border p-2 rounded bg-white"
                  value={sortField}
                  onChange={(e) => setSortField(e.target.value)}
                >
                  <option value="createdAt">Date</option>
                  <option value="size">Size</option>
                  <option value="duration">Duration</option>
                </select>

                <select
                  className="border p-2 rounded bg-white"
                  value={sortDir}
                  onChange={(e) => setSortDir(e.target.value as any)}
                >
                  <option value="asc">Asc</option>
                  <option value="desc">Desc</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-muted/50 rounded-xl p-4 min-h-[200px]">

            {loading ? (
              <div className="flex justify-center items-center h-32">
                <Loader />
              </div>
            ) : paginatedVideos.length === 0 ? (
              <div className="text-muted-foreground text-center py-8">
                No videos found.
              </div>
            ) : viewType === "card" ? (
              /* CARD VIEW */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {paginatedVideos.map((video) => (
                  <div
                    key={video.id}
                    className="bg-white border rounded-xl shadow p-4 flex flex-col gap-3"
                  >
                    <img
                      src={video.thumbnail}
                      className="rounded-lg h-40 w-full object-cover"
                    />

                    <h3 className="font-semibold text-lg">{video.title}</h3>

                    <p className="text-xs text-muted-foreground">
                      {new Date(video.createdAt).toLocaleString()}
                    </p>

                    <div className="text-xs text-muted-foreground">
                      {video.size} MB • {video.duration} sec
                    </div>

                    {/* ICON ACTIONS */}
                    <div className="flex items-center gap-3 mt-2">

                      {/* Copy */}
                      <Copy
                        className="cursor-pointer hover:text-primary"
                        onClick={() => {
                          navigator.clipboard.writeText(video.videoFile);
                          toast.success("Video Link Copied!");
                        }}
                        size={20}
                      />

                      {/* Download */}
                      <a href={video.videoFile} download target="_blank">
                        <Download className="cursor-pointer hover:text-primary" size={20} />
                      </a>

                      {/* Share */}
                      <Share2
                        size={20}
                        className="cursor-pointer hover:text-primary"
                        onClick={() => {
                          navigator.share
                            ? navigator.share({ url: video.videoFile })
                            : toast.info("Sharing not supported on this device");
                        }}
                      />

                      {/* Archive */}
                      <ArchiveIcon
                        size={20}
                        className="cursor-pointer hover:text-primary"
                        onClick={() => toast.success("Archived ✔")}
                      />

                      {/* Delete */}
                      <Trash
                        size={20}
                        className="cursor-pointer hover:text-red-500"
                        onClick={() => toast.error("Deleted")}
                      />

                    </div>
                  </div>
                ))}
              </div>

            ) : (
              /* TABLE VIEW */
              <div className="overflow-auto w-full">
                <table className="min-w-full bg-white rounded-lg text-sm">
                  <thead className="bg-gray-100 text-left">
                    <tr>
                      <th className="p-3">Thumbnail</th>
                      <th className="p-3">Title</th>
                      <th className="p-3">Size</th>
                      <th className="p-3">Duration</th>
                      <th className="p-3">Created</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedVideos.map((video) => (
                      <tr key={video.id} className="border-b">
                        <td className="p-3">
                          <img
                            src={video.thumbnail}
                            className="h-14 w-20 rounded object-cover"
                          />
                        </td>

                        <td className="p-3 font-medium">{video.title}</td>
                        <td className="p-3">{video.size} MB</td>
                        <td className="p-3">{video.duration}s</td>
                        <td className="p-3">
                          {new Date(video.createdAt).toLocaleString()}
                        </td>

                        {/* ICONS */}
                        <td className="p-3 flex items-center gap-3">

                          <Copy
                            size={18}
                            className="cursor-pointer hover:text-primary"
                            onClick={() => {
                              navigator.clipboard.writeText(video.videoFile);
                              toast.success("Copied!");
                            }}
                          />

                          <a href={video.videoFile} download target="_blank">
                            <Download size={18} className="cursor-pointer hover:text-primary" />
                          </a>

                          <Share2
                            size={18}
                            className="cursor-pointer hover:text-primary"
                            onClick={() => {
                              navigator.share
                                ? navigator.share({ url: video.videoFile })
                                : toast.info("Share not supported");
                            }}
                          />

                          <ArchiveIcon
                            size={18}
                            className="cursor-pointer hover:text-primary"
                            onClick={() => toast.success("Archived")}
                          />

                          <Trash
                            size={18}
                            className="cursor-pointer hover:text-red-500"
                            onClick={() => toast.error("Deleted")}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-4">
              <Button
                variant="outline"
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
