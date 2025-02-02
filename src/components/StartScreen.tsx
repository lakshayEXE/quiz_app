import React from 'react';
import { Brain, Trophy, Clock, Zap } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 text-center">
      <div className="mb-8">
        <Brain className="w-16 h-16 text-blue-500 mx-auto" />
        <h1 className="text-3xl font-bold text-gray-800 mt-4">Knowledge Quest</h1>
        <p className="text-gray-600 mt-2">Test your knowledge and earn points!</p>
      </div>
      
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="p-4">
          <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-800">Earn Points</h3>
          <p className="text-sm text-gray-600">Score points for correct answers</p>
        </div>
        
        <div className="p-4">
          <Zap className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-800">Build Streaks</h3>
          <p className="text-sm text-gray-600">Get bonus points for consecutive correct answers</p>
        </div>
        
        <div className="p-4">
          <Clock className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-800">Race Time</h3>
          <p className="text-sm text-gray-600">Answer quickly for time bonuses</p>
        </div>
      </div>
      
      <button
        onClick={onStart}
        className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
      >
        Start Quiz
      </button>
    </div>
  );
}