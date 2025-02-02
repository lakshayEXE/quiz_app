import React from 'react';
import { Trophy, Timer, Zap } from 'lucide-react';
import type { Question } from '../types';

interface QuizCardProps {
  question: Question;
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
  timeLeft: number;
  streak: number;
}

export function QuizCard({ question, selectedAnswer, onAnswerSelect, timeLeft, streak }: QuizCardProps) {
  return (
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5 text-blue-500" />
          <span className="text-lg font-semibold text-blue-500">{timeLeft}s</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          <span className="text-lg font-semibold text-yellow-500">Streak: {streak}</span>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-purple-500" />
          <span className="text-lg font-semibold text-purple-500">{question.points} pts</span>
        </div>
      </div>
      
      <h2 className="text-xl font-bold text-gray-800 mb-6">{question.question}</h2>
      
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(option)}
            className={`w-full p-4 text-left rounded-lg transition-all ${
              selectedAnswer === option
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}