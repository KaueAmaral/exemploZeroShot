import React, { useState } from 'react';
import { 
  Star, 
  Lock, 
  Play, 
  Check, 
  Sparkles, 
  Swords, 
  Award, 
  BookOpen, 
  ArrowRight,
  Flame,
  Info
} from 'lucide-react';
import { CourseTrack, Lesson, UserStats } from '../types';
import { soundManager } from '../utils/audio';

interface TrackMapProps {
  currentTrack: CourseTrack;
  stats: UserStats;
  onStartLesson: (lesson: Lesson) => void;
  onOpenCertificate: () => void;
}

export const TrackMap: React.FC<TrackMapProps> = ({
  currentTrack,
  stats,
  onStartLesson,
  onOpenCertificate
}) => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // Check if a lesson is unlocked
  // The first lesson of module 1 is always unlocked.
  // Subsequent lessons are unlocked if previous lesson is completed.
  const allLessons: Lesson[] = [];
  currentTrack.modules.forEach((mod) => {
    mod.lessons.forEach((les) => {
      allLessons.push(les);
    });
  });

  const isLessonUnlocked = (lessonId: string): boolean => {
    const idx = allLessons.findIndex((l) => l.id === lessonId);
    if (idx === 0) return true; // First lesson always open
    const prevLesson = allLessons[idx - 1];
    return !!stats.completedLessons[prevLesson.id];
  };

  const isLessonCompleted = (lessonId: string): boolean => {
    return !!stats.completedLessons[lessonId];
  };

  const getLessonStars = (lessonId: string): number => {
    return stats.completedLessons[lessonId]?.stars || 0;
  };

  // Calculate track progress
  const completedCount = allLessons.filter((l) => isLessonCompleted(l.id)).length;
  const isTrackCompleted = allLessons.length > 0 && completedCount === allLessons.length;

  return (
    <div className="w-full max-w-3xl mx-auto py-4 px-2 sm:px-4">
      {/* Hero Track Header */}
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 p-5 sm:p-6 mb-8 shadow-xl overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              {currentTrack.level} • {currentTrack.estimatedHours}h estimadas
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {currentTrack.name}
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              {currentTrack.description}
            </p>
          </div>

          {isTrackCompleted && (
            <button
              onClick={onOpenCertificate}
              className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Ver Certificado</span>
            </button>
          )}
        </div>

        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Modules Roadmap Path */}
      <div className="space-y-12 relative">
        {currentTrack.modules.map((module, modIndex) => (
          <div key={module.id} className="relative">
            
            {/* Module Banner */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800 mb-8 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                {modIndex + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs uppercase font-bold tracking-wider text-amber-400">
                  {module.theme}
                </div>
                <h3 className="text-base font-bold text-slate-100 truncate">
                  {module.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {module.description}
                </p>
              </div>
            </div>

            {/* Stepping Stones / Path Nodes */}
            <div className="flex flex-col items-center gap-8 relative py-2">
              {module.lessons.map((lesson, lessonIndex) => {
                const unlocked = isLessonUnlocked(lesson.id);
                const completed = isLessonCompleted(lesson.id);
                const stars = getLessonStars(lesson.id);
                const isBoss = lesson.isBoss;

                // Alternate horizontal offsets slightly for a winding adventure path aesthetic
                const offsetClass = lessonIndex % 2 === 0 ? '-translate-x-3 sm:-translate-x-6' : 'translate-x-3 sm:translate-x-6';

                return (
                  <div key={lesson.id} className={`flex flex-col items-center relative ${offsetClass}`}>
                    
                    {/* Node button */}
                    <button
                      onClick={() => {
                        soundManager.playClick();
                        setSelectedLesson(lesson);
                      }}
                      disabled={!unlocked}
                      className={`group relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 transform active:scale-95 cursor-pointer ${
                        !unlocked
                          ? 'bg-slate-800/60 border-2 border-slate-700/50 text-slate-500 cursor-not-allowed'
                          : completed
                          ? 'bg-emerald-600 border-b-4 border-emerald-800 text-white shadow-lg shadow-emerald-900/30 hover:bg-emerald-500'
                          : isBoss
                          ? 'bg-gradient-to-tr from-rose-600 to-amber-600 border-b-4 border-rose-900 text-white shadow-xl shadow-rose-900/40 hover:scale-105 animate-pulse'
                          : 'bg-amber-500 border-b-4 border-amber-700 text-slate-950 shadow-xl shadow-amber-500/20 hover:bg-amber-400 hover:scale-105 ring-4 ring-amber-500/20'
                      }`}
                    >
                      {/* Inner Icon */}
                      {!unlocked ? (
                        <Lock className="w-6 h-6 text-slate-500" />
                      ) : completed ? (
                        <Check className="w-8 h-8 text-white stroke-[3]" />
                      ) : isBoss ? (
                        <Swords className="w-8 h-8 text-white animate-bounce" />
                      ) : (
                        <Play className="w-7 h-7 text-slate-950 fill-slate-950 ml-0.5" />
                      )}

                      {/* Stars badge underneath completed node */}
                      {completed && (
                        <div className="absolute -bottom-3 flex items-center gap-0.5 bg-slate-900/90 px-2 py-0.5 rounded-full border border-slate-700 shadow-md">
                          {[1, 2, 3].map((s) => (
                            <Star
                              key={s}
                              className={`w-3 h-3 ${
                                s <= stars
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-600'
                              }`}
                            />
                          ))}
                        </div>
                      )}

                      {/* Active indicator badge */}
                      {unlocked && !completed && (
                        <span className="absolute -top-2 px-2 py-0.5 bg-amber-400 text-slate-950 text-[10px] font-black rounded-full shadow-md uppercase tracking-wider">
                          {isBoss ? 'BOSS' : 'JOGAR'}
                        </span>
                      )}
                    </button>

                    {/* Lesson Label */}
                    <div className="mt-4 text-center max-w-[200px]">
                      <div className="text-xs font-bold text-slate-200 line-clamp-1">
                        {lesson.title}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                        +{lesson.xpReward} XP • +{lesson.coinReward} Moedas
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        ))}
      </div>

      {/* Lesson Details Dialog / Bottom Drawer */}
      {selectedLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100">
            
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${
                  selectedLesson.isBoss 
                    ? 'bg-rose-500/20 text-rose-400' 
                    : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {selectedLesson.isBoss ? <Swords className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    {selectedLesson.isBoss ? 'Batalha de Fim de Módulo' : 'Lição Interativa'}
                  </span>
                  <h3 className="text-lg font-extrabold text-white">
                    {selectedLesson.title}
                  </h3>
                </div>
              </div>
            </div>

            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              {selectedLesson.shortDescription}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <div className="text-xs">
                  <div className="text-slate-400">Recompensa</div>
                  <div className="font-bold text-slate-200">+{selectedLesson.xpReward} XP</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <Flame className="w-4 h-4 text-orange-400" />
                <div className="text-xs">
                  <div className="text-slate-400">Desafios</div>
                  <div className="font-bold text-slate-200">{selectedLesson.exercises.length} Exercícios</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedLesson(null)}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-800 text-slate-300 font-semibold text-sm hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Voltar
              </button>
              <button
                onClick={() => {
                  const toStart = selectedLesson;
                  setSelectedLesson(null);
                  onStartLesson(toStart);
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Começar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
