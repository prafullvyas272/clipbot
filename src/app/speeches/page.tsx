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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Play } from "lucide-react";

type GeneratedSpeech = {
  id: string;
  userId: string;
  text: string;
  audioFile: string;
  createdAt: string;
};

export default function Page() {
  const [speeches, setSpeeches] = useState<GeneratedSpeech[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Fetch speeches from API
  const fetchSpeeches = async () => {
    setLoading(true);
    setError(null);
    try {
      const userId = getCookieByName("userId") ?? "688afb45bcc538e5c78dd715";
      console.log(userId);
      const response = await axios.get(`/api/speeches?userId=${userId}`);
      setSpeeches(response.data || []);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch speeches.");
      setSpeeches([]);
    } finally {
      setLoading(false);
    }
  };

  const getAudioFileNameFromPath = (filePath: string) => {
    return filePath.replace('/storage/files/usera/', '');

  }

  useEffect(() => {
    fetchSpeeches();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(speeches.length / pageSize);
  const paginatedScripts = speeches.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

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
        <div className="p-4 m-4">
        <Table>
          <TableHeader className="text-center">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Audio File</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedScripts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No speeches found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedScripts.map((speech: GeneratedSpeech, idx: number) => (
                <TableRow key={speech.id}>
                  <TableCell>
                    {(page - 1) * pageSize + idx + 1}
                  </TableCell>
                  <TableCell>
                    {speech.audioFile ? (
                      <a
                        href={speech.audioFile}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {getAudioFileNameFromPath(speech.audioFile)}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>
                    {speech.createdAt
                      ? new Date(speech.createdAt).toLocaleString()
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        if (speech.audioFile) {
                          const audio = new Audio(speech.audioFile);
                          audio.play().catch((err) =>
                            console.error("Audio play error:", err)
                          );
                        }
                      }}
                      disabled={!speech.audioFile}
                    >
                        <Play/>
                      Play
                    </Button>                    
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        </div>       
      </SidebarInset>
    </SidebarProvider>
  );
}
