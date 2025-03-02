import apiClient from "@/axios/apiClient";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import WelcomeCard from "@/components/WelcomeCard";
import { getToken, setToken } from "@/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Lobby() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const token = getToken();

  const handleLogin = async (userName: string) => {
    if (userName.trim() === "" && !token) return;

    try {
      setLoading(true);
      let sessionToken = token;

      if (!token) {
        const response = await apiClient.post("/user/create", {
          username: userName,
        });
        sessionToken = response.data.token;
        setToken(sessionToken);
      }

      const sessionRes = await apiClient.get("/game/start", {
        headers: { Authorization: `Bearer ${sessionToken}` },
      });
      navigate(`/game/${sessionRes.data.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollArea className="h-screen">
      <div className="font-jakarta relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-[#f5edff] via-[#e6f0ff] to-[#e6fff0]">
        <Header />
        <main className="z-10 flex flex-1 flex-col justify-center px-4 py-6">
          <div className="container mx-auto max-w-4xl">
            <WelcomeCard
              token={token}
              isLoading={isLoading}
              onLogin={handleLogin}
            />
          </div>
        </main>
        <Footer />
      </div>
    </ScrollArea>
  );
}
