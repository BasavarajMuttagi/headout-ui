import apiClient from "@/axios/apiClient";
import GamePlayForm from "@/components/GamePlayForm";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getToken, Question } from "@/utils";
import { Loader2 } from "lucide-react";

export default function Game() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [isLoadingQuestion, setLoadingQuestion] = useState(false);

  const { sessionId } = useParams();
  const navigate = useNavigate();
  const token = getToken();

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
        return response.data;
      } catch (error) {
        console.error("Error submitting answer:", error);
        return null;
      }
    },
    [question, sessionId],
  );

  return (
    <ScrollArea className="h-screen">
      <div className="font-jakarta relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-[#f5edff] via-[#e6f0ff] to-[#e6fff0]">
        <Header />
        <main className="z-10 flex flex-1 flex-col justify-center px-4 py-6">
          <div className="container mx-auto flex max-w-4xl justify-center">
            {isLoadingQuestion ? (
              <Loader2 size={40} className="animate-spin text-blue-500" />
            ) : question ? (
              <GamePlayForm question={question} handleSubmit={handleSubmit} />
            ) : null}
          </div>
        </main>
        <Footer />
      </div>
    </ScrollArea>
  );
}
