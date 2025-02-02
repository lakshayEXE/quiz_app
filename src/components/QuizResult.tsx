import React from 'react';
import { Trophy, Award, Zap, Timer } from 'lucide-react';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  streak: number;
  timeBonus: number;
  onRestart: () => void;
}

export function QuizResult({ score, totalQuestions, streak, timeBonus, onRestart }: QuizResultProps) {
  const percentage = Math.round((score / (totalQuestions * 10)) * 100);
  
  return (
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 text-center">
      <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Quiz Complete!</h2>
      
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <Award className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Score</p>
          <p className="text-xl font-bold text-blue-500">{score}</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <Zap className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Best Streak</p>
          <p className="text-xl font-bold text-purple-500">{streak}</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <Timer className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Time Bonus</p>
          <p className="text-xl font-bold text-green-500">+{timeBonus}</p>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-500 rounded-full h-4 transition-all duration-1000"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-gray-600 mt-2">{percentage}% Correct</p>
      </div>
      
      <button
        onClick={onRestart}
        className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}