import React from 'react';
import { Trophy, Medal, Flame, TrendingUp, TrendingDown, Minus, Crown, Shield, Sparkles } from 'lucide-react';
import { UserStats, LeaderboardUser } from '../types';
import { INITIAL_LEADERBOARD } from '../data/coursesData';

interface LeaderboardProps {
  stats: UserStats;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ stats }) => {
  // Dynamically insert current user into leaderboard based on their actual XP
  const allUsers: LeaderboardUser[] = INITIAL_LEADERBOARD.map((u) => {
    if (u.isCurrentUser) {
      return {
        ...u,
        name: `${stats.name} (Você)`,
        avatar: stats.selectedAvatar,
        title: stats.selectedTitle,
        xp: stats.xp,
        streak: stats.streak,
      };
    }
    return u;
  }).sort((a, b) => b.xp - a.xp);

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-4">
      {/* League Header */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/30 p-6 mb-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-3xl shadow-inner">
              🏆
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                  Divisão Semanal
                </span>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-800">
                  Liga Ouro
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-white mt-0.5">
                Classificação da Liga dos Devs
              </h1>
              <p className="text-slate-400 text-xs mt-1">
                Os 3 melhores colocados sobem para a prestigiada <strong className="text-slate-200">Liga Diamante</strong> no fim da semana!
              </p>
            </div>
          </div>

          <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Termina em</div>
            <div className="text-sm font-mono font-extrabold text-amber-400">3d 14h 22m</div>
          </div>
        </div>
      </div>

      {/* Promotion Zone Banner */}
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs font-semibold mb-4">
        <Crown className="w-4 h-4 text-amber-400" />
        <span>Zona de Promoção: Top 3 avançam de divisão!</span>
      </div>

      {/* Leaderboard Table / Cards */}
      <div className="space-y-2.5">
        {allUsers.map((user, index) => {
          const rank = index + 1;
          const isTop3 = rank <= 3;
          const isMe = user.isCurrentUser;

          return (
            <div
              key={user.id}
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                isMe
                  ? 'bg-amber-500/10 border-amber-500/60 ring-2 ring-amber-500/30 shadow-lg'
                  : isTop3
                  ? 'bg-slate-900/90 border-slate-700/80 shadow-md'
                  : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-850/60'
              }`}
            >
              {/* Rank & Avatar & User Info */}
              <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                {/* Rank Badge */}
                <div className="w-8 flex items-center justify-center font-extrabold text-sm">
                  {rank === 1 ? (
                    <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center shadow-md">
                      🥇
                    </div>
                  ) : rank === 2 ? (
                    <div className="w-7 h-7 rounded-lg bg-slate-300 text-slate-950 flex items-center justify-center shadow-md">
                      🥈
                    </div>
                  ) : rank === 3 ? (
                    <div className="w-7 h-7 rounded-lg bg-amber-700 text-amber-100 flex items-center justify-center shadow-md">
                      🥉
                    </div>
                  ) : (
                    <span className="text-slate-500 font-mono">#{rank}</span>
                  )}
                </div>

                {/* Avatar Icon */}
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xl shrink-0">
                  {user.avatar}
                </div>

                {/* Name and Title */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold text-sm truncate ${isMe ? 'text-amber-300' : 'text-slate-100'}`}>
                      {user.name}
                    </span>
                    {isMe && (
                      <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 uppercase">
                        Você
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 truncate">
                    {user.title}
                  </div>
                </div>
              </div>

              {/* Stats: Streak & XP */}
              <div className="flex items-center gap-4 shrink-0">
                <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-orange-400">
                  <Flame className="w-3.5 h-3.5 fill-orange-500" />
                  <span>{user.streak}d</span>
                </div>

                <div className="text-right">
                  <div className="font-extrabold text-sm sm:text-base text-white font-mono">
                    {user.xp.toLocaleString()} <span className="text-xs font-sans text-amber-400">XP</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
