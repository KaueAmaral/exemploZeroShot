import React from 'react';
import { 
  Compass, 
  FlaskConical, 
  Trophy, 
  ShoppingBag, 
  User, 
  Flame, 
  Heart, 
  Coins, 
  Volume2, 
  VolumeX, 
  Sparkles,
  Zap
} from 'lucide-react';
import { UserStats } from '../types';

interface NavbarProps {
  activeTab: 'map' | 'playground' | 'quests' | 'leaderboard' | 'shop' | 'profile';
  setActiveTab: (tab: 'map' | 'playground' | 'quests' | 'leaderboard' | 'shop' | 'profile') => void;
  stats: UserStats;
  levelInfo: { level: number; title: string; progressPercent: number };
  toggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  stats,
  levelInfo,
  toggleSound
}) => {
  const navItems: { id: 'map' | 'playground' | 'quests' | 'leaderboard' | 'shop' | 'profile'; label: string; icon: React.ReactNode }[] = [
    { id: 'map', label: 'Trilhas', icon: <Compass className="w-4 h-4" /> },
    { id: 'playground', label: 'Laboratório', icon: <FlaskConical className="w-4 h-4" /> },
    { id: 'quests', label: 'Missões', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'leaderboard', label: 'Ranking', icon: <Trophy className="w-4 h-4" /> },
    { id: 'shop', label: 'Loja', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'profile', label: 'Perfil', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/95 backdrop-blur border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Zone 1: Single Brand Wordmark */}
        <div 
          onClick={() => setActiveTab('map')}
          className="flex items-center gap-2.5 cursor-pointer select-none shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-amber-500/20">
            ⚡
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1">
            Code<span className="text-amber-400">Quest</span>
          </span>
        </div>

        {/* Zone 2: Navigation Links (1-2 word labels, single line) */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-amber-400/10 text-amber-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                {item.icon}
                <span className="hidden md:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions & Gamification Status Bar */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Hearts Pill */}
          <div 
            title={`${stats.hearts}/${stats.maxHearts} Corações restantes`}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs font-semibold text-rose-400"
          >
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>{stats.hearts}</span>
          </div>

          {/* DevCoins Pill */}
          <div 
            title={`${stats.coins} DevCoins acumuladas`}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs font-semibold text-amber-400"
          >
            <Coins className="w-4 h-4 text-amber-400" />
            <span>{stats.coins}</span>
          </div>

          {/* Streak Pill */}
          <div 
            title={`${stats.streak} dias de sequência de estudo!`}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs font-semibold text-orange-400"
          >
            <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-pulse" />
            <span>{stats.streak}d</span>
          </div>

          {/* Level Pill */}
          <button
            onClick={() => setActiveTab('profile')}
            title={`Nível ${levelInfo.level}: ${levelInfo.title} (${stats.xp} XP)`}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold hover:bg-amber-500/20 transition-colors"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Nv.{levelInfo.level}</span>
          </button>

          {/* Audio toggle button */}
          <button
            onClick={toggleSound}
            aria-label={stats.soundEnabled ? 'Silenciar efeitos sonoros' : 'Ativar efeitos sonoros'}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            {stats.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-slate-300" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

        </div>

      </div>
    </header>
  );
};
