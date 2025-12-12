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
import { generateVideo } from "../actions";
import { Copy, Sparkles, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"
import { getCookieByName } from "../services/CookieService";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const copyVideo = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent);
      toast.success("Video copied successfully.")
    }
  }

  

  const downloadVideo = () => {
    if (generatedContent) {
      const blob = new Blob([generatedContent], {
        type: "text/plain",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "generated-content.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }

  const handleGenerateVideo = async () => {
    setLoading(true);
    setError(null);
    try {
      const userId = getCookieByName('userId') ?? ''
      const response = await generateVideo(userId, prompt); 

      console.log(response)
      setPrompt('')
      // setGeneratedContent(response || "No content generated.");
      toast.success("Your video is ready.")
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
          {/* Videos Grid Header */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Generate Video</h2>
            <div className="flex gap-2">
              <Button
                onClick={downloadVideo}
                className="h-10 px-4 rounded-lg bg-primary text-primary-foreground font-medium shadow hover:bg-primary/90 transition-colors flex items-center gap-2"
                disabled={!generatedContent}
                title="Download generated content"
              >
                <Download />
                Download
              </Button>
            </div>
          </div>
          {/* Show generated video first */}
          <div className="flex-1 bg-muted/50 rounded-xl p-4 min-h-[200px] overflow-auto whitespace-pre-wrap">
            <pre className="text-muted-foreground whitespace-pre-wrap break-words">
              {/* {generatedContent} */}
            </pre>
          </div>
          {/* Prompt Input section */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-2 w-full">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 h-50 rounded-lg border border-Input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring w-full sm:w-auto"
              placeholder="Enter your prompt here..."
            />
          </div>
          <Button
            disabled={loading || prompt == ""}
            onClick={handleGenerateVideo}
            className="h-10 px-4 rounded-lg bg-primary text-primary-foreground font-medium shadow hover:bg-primary/90 transition-colors flex items-center gap-2 w-full"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
            {loading ? "Generating" : "Generate"}
          </Button>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
