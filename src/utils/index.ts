import { jwtDecode } from "jwt-decode";
export const getDecodedToken = () => {
  try {
    const token = getToken();
    return jwtDecode(token) as { username: string; userId: string };
  } catch (error) {
    console.log(error);
    return { username: "", userId: "" };
  }
};

export const getToken = () => {
  const token = localStorage.getItem("token") || "";
  return token;
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

type Clue = {
  text: string;
};

type FunFact = {
  text: string;
};

type TriviaItem = {
  text: string;
};

type Option = {
  id: string;
  city: string;
  country: string;
};

export type Question = {
  imageUrl: string | null;
  clues: Clue[];
  funFacts: FunFact[];
  triviaItems: TriviaItem[];
  options: Option[];
  id: string;
  questionNumber: number;
  totalQuestions: number;
};

export type GameStats = {
  totalQuestions: number;
  score: number;
  _count: {
    sessionQuestions: number;
  };
};
