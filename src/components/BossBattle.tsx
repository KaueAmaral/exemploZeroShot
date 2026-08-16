import React, { useState } from 'react';
import { Swords, ShieldAlert, Heart, Zap, Sparkles } from 'lucide-react';
import { Exercise } from '../types';
import { soundManager } from '../utils/audio';

interface BossBattleProps {
  exercise: Exercise;
  onAnswer: (isCorrect: boolean) => void;
  isAnswered: boolean;
}

export const BossBattle: React.FC<BossBattleProps> = ({
  exercise,
  onAnswer,
  isAnswered,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [bossHp, setBossHp] = useState<number>(100);
  const [isHit, setIsHit] = useState<boolean>(false);

  const handleSelect = (optionId: string, isCorrect: boolean) => {
    if (isAnswered) return;
    setSelectedOption(optionId);
    soundManager.playClick();

    if (isCorrect) {
      soundManager.playBossHit();
      setIsHit(true);
      setBossHp((prev) => Math.max(0, prev - 50));
      setTimeout(() => setIsHit(false), 600);
    }
    onAnswer(isCorrect);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Boss Arena Banner */}
      <div className="w-full relative rounded-2xl bg-gradient-to-b from-rose-950/60 via-slate-900 to-slate-900 border border-rose-900/60 p-6 mb-6 overflow-hidden">
        {/* Boss Visual Header */}
        <div className="flex flex-col items-center text-center relative z-10">
          <div
            className={`w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-rose-600 to-red-900 border-2 border-rose-400/80 flex items-center justify-center text-5xl sm:text-6xl shadow-2xl transition-transform duration-300 ${
              isHit ? 'scale-90 rotate-6 ring-4 ring-amber-400' : 'animate-pulse'
            }`}
          >
            👾
          </div>

          <div className="mt-3">
            <div className="flex items-center justify-center gap-1.5 text-xs font-black uppercase tracking-widest text-rose-400">
              <Swords className="w-3.5 h-3.5" />
              <span>Chefe: Guardião dos Bugs Infinitos</span>
            </div>
            <div className="text-xl font-extrabold text-white mt-0.5">
              Nível Boss 100 HP
            </div>
          </div>

          {/* Boss HP Bar */}
          <div className="w-full max-w-sm mt-3">
            <div className="flex items-center justify-between text-xs font-mono font-bold mb-1">
              <span className="text-rose-400 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" /> HP do Monstro
              </span>
              <span className="text-slate-300">{bossHp}/100</span>
            </div>
            <div className="w-full h-3.5 bg-slate-950 rounded-full border border-slate-800 p-0.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-600 to-red-500 rounded-full transition-all duration-500"
                style={{ width: `${bossHp}%` }}
              />
            </div>
          </div>
        </div>

        {/* Attack spark effect */}
        {isHit && (
          <div className="absolute inset-0 flex items-center justify-center bg-rose-500/20 z-20 pointer-events-none">
            <div className="text-3xl font-black text-amber-300 animate-bounce">
              💥 CRÍTICO! -50 HP
            </div>
          </div>
        )}
      </div>

      {/* Code / Question prompt */}
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-6">
        <p className="text-slate-200 text-base font-semibold leading-relaxed mb-4">
          {exercise.question}
        </p>

        {exercise.codeSnippet && (
          <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-sm text-amber-300 whitespace-pre-wrap mb-4">
            {exercise.codeSnippet}
          </div>
        )}

        {/* Options */}
        <div className="grid grid-cols-1 gap-2.5">
          {exercise.options?.map((option) => {
            const isSelected = selectedOption === option.id;
            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id, option.isCorrect)}
                disabled={isAnswered}
                className={`w-full flex items-center justify-between p-4 rounded-xl text-left font-medium text-sm transition-all border cursor-pointer ${
                  isSelected
                    ? option.isCorrect
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/30'
                      : 'bg-rose-950/60 border-rose-500 text-rose-200 ring-2 ring-rose-500/30'
                    : 'bg-slate-800/80 border-slate-700/80 text-slate-200 hover:border-amber-500/60 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-slate-700/80 text-slate-300 font-bold text-xs flex items-center justify-center uppercase">
                    {option.id}
                  </div>
                  <span>{option.text}</span>
                </div>

                <div className="shrink-0">
                  <Zap className="w-4 h-4 text-amber-400" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
