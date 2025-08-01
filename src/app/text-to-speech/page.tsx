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
import { useState } from "react";
import { Copy, Sparkles, Download, Loader2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getCookieByName } from "../services/CookieService";
import { Textarea } from "@/components/ui/textarea";
import { generateAudio, playAudio } from "../actions";
import { downloadAudio } from "../actions";

export default function Page() {
  const [prompt, setPrompt] = useState("");
  const [generatedSpeech, setGeneratedSpeech] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateAudio = async () => {
    setLoading(true);
    setError(null);
    try {
      const userId = getCookieByName("userId") ?? "";
      const response = await generateAudio(userId, prompt);
      console.log(response)
      setGeneratedSpeech(response);
      toast.success("Your audio is ready.");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "An error occurred.");
      } else {
        setError("An error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadAudio = async () => {
    return await downloadAudio();
  }

  const handlePlayAudio = async () => {
    return await playAudio(generatedSpeech);
  }
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
            <h2 className="text-lg font-semibold">Text to Speech</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handlePlayAudio}
                size="sm"
                disabled={loading || generatedSpeech == ''}
              >
                <Play/>
                Play Audio
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadAudio}
                disabled={loading || generatedSpeech == ''}
              >
                <Download/>
                Download Audio
              </Button>
            </div>
          </div>
          {/* Prompt Input section */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-2 w-full">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 h-40 rounded-lg border border-Input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring w-full sm:w-auto"
              placeholder="Enter or paste your text here..."
            />
          </div>
          <Button
            disabled={loading || prompt == ''}
            onClick={handleGenerateAudio}
            className="h-10 px-4 rounded-lg bg-primary text-primary-foreground font-medium shadow hover:bg-primary/90 transition-colors flex items-center gap-2 w-full"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
            {loading ? "Generating Audio" : "Generate Audio"}
          </Button>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
