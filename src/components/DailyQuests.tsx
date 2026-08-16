import React from 'react';
import { Sparkles, CheckCircle2, Gift, Clock, Flame, Zap } from 'lucide-react';
import { DailyQuest, UserStats } from '../types';

interface DailyQuestsProps {
  stats: UserStats;
  onClaim: (questId: string) => void;
}

export const DailyQuests: React.FC<DailyQuestsProps> = ({ stats, onClaim }) => {
  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-4">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-slate-900 border border-amber-500/20 p-6 mb-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Clock className="w-3.5 h-3.5" />
              Atualiza a cada 24 Horas
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Missões Diárias do Dev
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Conclua metas rápidas do dia para acumular DevCoins extras e acelerar seu ganho de XP.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <Flame className="w-5 h-5 text-orange-400 fill-orange-400 animate-pulse" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Sequência</div>
              <div className="text-sm font-extrabold text-orange-400">{stats.streak} Dias Seguidos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quests List */}
      <div className="space-y-4">
        {stats.dailyQuests.map((quest) => {
          const percent = Math.min(100, Math.round((quest.current / quest.target) * 100));
          const canClaim = quest.completed && !quest.claimed;

          return (
            <div
              key={quest.id}
              className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border transition-all ${
                quest.claimed
                  ? 'bg-slate-900/40 border-slate-800/60 opacity-60'
                  : quest.completed
                  ? 'bg-slate-800/90 border-emerald-500/60 ring-1 ring-emerald-500/20 shadow-lg'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-base text-slate-100">{quest.title}</h3>
                  {quest.claimed && (
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800">
                      Resgatado
                    </span>
                  )}
                </div>

                <p className="text-slate-400 text-xs sm:text-sm mb-3">
                  {quest.description}
                </p>

                {/* Progress bar */}
                <div className="w-full max-w-md">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400 mb-1">
                    <span>Progresso</span>
                    <span>
                      {quest.current}/{quest.target} ({percent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        quest.completed ? 'bg-emerald-500' : 'bg-amber-400'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Rewards and Claim Button */}
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center gap-2 text-xs font-bold">
                  <div className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 text-amber-300 flex items-center gap-1 border border-amber-500/20">
                    <Zap className="w-3.5 h-3.5" />
                    +{quest.xpReward} XP
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 text-amber-300 flex items-center gap-1 border border-amber-500/20">
                    +{quest.coinReward} 🪙
                  </div>
                </div>

                <button
                  onClick={() => onClaim(quest.id)}
                  disabled={!canClaim}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                    quest.claimed
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : canClaim
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 animate-bounce'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Gift className="w-4 h-4" />
                  <span>{quest.claimed ? 'Concluída' : canClaim ? 'Resgatar!' : 'Em progresso'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
