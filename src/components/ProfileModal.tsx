import React, { useState } from 'react';
import { 
  User, 
  Award, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  Edit2, 
  Check, 
  Trophy, 
  RotateCcw, 
  Target,
  Zap,
  BookOpen
} from 'lucide-react';
import { UserStats, Achievement } from '../types';
import { ACHIEVEMENTS, COURSES } from '../data/coursesData';

interface ProfileModalProps {
  stats: UserStats;
  levelInfo: { level: number; title: string; progressPercent: number; progressIntoLevel: number; levelSpan: number };
  onUpdateName: (name: string) => void;
  onSelectAvatar: (avatar: string) => void;
  onOpenCertificate: () => void;
  onResetProgress: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  stats,
  levelInfo,
  onUpdateName,
  onSelectAvatar,
  onOpenCertificate,
  onResetProgress,
}) => {
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>(stats.name);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  const handleSaveName = () => {
    if (nameInput.trim()) {
      onUpdateName(nameInput.trim());
    }
    setIsEditingName(false);
  };

  const completedLessonsCount = Object.keys(stats.completedLessons).length;

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-4">
      {/* Profile Header Hero Card */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 p-6 sm:p-8 mb-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          
          {/* Avatar Display */}
          <div className="relative group">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-slate-800 border-2 border-amber-500/50 flex items-center justify-center text-5xl sm:text-6xl shadow-2xl">
              {stats.selectedAvatar}
            </div>
            <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-xs shadow-md">
              Nv.{levelInfo.level}
            </div>
          </div>

          {/* User Info & Level Progress */}
          <div className="flex-1 text-center sm:text-left min-w-0">
            {isEditingName ? (
              <div className="flex items-center gap-2 max-w-xs mx-auto sm:mx-0 mb-2">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-amber-500/60 text-white font-bold text-lg outline-none w-full"
                  autoFocus
                />
                <button
                  onClick={handleSaveName}
                  className="p-2 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white truncate">
                  {stats.name}
                </h1>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="text-slate-400 hover:text-slate-200 p-1"
                  title="Editar nome"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-4">
              <Zap className="w-3.5 h-3.5" />
              {stats.selectedTitle}
            </div>

            {/* Level XP Progress */}
            <div className="w-full max-w-md">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400 mb-1.5">
                <span>Nível {levelInfo.level} ({levelInfo.title})</span>
                <span className="text-amber-400">
                  {levelInfo.progressIntoLevel} / {levelInfo.levelSpan} XP ({levelInfo.progressPercent}%)
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 transition-all duration-500"
                  style={{ width: `${levelInfo.progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Certificate Action */}
          <div className="shrink-0 flex flex-col gap-2">
            <button
              onClick={onOpenCertificate}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Certificado Oficial</span>
            </button>
          </div>

        </div>
      </div>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-8">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>XP Total</span>
          </div>
          <div className="text-xl font-extrabold text-white font-mono">{stats.xp}</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold mb-1">
            <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
            <span>Sequência Atual</span>
          </div>
          <div className="text-xl font-extrabold text-white font-mono">{stats.streak} dias</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold mb-1">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Lições Feitas</span>
          </div>
          <div className="text-xl font-extrabold text-white font-mono">{completedLessonsCount}</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold mb-1">
            <Target className="w-4 h-4 text-sky-400" />
            <span>Conquistas</span>
          </div>
          <div className="text-xl font-extrabold text-white font-mono">
            {stats.unlockedAchievements.length}/{ACHIEVEMENTS.length}
          </div>
        </div>
      </div>

      {/* Achievements Showcase */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            Galeria de Conquistas & Medalhas
          </h2>
          <span className="text-xs text-slate-400">
            {stats.unlockedAchievements.length} de {ACHIEVEMENTS.length} desbloqueadas
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACHIEVEMENTS.map((ach) => {
            const isUnlocked = stats.unlockedAchievements.includes(ach.id);

            return (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isUnlocked
                    ? 'bg-slate-900 border-amber-500/40 shadow-md ring-1 ring-amber-500/20'
                    : 'bg-slate-950/60 border-slate-800/80 opacity-50'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                      isUnlocked
                        ? 'bg-amber-500/20 border border-amber-500/40 text-amber-400'
                        : 'bg-slate-800 text-slate-600'
                    }`}
                  >
                    {isUnlocked ? '🏆' : <Lock className="w-5 h-5" />}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-bold text-sm truncate ${isUnlocked ? 'text-white' : 'text-slate-500'}`}>
                        {ach.title}
                      </h4>
                      {isUnlocked && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                      {ach.description}
                    </p>
                    <div className="text-[11px] font-bold text-amber-400/90 mt-2">
                      +{ach.xpReward} XP de Bônus
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Danger Zone: Reset */}
      <div className="mt-12 pt-6 border-t border-slate-800/80 flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Zona de Manutenção
          </h4>
          <p className="text-xs text-slate-500">
            Reinicia todos os dados salvos localmente e recomeça a jornada.
          </p>
        </div>

        {showResetConfirm ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowResetConfirm(false)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-bold text-slate-300"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                onResetProgress();
                setShowResetConfirm(false);
              }}
              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white"
            >
              Confirmar Reinício
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/60 hover:text-rose-400 text-slate-400 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Resetar Progresso</span>
          </button>
        )}
      </div>
    </div>
  );
};
