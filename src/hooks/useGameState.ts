import { useState, useEffect, useCallback } from 'react';
import { UserStats, LanguageTrackId, Achievement } from '../types';
import { COURSES, ACHIEVEMENTS, INITIAL_DAILY_QUESTS } from '../data/coursesData';
import { soundManager } from '../utils/audio';

const STORAGE_KEY = 'codequest_user_stats_v1';

export const LEVEL_THRESHOLDS = [
  { level: 1, xp: 0, title: 'Novato do Terminal' },
  { level: 2, xp: 80, title: 'Aprendiz de Algoritmos' },
  { level: 3, xp: 200, title: 'Escudeiro do Código' },
  { level: 4, xp: 400, title: 'Domador de Variáveis' },
  { level: 5, xp: 700, title: 'Mago dos Loops' },
  { level: 6, xp: 1100, title: 'Arquiteto de Funções' },
  { level: 7, xp: 1600, title: 'Caçador de Bugs Mestre' },
  { level: 8, xp: 2300, title: 'Guardião Fullstack' },
  { level: 9, xp: 3200, title: 'Oráculo de Dados' },
  { level: 10, xp: 4500, title: 'Grão-Mestre do Silício' },
];

export function calculateLevelInfo(totalXp: number) {
  let currentLevel = 1;
  let currentTitle = LEVEL_THRESHOLDS[0].title;
  let nextLevelXp = LEVEL_THRESHOLDS[1].xp;
  let prevLevelXp = 0;

  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalXp >= LEVEL_THRESHOLDS[i].xp) {
      currentLevel = LEVEL_THRESHOLDS[i].level;
      currentTitle = LEVEL_THRESHOLDS[i].title;
      prevLevelXp = LEVEL_THRESHOLDS[i].xp;
      nextLevelXp = LEVEL_THRESHOLDS[i + 1] ? LEVEL_THRESHOLDS[i + 1].xp : prevLevelXp + 2000;
      break;
    }
  }

  const progressIntoLevel = totalXp - prevLevelXp;
  const levelSpan = nextLevelXp - prevLevelXp;
  const progressPercent = Math.min(100, Math.max(0, Math.round((progressIntoLevel / levelSpan) * 100)));

  return {
    level: currentLevel,
    title: currentTitle,
    prevLevelXp,
    nextLevelXp,
    progressIntoLevel,
    levelSpan,
    progressPercent,
  };
}

const DEFAULT_STATS: UserStats = {
  xp: 120,
  level: 2,
  coins: 45,
  hearts: 5,
  maxHearts: 5,
  streak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  activeTrackId: 'logica',
  completedLessons: {},
  unlockedAchievements: ['ach-first-step'],
  inventory: ['av-wizard'],
  selectedAvatar: '🧑‍💻',
  selectedTheme: 'dark',
  selectedTitle: 'Aprendiz de Algoritmos',
  dailyQuests: INITIAL_DAILY_QUESTS,
  soundEnabled: true,
  name: 'Dev Aprendiz',
};

export function useGameState() {
  const [stats, setStats] = useState<UserStats>(() => {
    if (typeof window === 'undefined') return DEFAULT_STATS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_STATS, ...parsed };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_STATS;
  });

  const [newAchievementToast, setNewAchievementToast] = useState<Achievement | null>(null);

  // Sync with sound manager
  useEffect(() => {
    soundManager.setMuted(!stats.soundEnabled);
  }, [stats.soundEnabled]);

  // Persist to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch {
      // ignore
    }
  }, [stats]);

  // Check achievements helper
  const checkAchievements = useCallback((currentStats: UserStats) => {
    const newlyUnlocked: Achievement[] = [];
    const unlockedIds = new Set(currentStats.unlockedAchievements);

    ACHIEVEMENTS.forEach((ach) => {
      if (unlockedIds.has(ach.id)) return;

      let isUnlocked = false;
      if (ach.id === 'ach-first-step' && Object.keys(currentStats.completedLessons).length >= 1) {
        isUnlocked = true;
      } else if (ach.id === 'ach-streak-3' && currentStats.streak >= 3) {
        isUnlocked = true;
      } else if (ach.id === 'ach-collector' && currentStats.coins >= 100) {
        isUnlocked = true;
      } else if (ach.id === 'ach-boss-slayer') {
        const hasBoss = Object.keys(currentStats.completedLessons).some(
          (k) => k.includes('boss')
        );
        if (hasBoss) isUnlocked = true;
      } else if (ach.id === 'ach-polyglot') {
        const completedTrackIds = new Set<string>();
        COURSES.forEach(course => {
          course.modules.forEach(mod => {
            mod.lessons.forEach(les => {
              if (currentStats.completedLessons[les.id]) {
                completedTrackIds.add(course.id);
              }
            });
          });
        });
        if (completedTrackIds.size >= 3) isUnlocked = true;
      }

      if (isUnlocked) {
        newlyUnlocked.push(ach);
      }
    });

    if (newlyUnlocked.length > 0) {
      setStats((prev) => ({
        ...prev,
        xp: prev.xp + newlyUnlocked.reduce((acc, a) => acc + a.xpReward, 0),
        unlockedAchievements: [...prev.unlockedAchievements, ...newlyUnlocked.map((a) => a.id)],
      }));
      setNewAchievementToast(newlyUnlocked[0]);
      soundManager.playLevelUp();
    }
  }, []);

  const addXpAndCoins = useCallback((xp: number, coins: number) => {
    setStats((prev) => {
      const newXp = prev.xp + xp;
      const newCoins = prev.coins + coins;
      const levelInfo = calculateLevelInfo(newXp);
      const levelChanged = levelInfo.level > prev.level;

      if (levelChanged) {
        soundManager.playLevelUp();
      }

      const updated = {
        ...prev,
        xp: newXp,
        coins: newCoins,
        level: levelInfo.level,
        selectedTitle: prev.selectedTitle === DEFAULT_STATS.selectedTitle ? levelInfo.title : prev.selectedTitle,
      };

      setTimeout(() => checkAchievements(updated), 500);
      return updated;
    });
  }, [checkAchievements]);

  const loseHeart = useCallback(() => {
    setStats((prev) => {
      const nextHearts = Math.max(0, prev.hearts - 1);
      return { ...prev, hearts: nextHearts };
    });
  }, []);

  const refillHearts = useCallback(() => {
    setStats((prev) => ({ ...prev, hearts: prev.maxHearts }));
  }, []);

  const completeLesson = useCallback(
    (lessonId: string, stars: number, xpReward: number, coinReward: number) => {
      setStats((prev) => {
        const isFirstTime = !prev.completedLessons[lessonId];
        const multiplier = 1;
        const totalXpGain = isFirstTime ? xpReward * multiplier : Math.round(xpReward * 0.4);
        const totalCoinGain = isFirstTime ? coinReward : Math.round(coinReward * 0.3);

        const updatedCompleted = {
          ...prev.completedLessons,
          [lessonId]: {
            stars: Math.max(stars, prev.completedLessons[lessonId]?.stars || 0),
            completedAt: new Date().toISOString(),
          },
        };

        const levelInfo = calculateLevelInfo(prev.xp + totalXpGain);

        // Advance daily quests
        const updatedDailyQuests = prev.dailyQuests.map((q) => {
          if (q.id === 'dq-1') {
            const nextVal = Math.min(q.target, q.current + 1);
            return { ...q, current: nextVal, completed: nextVal >= q.target };
          }
          return q;
        });

        const updated: UserStats = {
          ...prev,
          xp: prev.xp + totalXpGain,
          coins: prev.coins + totalCoinGain,
          level: levelInfo.level,
          completedLessons: updatedCompleted,
          dailyQuests: updatedDailyQuests,
        };

        setTimeout(() => checkAchievements(updated), 500);
        return updated;
      });
    },
    [checkAchievements]
  );

  const setActiveTrack = useCallback((trackId: LanguageTrackId) => {
    setStats((prev) => ({ ...prev, activeTrackId: trackId }));
  }, []);

  const buyShopItem = useCallback((item: { id: string; price: number; category: string; value: string }) => {
    setStats((prev) => {
      if (prev.coins < item.price) return prev;

      soundManager.playCoin();
      const nextCoins = prev.coins - item.price;
      const nextInventory = prev.inventory.includes(item.id) ? prev.inventory : [...prev.inventory, item.id];

      if (item.category === 'avatar') {
        return {
          ...prev,
          coins: nextCoins,
          inventory: nextInventory,
          selectedAvatar: item.value,
        };
      }
      if (item.category === 'powerup' && item.value === 'refill_hearts') {
        return {
          ...prev,
          coins: nextCoins,
          hearts: prev.maxHearts,
        };
      }
      if (item.category === 'title') {
        return {
          ...prev,
          coins: nextCoins,
          inventory: nextInventory,
          selectedTitle: item.value,
        };
      }

      return {
        ...prev,
        coins: nextCoins,
        inventory: nextInventory,
      };
    });
  }, []);

  const claimDailyQuest = useCallback((questId: string) => {
    setStats((prev) => {
      const quest = prev.dailyQuests.find((q) => q.id === questId);
      if (!quest || !quest.completed || quest.claimed) return prev;

      soundManager.playCoin();
      const updatedQuests = prev.dailyQuests.map((q) =>
        q.id === questId ? { ...q, claimed: true } : q
      );

      return {
        ...prev,
        xp: prev.xp + quest.xpReward,
        coins: prev.coins + quest.coinReward,
        dailyQuests: updatedQuests,
      };
    });
  }, []);

  const toggleSound = useCallback(() => {
    setStats((prev) => {
      const nextVal = !prev.soundEnabled;
      soundManager.setMuted(!nextVal);
      return { ...prev, soundEnabled: nextVal };
    });
  }, []);

  const setUserName = useCallback((name: string) => {
    setStats((prev) => ({ ...prev, name }));
  }, []);

  const setSelectedAvatar = useCallback((avatar: string) => {
    setStats((prev) => ({ ...prev, selectedAvatar: avatar }));
  }, []);

  const resetAllProgress = useCallback(() => {
    setStats(DEFAULT_STATS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return {
    stats,
    levelInfo: calculateLevelInfo(stats.xp),
    newAchievementToast,
    dismissAchievementToast: () => setNewAchievementToast(null),
    addXpAndCoins,
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
  };
}
