import apiClient from "@/axios/apiClient";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ScriptCopyBtn } from "./magicui/script-copy-btn";

function SharePreview({ sessionId }: { sessionId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [link, setLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const generateShareLink = async () => {
      setIsLoading(true);
      setError("");
      try {
        const res = await apiClient.get(`/challenge/${sessionId}/create`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setLink(`http://localhost:3000/${res.data.shareCode}`);
      } catch (error) {
        console.error("Failed to generate share link:", error);
        setError("Failed to generate share link");
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen && !link) {
      generateShareLink();
    }
  }, [isOpen, sessionId, link]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          className="flex cursor-pointer items-center"
          size={"lg"}
        >
          <Share2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Challenge a Friend
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Share Preview</h4>
            <p className="text-muted-foreground text-sm">
              This is how your shared content will appear.
            </p>
          </div>
          <div className="grid gap-2">
            {isLoading ? (
              <p>Generating share link...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <>
                <div className="bg-muted rounded p-2">
                  <h5 className="mb-2 text-sm font-medium">Challenge Link</h5>
                  <p className="overflow-hidden text-xs break-all text-ellipsis whitespace-nowrap">
                    {link}
                  </p>
                </div>
                <ScriptCopyBtn
                  showMultiplePackageOptions={true}
                  codeLanguage="shell"
                  lightTheme="nord"
                  darkTheme="vitesse-dark"
                  commandMap={{ challenge: link }}
                  className="max-w-full text-xs"
                />
              </>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default SharePreview;
