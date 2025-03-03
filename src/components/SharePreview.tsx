import apiClient from "@/axios/apiClient";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GameStats } from "@/utils";
import { Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import GameStatsCard from "./GameStatsCard";
const FE_BASE_URL = import.meta.env.VITE_FE_URL;
function SharePreview({ sessionId }: { sessionId: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [link, setLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const [stats, setStats] = useState<GameStats>({
    totalQuestions: 0,
    score: 0,
    _count: {
      sessionQuestions: 0,
    },
  });
  useEffect(() => {
    const generateShareLink = async () => {
      setIsLoading(true);
      setError("");
      try {
        const res = await apiClient.get(`/challenge/${sessionId}/create`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const stats = await apiClient.get(`/game/session/${sessionId}/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(stats.data);
        setLink(`${FE_BASE_URL}/share/${res.data.shareCode}`);
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

  const shareToWhatsApp = async () => {
    setIsLoading(true);
    setError("");
    try {
      const text = `Challenge me in this game! ${link}`;
      const whatsappUrl = `https://api.whatsapp.com/send?text=${text}`;
      window.open(whatsappUrl, "_blank");
    } catch (error) {
      console.error("Failed to share on WhatsApp:", error);
      setError("Failed to share on WhatsApp");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          className="flex cursor-pointer items-center"
          size="lg"
        >
          <Share2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Challenge a Friend
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Share Challenge</h4>
            <GameStatsCard stats={stats!} ref={cardRef} />
          </div>
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
              <Button onClick={shareToWhatsApp}>Share on WhatsApp</Button>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default SharePreview;
