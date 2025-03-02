import {
  ChevronRight,
  Compass,
  Globe,
  Loader2,
  Play,
  Trophy,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

// Import shadcn components
import apiClient from "@/axios/apiClient";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { setToken } from "@/utils";

export default function GameLobby() {
  const [userName, setUserName] = useState("");
  const [isLoading, setLoading] = useState(false);
  const handleLogin = async (e: FormEvent) => {
    if (userName.trim() === "") return;
    try {
      e.preventDefault();
      setLoading(true);
      const response = await apiClient.post("/user/create", {
        username: userName,
      });
      setToken(response.data.token);
      location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollArea className="h-screen">
      <div className="font-jakarta relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-[#f5edff] via-[#e6f0ff] to-[#e6fff0]">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 right-0 left-0 z-0 h-full bg-[url('/noise.svg')] opacity-[0.02]"></div>
          <div className="absolute top-1/4 -left-20 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-[#a78bfa]/20 to-[#8b5cf6]/20 blur-[100px]"></div>
          <div className="absolute -top-40 -right-20 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-[#93c5fd]/20 to-[#3b82f6]/20 blur-[100px]"></div>
          <div className="absolute bottom-0 left-1/3 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-[#6ee7b7]/20 to-[#10b981]/20 blur-[100px]"></div>
        </div>

        {/* Navigation */}
        <header className="z-20 w-full px-4 py-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9] shadow-lg sm:h-10 sm:w-10">
                <Globe className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9] opacity-70 blur-[5px]"></div>
              </div>
              <span className="bg-gradient-to-r from-[#6d28d9] to-[#4c1d95] bg-clip-text text-lg font-bold text-transparent sm:text-xl">
                Globetrotter
              </span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="z-10 flex flex-1 flex-col justify-center px-4 py-6">
          <div className="container mx-auto max-w-4xl">
            {/* Game intro section */}
            <Card className="mb-8 border-[#e9d5ff] bg-white/80 shadow-md backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Badge
                    variant="outline"
                    className="mb-4 rounded-full border-[#d8b4fe] bg-[#f3e8ff] px-3 py-1 text-sm font-medium text-[#7e22ce]"
                  >
                    The Ultimate Travel Guessing Game ✨
                  </Badge>
                  <h1 className="mb-4 text-3xl font-bold text-[#4c1d95] sm:text-4xl">
                    Welcome to <span>Globetrotter</span>
                  </h1>
                  <p className="mb-6 max-w-2xl text-[#6d28d9]">
                    Test your geography knowledge with mysterious clues about
                    famous destinations. Guess correctly to unlock fun facts and
                    challenge your friends to beat your score!
                  </p>

                  <div className="mb-8 grid w-full max-w-3xl gap-4 sm:grid-cols-2">
                    <Card className="border-[#e9d5ff] bg-white/90">
                      <CardContent className="flex flex-col items-start p-4">
                        <Compass className="mb-2 h-8 w-8 self-center text-[#8b5cf6]" />
                        <h3 className="mb-3 self-center font-bold text-[#4c1d95]">
                          How to Play
                        </h3>
                        <ul className="space-y-2 text-start text-sm font-medium text-gray-700">
                          <li>1. Read the cryptic clue about a famous place</li>
                          <li>2. Select your answer from multiple options</li>
                          <li>3. Earn points for correct answers</li>
                          <li>
                            4. Discover fascinating facts about each location
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-[#e9d5ff] bg-white/90">
                      <CardContent className="flex flex-col items-start p-4">
                        <Trophy className="mb-2 h-8 w-8 self-center text-[#8b5cf6]" />
                        <h3 className="mb-3 self-center font-bold text-[#4c1d95]">
                          Game Features
                        </h3>
                        <ul className="space-y-2 text-start text-sm font-medium text-gray-700">
                          <li>1. 100+ destinations from around the world</li>
                          <li>2. Challenge friends to beat your score</li>
                          <li>3. Unlock badges and achievements</li>
                          <li>4. Learn interesting facts about each place</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <form
                    className="flex flex-col items-center gap-4"
                    onSubmit={(e) => handleLogin(e)}
                  >
                    <Input
                      type="text"
                      placeholder="username"
                      required
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full"
                    />

                    <div className="group relative w-full">
                      <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] opacity-75 blur transition duration-200 group-hover:opacity-100"></div>
                      <Button
                        type="submit"
                        className="relative w-full bg-[#7c3aed] text-white"
                      >
                        {isLoading ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <>
                            <Play className="mr-2 h-5 w-5" />
                            Start Game
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Footer */}
        <footer className="z-10 w-full px-4 py-4">
          <div className="container mx-auto flex flex-col items-center justify-between gap-2 sm:flex-row">
            <p className="text-xs text-[#6d28d9] sm:text-sm">
              © {new Date().getFullYear()} Globetrotter Challenge
            </p>
            <div className="flex gap-4">
              <Button
                variant="link"
                className="h-auto p-0 text-xs text-[#6d28d9] hover:text-[#4c1d95] sm:text-sm"
                asChild
              >
                <Link to={"#"}>Privacy</Link>
              </Button>
              <Button
                variant="link"
                className="h-auto p-0 text-xs text-[#6d28d9] hover:text-[#4c1d95] sm:text-sm"
                asChild
              >
                <Link to={"#"}>Terms</Link>
              </Button>
              <Button
                variant="link"
                className="h-auto p-0 text-xs text-[#6d28d9] hover:text-[#4c1d95] sm:text-sm"
                asChild
              >
                <Link to={"#"}>Contact</Link>
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </ScrollArea>
  );
}
