import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Question } from "@/utils";
import { Check, CheckCircle, Clock, HelpCircle, X } from "lucide-react";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  answer: z.string().min(1, "Please select an answer"),
});

type FormValues = z.infer<typeof formSchema>;

interface GamePlayFormProps {
  question: Question;
  handleSubmit: (
    destinationId: string,
  ) => Promise<{ validity: boolean; destinationId: string } | null>;
}

export default function GamePlayForm({
  question,
  handleSubmit,
}: GamePlayFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    validity: boolean;
    destinationId: string;
  } | null>(null);
  const [timeRemaining] = useState(30);
  const [showHint, setShowHint] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answer: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    const submissionResult = await handleSubmit(values.answer);
    setResult(submissionResult);
    setIsSubmitting(false);
  };

  const getOptionStyle = (optionId: string, fieldValue: string) => {
    if (!result) return "peer-data-[state=checked]:bg-neutral-200";

    if (optionId === result.destinationId) return "bg-green-100 text-green-700";
    if (fieldValue === optionId) return "bg-red-100 text-red-700";
    return "";
  };

  const renderResultIcon = (optionId: string, fieldValue: string) => {
    if (!result) return null;

    if (optionId === result.destinationId) {
      return <CheckCircle className="h-5 w-5 text-green-700" />;
    }
    if (fieldValue === optionId) {
      return <X className="h-5 w-5 text-red-700" />;
    }
    return null;
  };

  return (
    <div className="container mx-auto mt-20 max-w-4xl rounded-md border-[#e9d5ff] bg-white/80 shadow-md backdrop-blur-sm">
      <div className="rounded-t-md bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] p-6 py-8">
        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            className="rounded-full border-white/30 bg-white/20 text-white backdrop-blur-sm"
          >
            Question {question.questionNumber}/{question.totalQuestions}
          </Badge>
          <Badge
            variant="outline"
            className="rounded-full border-white/30 bg-white/20 text-white backdrop-blur-sm"
          >
            <Clock className="mr-2 h-4 w-4" />
            <span className="font-medium">{timeRemaining}s</span>
          </Badge>
        </div>
      </div>

      <div className="flex flex-col gap-6 p-6">
        <Alert className="min-h-24 rounded-md border-[#d8b4fe] bg-[#f5edff] font-semibold text-[#6d28d9] italic">
          <AlertDescription className="space-y-2 text-balance text-[#6d28d9]">
            {question.clues.map((clue, index) => (
              <div key={index}>{`${index + 1}. ${clue.text}`}</div>
            ))}
          </AlertDescription>
        </Alert>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid grid-cols-1 gap-4 md:grid-cols-2"
                      disabled={isSubmitting || !!result}
                    >
                      {question?.options.map((option) => (
                        <FormItem key={option.id}>
                          <FormControl>
                            <RadioGroupItem
                              value={option.id}
                              id={option.id}
                              className="peer sr-only"
                            />
                          </FormControl>
                          <FormLabel
                            htmlFor={option.id}
                            className={cn(
                              "flex w-full cursor-pointer items-center justify-between rounded-md border p-5",
                              getOptionStyle(option.id, field.value),
                            )}
                          >
                            <span>{`${option.city}, ${option.country}`}</span>
                            {renderResultIcon(option.id, field.value)}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-fit self-end rounded-md bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white transition-opacity hover:opacity-90"
              disabled={isSubmitting || !!result}
              size="default"
            >
              <Check className="mr-2 h-5 w-5" />
              Submit Answer
            </Button>
          </form>
        </Form>

        <div className="w-full">
          {showHint ? (
            <Alert
              variant="default"
              className="rounded-xl border-yellow-300 bg-yellow-100 text-yellow-500"
            >
              <HelpCircle className="h-5 w-5" />
              <AlertTitle>Hint</AlertTitle>
              <AlertDescription>
                {question.triviaItems[0].text}
              </AlertDescription>
            </Alert>
          ) : (
            <Button
              variant="outline"
              className="w-fit rounded-xl border-[#d8b4fe] text-[#7c3aed] hover:bg-[#f5edff] hover:text-[#6d28d9]"
              onClick={() => setShowHint(true)}
              disabled={showHint || isSubmitting || !!result}
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              Show Hint
            </Button>
          )}
        </div>

        {result && (
          <Alert
            variant="default"
            className={cn(
              "rounded-xl",
              result.validity
                ? "border-green-300 bg-green-100 text-green-700"
                : "border-red-300 bg-red-100 text-red-700",
            )}
          >
            {result.validity ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <X className="h-5 w-5" />
            )}
            <AlertTitle>{result.validity ? "Correct" : "Wrong"}</AlertTitle>
            <AlertDescription>{question.funFacts[0].text}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
