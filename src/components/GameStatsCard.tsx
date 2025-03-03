import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { GameStats } from "@/utils";
import { CheckCircle, Trophy } from "lucide-react";
import { forwardRef } from "react";

interface GameStatsCardProps {
  stats: GameStats;
}

const GameStatsCard = forwardRef<HTMLDivElement, GameStatsCardProps>(
  ({ stats }, ref) => {
    const percentageCorrect =
      (stats?._count.sessionQuestions / stats.totalQuestions) * 100;

    return (
      <Card
        ref={ref}
        className="w-[350px] bg-gradient-to-br from-purple-500 to-pink-500 text-white"
      >
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Game Stats</span>
            <Trophy className="h-6 w-6" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Total Score</span>
              <Badge variant="secondary" className="text-lg">
                {stats.score * 10}
              </Badge>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span>Correct Answers</span>
                <span>
                  {stats._count.sessionQuestions} / {stats.totalQuestions}
                </span>
              </div>
              <Progress value={percentageCorrect} className="h-2" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Correct: {stats._count.sessionQuestions}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  },
);

export default GameStatsCard;
