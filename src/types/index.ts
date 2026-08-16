export type LanguageTrackId = 'logica' | 'python' | 'javascript' | 'htmlcss' | 'sql';

export type ExerciseType = 
  | 'multiple_choice'
  | 'fill_blank'
  | 'order_blocks'
  | 'find_bug'
  | 'code_runner'
  | 'boss_fight';

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;
  instruction?: string;
  codeSnippet?: string;
  language?: 'javascript' | 'python' | 'html' | 'css' | 'sql' | 'pseudocode';
  // For multiple_choice & find_bug:
  options?: { id: string; text: string; isCorrect: boolean; explanation?: string }[];
  // For fill_blank:
  templateCode?: string; // e.g. "print(____)"
  blankTokens?: string[]; // options to click or drag into blanks
  correctTokens?: string[]; // right tokens for each blank
  // For order_blocks:
  shuffledBlocks?: { id: string; code: string }[];
  correctOrder?: string[]; // list of block IDs
  // For code_runner:
  initialCode?: string;
  expectedOutput?: string;
  solutionHint?: string;
  testCases?: { input?: string; expectedOutput: string; description: string }[];
  // Educational Explanation
  explanation: string;
  tip?: string;
  xpReward: number;
}

export interface Lesson {
  id: string;
  title: string;
  shortDescription: string;
  icon: string; // Lucide icon name
  xpReward: number;
  coinReward: number;
  exercises: Exercise[];
  isBoss?: boolean;
}

export interface Module {
  id: string;
  title: string;
  theme: string;
  description: string;
  icon: string;
  badgeName: string;
  lessons: Lesson[];
}

export interface CourseTrack {
  id: LanguageTrackId;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  icon: string;
  color: string; // Tailwind color name like 'emerald', 'amber', 'sky', 'indigo', 'purple'
  accentBg: string;
  level: 'Iniciante' | 'Intermediário' | 'Todos os Níveis';
  estimatedHours: number;
  modules: Module[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'progress' | 'streak' | 'perfection' | 'special';
  unlockedAt?: string;
  targetCount: number;
  currentCount?: number;
  xpReward: number;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'avatar' | 'theme' | 'powerup' | 'title';
  icon: string;
  value: string; // avatar url/id or theme class name or powerup effect
  owned?: boolean;
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  xpReward: number;
  coinReward: number;
  completed: boolean;
  claimed: boolean;
}

export interface UserStats {
  xp: number;
  level: number;
  coins: number;
  hearts: number;
  maxHearts: number;
  streak: number;
  lastActiveDate: string;
  activeTrackId: LanguageTrackId;
  completedLessons: Record<string, { stars: number; completedAt: string }>;
  unlockedAchievements: string[];
  inventory: string[];
  selectedAvatar: string;
  selectedTheme: string;
  selectedTitle: string;
  dailyQuests: DailyQuest[];
  soundEnabled: boolean;
  name: string;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  title: string;
  xp: number;
  isCurrentUser?: boolean;
  rankChange: 'up' | 'down' | 'same';
  streak: number;
}
