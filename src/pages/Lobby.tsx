import {
  ChevronRight,
  Compass,
  Globe,
  LogOut,
  Menu,
  Play,
  Trophy,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Import shadcn components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import GamePlayForm from "@/components/GamePlayForm";

export default function GameLobby() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mock user data
  const user = {
    name: "Alex Johnson",
    level: 8,
    points: 1250,
    rank: 42,
    avatar: "https://i.pravatar.cc/150?img=32",
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

            <div className="flex items-center gap-2 sm:gap-4">
              {/* Desktop navigation */}
              <div className="hidden items-center gap-4 sm:flex">
                <Button
                  variant="link"
                  className="text-[#4c1d95] hover:text-[#6d28d9]"
                  asChild
                >
                  <Link to={"#"}>Leaderboard</Link>
                </Button>
                <Button
                  variant="link"
                  className="text-[#4c1d95] hover:text-[#6d28d9]"
                  asChild
                >
                  <Link to={"#"}>About</Link>
                </Button>
              </div>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="text-[#6d28d9] sm:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </Button>

              {/* User profile */}
              <div className="hidden items-center gap-2 sm:flex">
                <Avatar className="h-8 w-8 border-2 border-[#8b5cf6]">
                  <AvatarImage src={user.avatar} alt="Profile" />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-[#4c1d95]">
                  {user.name}
                </span>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <Card className="absolute top-16 right-0 left-0 z-30 rounded-b-lg bg-white/95 p-4 shadow-lg backdrop-blur-sm sm:hidden">
              <CardContent className="p-0 pt-4">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center gap-2 pb-2">
                    <Avatar className="h-8 w-8 border-2 border-[#8b5cf6]">
                      <AvatarImage src={user.avatar} alt="Profile" />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-[#4c1d95]">
                      {user.name}
                    </span>
                  </div>
                  <Separator className="bg-purple-100" />
                  <Button
                    variant="ghost"
                    className="justify-start px-0 text-[#4c1d95]"
                    asChild
                  >
                    <Link to={"#"} onClick={() => setMobileMenuOpen(false)}>
                      Leaderboard
                    </Link>
                  </Button>
                  <Separator className="bg-purple-100" />
                  <Button
                    variant="ghost"
                    className="justify-start px-0 text-[#4c1d95]"
                    asChild
                  >
                    <Link to={"#"} onClick={() => setMobileMenuOpen(false)}>
                      About
                    </Link>
                  </Button>
                  <Separator className="bg-purple-100" />
                  <Button
                    className="mt-2 bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </header>

        {/* Main Content */}
        <main className="z-10 flex flex-1 flex-col px-4 py-6">
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

                  <div className="flex flex-col items-center gap-4 sm:flex-row">
                    <div className="group relative">
                      <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] opacity-75 blur transition duration-200 group-hover:opacity-100"></div>
                      <Button className="relative bg-[#7c3aed] text-white">
                        <Play className="mr-2 h-5 w-5" />
                        Start Game
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats and leaderboard preview */}
            <div className="grid gap-6 sm:grid-cols-2">
              <Card className="border-[#e9d5ff] bg-white/80 shadow-md backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-bold text-[#4c1d95]">
                    Your Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 px-6 pb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Total Games Played:
                    </span>
                    <span className="font-medium text-[#4c1d95]">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Correct Answers:
                    </span>
                    <span className="font-medium text-[#4c1d95]">187</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Accuracy Rate:
                    </span>
                    <span className="font-medium text-[#4c1d95]">78%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Best Score:</span>
                    <span className="font-medium text-[#4c1d95]">9/10</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#e9d5ff] bg-white/80 shadow-md backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-bold text-[#4c1d95]">
                      Top Players
                    </CardTitle>
                    <Button
                      variant="link"
                      size="sm"
                      className="text-xs font-medium text-[#7c3aed]"
                      asChild
                    >
                      <Link to="#">View Full Leaderboard</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 px-6 pb-6">
                  {[
                    { name: "Sarah K.", score: 2450, rank: 1 },
                    { name: "Mike T.", score: 2340, rank: 2 },
                    { name: "Alex Johnson", score: 1250, rank: 42 },
                  ].map((player, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between rounded-lg p-2 ${
                        player.name === user.name ? "bg-[#f3e8ff]" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={index < 2 ? "default" : "outline"}
                          className={`flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs font-medium ${
                            index < 2
                              ? "bg-[#8b5cf6] text-white"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {player.rank}
                        </Badge>
                        <span
                          className={`text-sm ${player.name === user.name ? "font-medium" : ""}`}
                        >
                          {player.name}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-[#7e22ce]">
                        {player.score}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
          <GamePlayForm />
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
