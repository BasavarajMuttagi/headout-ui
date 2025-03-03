import apiClient from "@/axios/apiClient";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getToken } from "@/utils";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Challenge() {
  const { shareCode } = useParams();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const token = getToken();

  const handleChallenge = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get(`/challenge/accept/${shareCode}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate(`/game/${res.data.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      handleChallenge();
    } else {
      navigate("/");
    }
  }, []);
  return (
    <ScrollArea className="h-screen">
      <div className="font-jakarta relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-[#f5edff] via-[#e6f0ff] to-[#e6fff0]">
        <Header />
        <main className="z-10 flex flex-1 flex-col justify-center px-4 py-6">
          <div className="container mx-auto flex max-w-4xl items-center justify-center">
            {isLoading && (
              <div className="flex items-center space-x-3">
                <span>Challenge is Loading</span>{" "}
                <Loader2 size={50} className="animate-spin" />
              </div>
            )}
          </div>
        </main>

        {/* Decorative Elements */}
        <div className="absolute right-0 bottom-0 left-0 z-0 h-48 bg-gradient-to-t from-white/80 to-transparent"></div>

        {/* Floating Elements */}
        <div
          className="animate-float absolute right-1/4 bottom-20 h-20 w-20 rounded-full bg-yellow-400 opacity-50"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="animate-float absolute top-40 left-1/4 h-12 w-12 rounded-full bg-red-400 opacity-50"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="animate-float absolute top-20 right-20 h-16 w-16 rounded-full bg-green-400 opacity-50"></div>

        <div
          className="animate-float absolute bottom-40 left-20 h-24 w-24 rounded-full bg-blue-400 opacity-50"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Cloud-like elements */}
        <div className="absolute right-0 bottom-0 left-0 z-0 h-32">
          <div className="absolute bottom-0 left-[10%] h-20 w-40 rounded-t-full bg-white/80"></div>
          <div className="absolute bottom-0 left-[25%] h-28 w-60 rounded-t-full bg-white/80"></div>
          <div className="absolute bottom-0 left-[50%] h-24 w-80 rounded-t-full bg-white/80"></div>
          <div className="absolute bottom-0 left-[75%] h-16 w-40 rounded-t-full bg-white/80"></div>
        </div>
        <Footer />
      </div>
    </ScrollArea>
  );
}
