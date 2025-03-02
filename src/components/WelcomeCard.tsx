import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronRight, Compass, Loader2, Play, Trophy } from "lucide-react";
import { FormEvent, useState } from "react";

interface MainCardProps {
  token: string | null;
  isLoading: boolean;
  onLogin: (userName: string) => void;
}

export default function WelcomeCard({
  token,
  isLoading,
  onLogin,
}: MainCardProps) {
  const [userName, setUserName] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onLogin(userName);
  };

  return (
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
            Test your geography knowledge with mysterious clues about famous
            destinations. Guess correctly to unlock fun facts and challenge your
            friends to beat your score!
          </p>

          <div className="mb-8 grid w-full max-w-3xl gap-4 sm:grid-cols-2">
            <FeatureCard
              icon={
                <Compass className="mb-2 h-8 w-8 self-center text-[#8b5cf6]" />
              }
              title="How to Play"
              items={[
                "1. Read the cryptic clue about a famous place",
                "2. Select your answer from multiple options",
                "3. Earn points for correct answers",
                "4. Discover fascinating facts about each location",
              ]}
            />
            <FeatureCard
              icon={
                <Trophy className="mb-2 h-8 w-8 self-center text-[#8b5cf6]" />
              }
              title="Game Features"
              items={[
                "1. 100+ destinations from around the world",
                "2. Challenge friends to beat your score",
                "3. Unlock badges and achievements",
                "4. Learn interesting facts about each place",
              ]}
            />
          </div>

          <form
            className="flex flex-col items-center gap-4"
            onSubmit={handleSubmit}
          >
            {!token && (
              <Input
                type="text"
                placeholder="username"
                required
                onChange={(e) => setUserName(e.target.value)}
                className="w-full"
              />
            )}

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
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
}

function FeatureCard({ icon, title, items }: FeatureCardProps) {
  return (
    <Card className="border-[#e9d5ff] bg-white/90">
      <CardContent className="flex flex-col items-start p-4">
        {icon}
        <h3 className="mb-3 self-center font-bold text-[#4c1d95]">{title}</h3>
        <ul className="space-y-2 text-start text-sm font-medium text-gray-700">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
