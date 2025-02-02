import React, { useState, useEffect } from 'react';
import { QuizCard } from './components/QuizCard';
import { QuizResult } from './components/QuizResult';
import { StartScreen } from './components/StartScreen';
import { sampleQuizData } from './data/sampleQuizData';
import type { Question, QuizState } from './types';

const QUESTION_TIMER = 30; // seconds per question
const TIME_BONUS_FACTOR = 0.5; // points per second remaining

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIMER);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    score: 0,
    answers: [],
    isComplete: false,
    streak: 0,
    timeBonus: 0,
  });
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    // Using sample data instead of API
    try {
      setQuestions(sampleQuizData);
      setLoading(false);
    } catch (err) {
      setError('Failed to load quiz. Please try again later.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let timer: number;
    if (gameStarted && !quizState.isComplete && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, quizState.isComplete, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && !quizState.isComplete) {
      handleAnswerSubmit(selectedAnswer || '');
    }
  }, [timeLeft]);

  const handleStart = () => {
    setGameStarted(true);
    setTimeLeft(QUESTION_TIMER);
  };

  const handleAnswerSubmit = (answer: string) => {
    const currentQuestion = questions[quizState.currentQuestion];
    const isCorrect = answer === currentQuestion.correctAnswer;
    const timeBonus = Math.round(timeLeft * TIME_BONUS_FACTOR);

    setQuizState((prev) => ({
      ...prev,
      score: prev.score + (isCorrect ? currentQuestion.points + timeBonus : 0),
      streak: isCorrect ? prev.streak + 1 : 0,
      timeBonus: prev.timeBonus + (isCorrect ? timeBonus : 0),
      answers: [...prev.answers, answer],
      currentQuestion: prev.currentQuestion + 1,
      isComplete: prev.currentQuestion + 1 >= questions.length,
    }));

    setSelectedAnswer(null);
    setTimeLeft(QUESTION_TIMER);
  };

  const handleRestart = () => {
    setQuizState({
      currentQuestion: 0,
      score: 0,
      answers: [],
      isComplete: false,
      streak: 0,
      timeBonus: 0,
    });
    setGameStarted(false);
    setTimeLeft(QUESTION_TIMER);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">Loading quiz...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl font-semibold text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {!gameStarted && !quizState.isComplete && (
        <StartScreen onStart={handleStart} />
      )}
      
      {gameStarted && !quizState.isComplete && (
        <QuizCard
          question={questions[quizState.currentQuestion]}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={(answer) => {
            setSelectedAnswer(answer);
            handleAnswerSubmit(answer);
          }}
          timeLeft={timeLeft}
          streak={quizState.streak}
        />
      )}
      
      {quizState.isComplete && (
        <QuizResult
          score={quizState.score}
          totalQuestions={questions.length}
          streak={quizState.streak}
          timeBonus={quizState.timeBonus}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;