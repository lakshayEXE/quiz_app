export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  points: number;
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  answers: string[];
  isComplete: boolean;
  streak: number;
  timeBonus: number;
}