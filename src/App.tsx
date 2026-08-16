import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { TrackSelector } from './components/TrackSelector';
import { TrackMap } from './components/TrackMap';
import { LessonModal } from './components/LessonModal';
import { Playground } from './components/Playground';
import { DailyQuests } from './components/DailyQuests';
import { Leaderboard } from './components/Leaderboard';
import { ShopModal } from './components/ShopModal';
import { ProfileModal } from './components/ProfileModal';
import { CertificateModal } from './components/CertificateModal';
import { useGameState } from './hooks/useGameState';
import { COURSES } from './data/coursesData';
import { Lesson, ShopItem } from './types';
import { Trophy, X, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'map' | 'playground' | 'quests' | 'leaderboard' | 'shop' | 'profile'>('map');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  const {
    stats,
    levelInfo,
    newAchievementToast,
    dismissAchievementToast,
    loseHeart,
    refillHearts,
    completeLesson,
    setActiveTrack,
    buyShopItem,
    claimDailyQuest,
    toggleSound,
    setUserName,
    setSelectedAvatar,
    resetAllProgress,
  } = useGameState();

  const currentTrack = COURSES.find((c) => c.id === stats.activeTrackId) || COURSES[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-white">
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        stats={stats}
        levelInfo={levelInfo}
        toggleSound={toggleSound}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        
        {/* Track / Roadmap Tab */}
        {activeTab === 'map' && (
          <div className="space-y-6">
            <TrackSelector
              activeTrackId={stats.activeTrackId}
              onSelectTrack={setActiveTrack}
              stats={stats}
            />

            <TrackMap
              currentTrack={currentTrack}
              stats={stats}
              onStartLesson={(lesson) => setActiveLesson(lesson)}
              onOpenCertificate={() => setShowCertificate(true)}
            />
          </div>
        )}

        {/* Sandbox Playground Tab */}
        {activeTab === 'playground' && (
          <Playground
            onRunCodeAction={() => {
              // Advances the daily quest if active
              claimDailyQuest('dq-3');
            }}
          />
        )}

        {/* Daily Quests Tab */}
        {activeTab === 'quests' && (
          <DailyQuests stats={stats} onClaim={claimDailyQuest} />
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <Leaderboard stats={stats} />
        )}

        {/* Shop Tab */}
        {activeTab === 'shop' && (
          <ShopModal
            stats={stats}
            onBuy={buyShopItem}
            onSelectAvatar={setSelectedAvatar}
          />
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <ProfileModal
            stats={stats}
            levelInfo={levelInfo}
            onUpdateName={setUserName}
            onSelectAvatar={setSelectedAvatar}
            onOpenCertificate={() => setShowCertificate(true)}
            onResetProgress={resetAllProgress}
          />
        )}

      </main>

      {/* Active Lesson Modal */}
      {activeLesson && (
        <LessonModal
          lesson={activeLesson}
          stats={stats}
          onClose={() => setActiveLesson(null)}
          onComplete={(lessonId, stars, xpReward, coinReward) => {
            completeLesson(lessonId, stars, xpReward, coinReward);
          }}
          onLoseHeart={loseHeart}
          onRefillHearts={refillHearts}
        />
      )}

      {/* Certificate Modal */}
      {showCertificate && (
        <CertificateModal
          stats={stats}
          currentTrack={currentTrack}
          onClose={() => setShowCertificate(false)}
        />
      )}

      {/* Achievement Unlocked Floating Toast */}
      {newAchievementToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900 border border-amber-500/60 shadow-2xl shadow-amber-500/20 text-slate-100 max-w-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                Nova Conquista Desbloqueada!
              </div>
              <div className="font-bold text-sm text-white truncate">
                {newAchievementToast.title}
              </div>
              <div className="text-xs text-slate-400">
                +{newAchievementToast.xpReward} XP Bônus
              </div>
            </div>
            <button
              onClick={dismissAchievementToast}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
