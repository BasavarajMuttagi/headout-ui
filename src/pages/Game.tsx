import apiClient from "@/axios/apiClient";
import Footer from "@/components/Footer";
import GamePlayForm from "@/components/GamePlayForm";
import Header from "@/components/Header";
import { Confetti, ConfettiRef } from "@/components/magicui/confetti";
import SharePreview from "@/components/SharePreview";
import { ConfettiSideCannons } from "@/components/SideCannons";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getToken, Question } from "@/utils";
import { isAxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
export default function Game() {
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [question, setQuestion] = useState<Question | null>(null);
  const [isLoadingQuestion, setLoadingQuestion] = useState(false);
  const confettiRef = useRef<ConfettiRef>(null);
  const cannonRef = useRef<ConfettiRef>(null);
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const token = getToken();
  const [score, setScore] = useState(0);
  const [answeredInSec, setAnsweredInSec] = useState(0);
  const getQuestions = useCallback(
    async (questionNumber: number) => {
      setLoadingQuestion(true);
      try {
        const response = await apiClient.get(
          `game/question/${sessionId}/${questionNumber}`,
        );
        setQuestion(response.data);
      } catch (error) {
        console.error("Error fetching question:", error);
      } finally {
        setLoadingQuestion(false);
      }
    },
    [sessionId],
  );

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else if (!sessionId) {
      navigate("/lobby");
    } else {
      getQuestions(1);
    }
  }, [token, sessionId, navigate, getQuestions]);

  const getFactor = () => {
    if (answeredInSec > 20) {
      return 1;
    } else if (answeredInSec > 10) {
      return 0.5;
    } else {
      return 0.2;
    }
  };
  const handleSubmit = useCallback(
    async (destinationId: string) => {
      if (!question) return null;
      try {
        const response = await apiClient.post(
          `/game/answer/${sessionId}/${question.id}`,
          {
            destinationId,
            questionNumber: question.questionNumber,
          },
        );
        if (response.data.validity) {
          confettiRef.current?.fire();
          const s = 10 * getFactor();
          console.log(s,answeredInSec,score)
          // console.log(getFactor(), answeredInSec);
          setScore(score + s);
        }
        if (response.data.isComplete) {
          cannonRef.current?.fire();
          setIsGameCompleted(true);
        }
        // getCurrentScore();
        return response.data;
      } catch (error) {
        console.log("Error submitting answer:", error);
        if (isAxiosError(error)) {
          toast.error(error.response?.data.message);
          return;
        }
        return null;
      }
    },
    [question, sessionId],
  );

  const onNextQuestion = useCallback(() => {
    if (question) {
      const nextQuestionNumber = question.questionNumber + 1;
      if (nextQuestionNumber <= question.totalQuestions) {
        getQuestions(nextQuestionNumber);
      }
    }
  }, [question, getQuestions]);

  const playAgain = useCallback(async () => {
    try {
      const sessionRes = await apiClient.get("/game/start", {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate(`/game/${sessionRes.data.id}`, { replace: true });
      setIsGameCompleted(false);
      setScore(0);
    } catch (error) {
      console.error(error);
    }
  }, [token, navigate]);

  // const getCurrentScore = useCallback(async () => {
  //   try {
  //     const res = await apiClient.get(`/game/session/${sessionId}/score`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     setScore(res.data.score);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Failed to fetch score");
  //   }
  // }, [sessionId, token]);

  return (
    <ScrollArea className="relative h-screen">
      <div className="font-jakarta relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-[#f5edff] via-[#e6f0ff] to-[#e6fff0]">
        <Header />
        <Confetti
          ref={confettiRef}
          className="pointer-events-none absolute inset-0 z-20 w-full"
        />
        {<ConfettiSideCannons ref={cannonRef} />}
        <main className="z-10 flex flex-1 flex-col justify-center px-4 py-6">
          <div className="container mx-auto flex max-w-4xl justify-center">
            {isLoadingQuestion ? (
              <Loader2 size={40} className="animate-spin text-blue-500" />
            ) : question ? (
              <GamePlayForm
                question={question}
                handleSubmit={handleSubmit}
                onNextQuestion={onNextQuestion}
                score={score}
                setAnsweredInSec={setAnsweredInSec}
              />
            ) : null}
          </div>
          {isGameCompleted && (
            <div className="mt-10 flex w-full flex-col items-center space-y-5 space-x-0 text-center sm:flex-row sm:items-center sm:justify-center sm:space-y-0 sm:space-x-5">
              <Button
                onClick={playAgain}
                className="w-fit cursor-pointer rounded-md bg-gradient-to-r from-pink-500 to-[#6d28d9] text-white transition-opacity hover:opacity-90"
                size="lg"
              >
                Play Again
              </Button>
              <SharePreview sessionId={sessionId!} />
            </div>
          )}
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
