import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Clock, HelpCircle } from "lucide-react";
import { useState } from "react";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

export default function GamePlayForm() {
  const [selectedOption, setSelectedOption] = useState("");
  const [timeRemaining] = useState(30);
  const [showHint, setShowHint] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock question data
  const question = {
    id: 1,
    clue: "This ancient wonder sits at the edge of a desert plateau, with the body of a lion and the head of a human. It has stood guard for over 4,500 years near three famous pyramids.",
    options: [
      { id: "a", text: "The Sphinx of Giza", color: "bg-[#8b5cf6]" },
      { id: "b", text: "Petra", color: "bg-[#3b82f6]" },
      { id: "c", text: "Machu Picchu", color: "bg-[#10b981]" },
      { id: "d", text: "Angkor Wat", color: "bg-[#f43f5e]" },
    ],
    correctAnswer: "a",
    hint: "It's located in Egypt and is one of the world's oldest and largest monumental sculptures.",
    difficulty: "Medium",
    points: 150,
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="container mx-auto mt-20 max-w-4xl rounded-md border-[#e9d5ff] bg-white/80 shadow-md backdrop-blur-sm">
      {/* Header */}
      <div className="rounded-t-md bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] p-6">
        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            className="rounded-full border-white/30 bg-white/20 text-white backdrop-blur-sm"
          >
            Question 1/10
          </Badge>

          <Badge
            variant="outline"
            className="rounded-full border-white/30 bg-white/20 text-white backdrop-blur-sm"
          >
            <Clock />
            <span className="font-medium">{timeRemaining}s</span>
          </Badge>
        </div>
      </div>

      <div className="flex flex-col gap-6 p-6">
        {/* Question */}
        <Alert className="rounded-xl border-[#d8b4fe] bg-[#f5edff] text-[#6d28d9]">
          <AlertDescription className="text-[#6d28d9]">
            {question.clue}
          </AlertDescription>
        </Alert>

        {/* Answer options using Radio Group */}
        <div className="">
          <RadioGroup
            value={selectedOption}
            onValueChange={(value) =>
              !isSubmitted && value && setSelectedOption(value)
            }
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            {question.options.map((option) => (
              <div key={option.id} className="flex items-center">
                <RadioGroupItem
                  value={option.id}
                  id={option.id}
                  className="peer sr-only"
                  onClick={() => !isSubmitted && setSelectedOption(option.id)}
                />
                <Label
                  htmlFor={option.id}
                  className="w-full cursor-pointer rounded-md border p-5 peer-data-[state=checked]:bg-neutral-200"
                >
                  <span>{option.text}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Bottom section with hint and submit button */}
        <div className="flex flex-col">
          {/* Submit button */}
          <Button
            className="w-fit self-end rounded-md bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white transition-opacity hover:opacity-90"
            onClick={handleSubmit}
            disabled={!selectedOption || isSubmitted}
            size="sm"
          >
            <Check className="mr-2 h-5 w-5" />
            Submit Answer
          </Button>
        </div>
        {/* Hint section */}
        <div className="w-full">
          {showHint ? (
            <Alert
              variant="default"
              className="rounded-xl border-yellow-300 bg-yellow-100 text-yellow-500"
            >
              <HelpCircle className="h-5 w-5" />
              <AlertTitle>Hint</AlertTitle>
              <AlertDescription>{question.hint}</AlertDescription>
            </Alert>
          ) : (
            <Button
              variant="outline"
              className="w-fit rounded-xl border-[#d8b4fe] text-[#7c3aed] hover:bg-[#f5edff] hover:text-[#6d28d9]"
              onClick={() => setShowHint(true)}
              disabled={showHint || isSubmitted}
            >
              <HelpCircle className="h-4 w-4" />
              Show Hint
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
