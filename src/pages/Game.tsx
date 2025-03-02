import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getDecodedToken, getToken, setToken } from "@/utils";
import { Globe, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Game() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = getDecodedToken();
  const token = getToken();
  const [isLoading, setLoading] = useState(false);
  const handleLogout = () => {
    setToken("");
    location.reload();
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
              {token && (
                <div className="hidden items-center gap-2 sm:flex">
                  <Avatar className="h-8 w-8 border-2 border-[#8b5cf6]">
                    <AvatarFallback className="capitalize">
                      {user.username.substring(0, 1)}{" "}
                      {user.username.substring(user.username.length - 1)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-[#4c1d95]">
                    {user && user.username}
                  </span>
                </div>
              )}
              {token && (
                <Button
                  className="hidden cursor-pointer bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white sm:flex"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </Button>
              )}
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <Card className="absolute top-16 right-0 left-0 z-30 rounded-b-lg bg-white/95 p-4 shadow-lg backdrop-blur-sm sm:hidden">
              <CardContent className="p-0 pt-4">
                <div className="flex flex-col space-y-3">
                  {token && (
                    <div className="flex items-center gap-2 pb-2">
                      <Avatar className="h-8 w-8 border-2 border-[#8b5cf6]">
                        <AvatarFallback className="capitalize">
                          {user.username.substring(0, 1)}{" "}
                          {user.username.substring(user.username.length - 1)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-[#4c1d95]">
                        {user && user.username}
                      </span>
                    </div>
                  )}

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

                  {token && (
                    <Button
                      className="mt-2 bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </header>

        {/* Main Content */}
        <main className="z-10 flex flex-1 flex-col justify-center px-4 py-6">
          <div className="container mx-auto max-w-4xl">
            {/* Game intro section */}
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
