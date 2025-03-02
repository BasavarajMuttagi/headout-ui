import {
  Award,
  ChevronRight,
  Globe,
  Menu,
  Play,
  Share2,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  // Add state for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
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
              <Link
                to={"#"}
                className="text-[#4c1d95] transition-colors hover:text-[#6d28d9]"
              >
                Leaderboard
              </Link>
              <Link
                to={"#"}
                className="text-[#4c1d95] transition-colors hover:text-[#6d28d9]"
              >
                About
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="text-[#6d28d9] sm:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>

            {/* Login in button - hidden on mobile */}
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="absolute top-16 right-0 left-0 z-30 rounded-b-lg bg-white/95 p-4 shadow-lg backdrop-blur-sm sm:hidden">
            <div className="flex flex-col space-y-3">
              <Link
                to={"#"}
                className="border-b border-purple-100 py-2 text-[#4c1d95]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Leaderboard
              </Link>
              <Link
                to={"#"}
                className="border-b border-purple-100 py-2 text-[#4c1d95]"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="z-10 flex flex-1 items-center justify-center px-4 py-8 sm:py-0">
        <div className="grid items-center gap-8 sm:mx-3 lg:grid-cols-2">
          <div className="max-w-xl space-y-4 text-center sm:space-y-6 lg:text-left">
            <div className="inline-block rounded-full border border-[#d8b4fe] bg-[#f3e8ff] px-3 py-1 text-xs font-medium text-[#7e22ce] sm:text-sm">
              The Ultimate Travel Guessing Game ✨
            </div>
            <h1 className="mt-5 text-3xl leading-tight font-bold text-[#4c1d95] sm:mt-0 sm:text-4xl md:text-5xl lg:text-6xl">
              <span>Guess Famous Places From {""}</span>
              <span className="relative w-fit">
                Cryptic Clues
                <span className="absolute right-0 -bottom-[1px] left-0 -z-10 h-2 -rotate-1 bg-pink-500/40 sm:bottom-2 sm:h-3"></span>
              </span>
            </h1>
            <p className="text-base text-[#6d28d9] sm:text-lg">
              Test your geography knowledge with mysterious clues about famous
              destinations. Guess correctly to unlock fun facts and challenge
              your friends to beat your score!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:justify-start">
              <div className="group relative">
                <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] opacity-75 blur transition duration-200 group-hover:opacity-100"></div>
                <Link to="/lobby">
                  <button className="relative flex cursor-pointer items-center rounded-lg bg-[#7c3aed] px-4 py-2 text-sm leading-none font-medium text-white sm:px-6 sm:py-3 sm:text-base">
                    <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Play Now
                    <ChevronRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                </Link>
              </div>
              <button className="flex items-center rounded-lg border-2 border-[#7c3aed] px-4 py-2 text-sm leading-none font-medium text-[#7c3aed] transition-colors hover:bg-[#7c3aed]/5 sm:px-6 sm:py-2.5 sm:text-base">
                <Share2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Challenge a Friend
              </button>
            </div>
          </div>

          {/* Card */}
          <div className="relative mt-4 sm:mt-0">
            <div className="relative mx-auto max-w-md rounded-xl border border-[#e9d5ff] bg-white/90 p-4 shadow-xl backdrop-blur-sm sm:p-6">
              <div className="absolute -top-3 -right-3 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] px-3 py-1 text-xs font-medium text-white shadow-lg sm:text-sm">
                Sample
              </div>
              <div className="space-y-3 sm:space-y-4">
                <p className="text-base font-medium text-gray-800 italic sm:text-lg">
                  "I stand tall with my iron lattice, overlooking a city of
                  lights and romance. Built for a world fair, I was once
                  considered an eyesore but now I'm an icon."
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
                  {[
                    "Tokyo Tower",
                    "Eiffel Tower",
                    "Space Needle",
                    "CN Tower",
                  ].map((option, index) => (
                    <button
                      key={index}
                      className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 transition-colors hover:border-[#d8b4fe] hover:bg-[#f5f3ff] sm:text-base"
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                  <div className="flex items-center gap-1">
                    <div className="relative">
                      <Award className="h-4 w-4 text-yellow-500 sm:h-5 sm:w-5" />
                      <div className="absolute inset-0 animate-ping text-yellow-500 opacity-30"></div>
                    </div>
                    <span className="text-xs text-gray-600 sm:text-sm">
                      Score: 0/0
                    </span>
                  </div>
                  <button className="rounded-lg bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] px-2 py-1 text-xs font-medium text-white shadow-md transition-shadow hover:shadow-lg sm:px-3 sm:py-1.5 sm:text-sm">
                    Submit Answer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Decorative Elements */}
      <div className="absolute right-0 bottom-0 left-0 z-0 h-48 bg-gradient-to-t from-white/80 to-transparent"></div>

      {/* Floating Elements */}
      <div className="animate-float absolute top-20 right-20 h-16 w-16 rounded-full bg-yellow-400 opacity-50"></div>
      <div
        className="animate-float absolute bottom-40 left-20 h-24 w-24 rounded-full bg-blue-400 opacity-50"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="animate-float absolute top-40 left-1/4 h-12 w-12 rounded-full bg-green-400 opacity-50"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="animate-float absolute right-1/4 bottom-20 h-20 w-20 rounded-full bg-red-400 opacity-50"
        style={{ animationDelay: "3s" }}
      ></div>

      {/* Cloud-like elements */}
      <div className="absolute right-0 bottom-0 left-0 z-0 h-32">
        <div className="absolute bottom-0 left-[10%] h-20 w-40 rounded-t-full bg-white/80"></div>
        <div className="absolute bottom-0 left-[25%] h-28 w-60 rounded-t-full bg-white/80"></div>
        <div className="absolute bottom-0 left-[50%] h-24 w-80 rounded-t-full bg-white/80"></div>
        <div className="absolute bottom-0 left-[75%] h-16 w-40 rounded-t-full bg-white/80"></div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full px-4 py-4">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 sm:flex-row">
          <p className="text-xs text-[#6d28d9] sm:text-sm">
            © {new Date().getFullYear()} Globetrotter Challenge
          </p>
          <div className="flex gap-4">
            <Link
              to={"#"}
              className="text-xs text-[#6d28d9] transition-colors hover:text-[#4c1d95] sm:text-sm"
            >
              Privacy
            </Link>
            <Link
              to={"#"}
              className="text-xs text-[#6d28d9] transition-colors hover:text-[#4c1d95] sm:text-sm"
            >
              Terms
            </Link>
            <Link
              to={"#"}
              className="text-xs text-[#6d28d9] transition-colors hover:text-[#4c1d95] sm:text-sm"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
