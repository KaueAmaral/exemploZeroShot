import React from 'react';
import { Brain, Terminal, Zap, Palette, Database, CheckCircle2, ChevronRight } from 'lucide-react';
import { CourseTrack, LanguageTrackId, UserStats } from '../types';
import { COURSES } from '../data/coursesData';

interface TrackSelectorProps {
  activeTrackId: LanguageTrackId;
  onSelectTrack: (trackId: LanguageTrackId) => void;
  stats: UserStats;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Brain: <Brain className="w-5 h-5" />,
  Terminal: <Terminal className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  Palette: <Palette className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
};

export const TrackSelector: React.FC<TrackSelectorProps> = ({
  activeTrackId,
  onSelectTrack,
  stats,
}) => {
  const getTrackProgress = (track: CourseTrack) => {
    let totalLessons = 0;
    let completedCount = 0;

    track.modules.forEach((mod) => {
      mod.lessons.forEach((les) => {
        totalLessons++;
        if (stats.completedLessons[les.id]) {
          completedCount++;
        }
      });
    });

    const percent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
    return { totalLessons, completedCount, percent };
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs uppercase tracking-wider font-bold text-slate-400">
          Trilhas de Aprendizado
        </h2>
        <span className="text-xs text-slate-500 font-medium">
          Escolha uma linguagem para explorar
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {COURSES.map((course) => {
          const isActive = course.id === activeTrackId;
          const { percent, completedCount, totalLessons } = getTrackProgress(course);
          const isComplete = percent === 100;

          return (
            <button
              key={course.id}
              onClick={() => onSelectTrack(course.id)}
              className={`relative flex flex-col p-3 rounded-xl text-left transition-all border ${
                isActive
                  ? 'bg-slate-800/95 border-amber-500/80 shadow-md shadow-amber-500/10 ring-1 ring-amber-500/30'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <div
                  className={`p-2 rounded-lg ${
                    isActive ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {ICON_MAP[course.icon] || <Brain className="w-5 h-5" />}
                </div>

                {isComplete ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <span className="text-[11px] font-mono font-bold text-slate-400">
                    {percent}%
                  </span>
                )}
              </div>

              <div className="font-bold text-sm text-slate-100 truncate mb-1">
                {course.name}
              </div>

              <p className="text-[11px] text-slate-400 line-clamp-1 mb-2.5 font-normal">
                {completedCount}/{totalLessons} lições
              </p>

              {/* Mini progress bar */}
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    isComplete ? 'bg-emerald-500' : 'bg-amber-400'
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
