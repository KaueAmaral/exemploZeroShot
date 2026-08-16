import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Heart, 
  Sparkles, 
  Lightbulb, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Star, 
  Trophy, 
  Coins, 
  RotateCcw,
  ArrowUp,
  ArrowDown,
  Info
} from 'lucide-react';
import { Lesson, Exercise, UserStats } from '../types';
import { InteractiveCodeRunner } from './InteractiveCodeRunner';
import { BossBattle } from './BossBattle';
import { soundManager } from '../utils/audio';

interface LessonModalProps {
  lesson: Lesson;
  stats: UserStats;
  onClose: () => void;
  onComplete: (lessonId: string, stars: number, xpReward: number, coinReward: number) => void;
  onLoseHeart: () => void;
  onRefillHearts: () => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  lesson,
  stats,
  onClose,
  onComplete,
  onLoseHeart,
  onRefillHearts,
}) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  // Fill blank state
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  
  // Order blocks state
  const currentExercise = lesson.exercises[currentExerciseIndex];
  const [orderedBlocks, setOrderedBlocks] = useState<{ id: string; code: string }[]>(() => {
    return currentExercise?.shuffledBlocks || [];
  });

  const [codeRunnerPassed, setCodeRunnerPassed] = useState<boolean>(false);
  
  // Status of the current question
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [mistakesCount, setMistakesCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [showNoHeartsModal, setShowNoHeartsModal] = useState<boolean>(false);

  // Update state whenever index changes
  const loadExercise = (idx: number) => {
    setCurrentExerciseIndex(idx);
    setSelectedOption(null);
    setSelectedTokens([]);
    setStatus('idle');
    setShowHint(false);
    setCodeRunnerPassed(false);
    if (lesson.exercises[idx]?.shuffledBlocks) {
      setOrderedBlocks(lesson.exercises[idx].shuffledBlocks);
    }
  };

  const progressPercent = Math.round(
    (currentExerciseIndex / lesson.exercises.length) * 100
  );

  // Trigger confetti burst
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6'],
      });
    } catch {
      // Ignored
    }
  };

  const handleVerify = () => {
    if (status !== 'idle') return;
    if (stats.hearts <= 0) {
      setShowNoHeartsModal(true);
      return;
    }

    let isCorrect = false;

    if (currentExercise.type === 'multiple_choice' || currentExercise.type === 'find_bug') {
      const option = currentExercise.options?.find((o) => o.id === selectedOption);
      isCorrect = !!option?.isCorrect;
    } else if (currentExercise.type === 'fill_blank') {
      const expected = currentExercise.correctTokens || [];
      isCorrect =
        selectedTokens.length === expected.length &&
        selectedTokens.every((tok, i) => tok === expected[i]);
    } else if (currentExercise.type === 'order_blocks') {
      const expectedOrder = currentExercise.correctOrder || [];
      const currentOrder = orderedBlocks.map((b) => b.id);
      isCorrect =
        currentOrder.length === expectedOrder.length &&
        currentOrder.every((id, i) => id === expectedOrder[i]);
    } else if (currentExercise.type === 'code_runner') {
      isCorrect = codeRunnerPassed;
    } else if (currentExercise.type === 'boss_fight') {
      const option = currentExercise.options?.find((o) => o.id === selectedOption);
      isCorrect = !!option?.isCorrect;
    }

    if (isCorrect) {
      setStatus('correct');
      soundManager.playSuccess();
      triggerConfetti();
    } else {
      setStatus('wrong');
      soundManager.playError();
      setMistakesCount((prev) => prev + 1);
      onLoseHeart();

      if (stats.hearts - 1 <= 0) {
        setShowNoHeartsModal(true);
      }
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    if (currentExerciseIndex < lesson.exercises.length - 1) {
      loadExercise(currentExerciseIndex + 1);
    } else {
      // Complete lesson!
      const stars = mistakesCount === 0 ? 3 : mistakesCount <= 2 ? 2 : 1;
      setIsFinished(true);
      soundManager.playLevelUp();
      triggerConfetti();
      onComplete(lesson.id, stars, lesson.xpReward, lesson.coinReward);
    }
  };

  // Move block up or down for order_blocks
  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (status !== 'idle') return;
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= orderedBlocks.length) return;

    soundManager.playClick();
    const updated = [...orderedBlocks];
    const temp = updated[index];
    updated[index] = updated[newIdx];
    updated[newIdx] = temp;
    setOrderedBlocks(updated);
  };

  // Render Completion Screen
  if (isFinished) {
    const stars = mistakesCount === 0 ? 3 : mistakesCount <= 2 ? 2 : 1;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950 text-slate-100 animate-fade-in">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden">
          
          {/* Animated Trophy Banner */}
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5 shadow-lg shadow-amber-500/10">
            <Trophy className="w-10 h-10 animate-bounce" />
          </div>

          <span className="text-xs font-black uppercase tracking-widest text-amber-400">
            {lesson.isBoss ? 'Chefe Derrotado!' : 'Lição Concluída!'}
          </span>
          <h2 className="text-2xl font-extrabold text-white mt-1">
            {lesson.title}
          </h2>

          {/* Stars display */}
          <div className="flex items-center justify-center gap-2 my-5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`p-2 rounded-2xl border transition-all ${
                  s <= stars
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-400 scale-110'
                    : 'bg-slate-800 border-slate-700 text-slate-600'
                }`}
              >
                <Star
                  className={`w-6 h-6 ${
                    s <= stars ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                  }`}
                />
              </div>
            ))}
          </div>

          <p className="text-slate-400 text-sm mb-6">
            {mistakesCount === 0
              ? 'Desempenho Impecável! Você acertou tudo de primeira.'
              : `Muito bom! Você concluiu cometendo apenas ${mistakesCount} deslize(s).`}
          </p>

          {/* Rewards Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <div className="text-left">
                <div className="text-[10px] text-slate-400 uppercase font-bold">XP Ganho</div>
                <div className="text-sm font-extrabold text-amber-300">+{lesson.xpReward} XP</div>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center gap-2">
              <Coins className="w-5 h-5 text-amber-400" />
              <div className="text-left">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Moedas</div>
                <div className="text-sm font-extrabold text-amber-300">+{lesson.coinReward} 🪙</div>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continuar Minha Jornada</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>
      </div>
    );
  }

  // Render Active Question
  const canVerify =
    (currentExercise.type === 'multiple_choice' && !!selectedOption) ||
    (currentExercise.type === 'find_bug' && !!selectedOption) ||
    (currentExercise.type === 'boss_fight' && !!selectedOption) ||
    (currentExercise.type === 'fill_blank' && selectedTokens.length > 0) ||
    (currentExercise.type === 'order_blocks') ||
    (currentExercise.type === 'code_runner' && codeRunnerPassed);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-slate-100 overflow-y-auto">
      
      {/* Top Bar (Progress & Controls) */}
      <div className="w-full max-w-4xl mx-auto px-4 py-4 flex items-center justify-between gap-4 border-b border-slate-800/80">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          title="Sair da lição"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress Bar */}
        <div className="flex-1 max-w-md h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-300"
            style={{ width: `${Math.max(5, progressPercent)}%` }}
          />
        </div>

        {/* Hearts & Hint */}
        <div className="flex items-center gap-3">
          {currentExercise.tip && (
            <button
              onClick={() => setShowHint((prev) => !prev)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold hover:bg-amber-500/20 transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Dica</span>
            </button>
          )}

          <div className="flex items-center gap-1 text-rose-400 text-sm font-extrabold px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>{stats.hearts}</span>
          </div>
        </div>

      </div>

      {/* Main Exercise Canvas */}
      <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-6 flex flex-col justify-center">
        
        {/* Hint Box (if toggled) */}
        {showHint && currentExercise.tip && (
          <div className="mb-6 p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs leading-relaxed flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-300">Dica do Mentor: </span>
              {currentExercise.tip}
            </div>
          </div>
        )}

        {/* Exercise Types Switcher */}
        {currentExercise.type === 'boss_fight' ? (
          <BossBattle
            exercise={currentExercise}
            onAnswer={(correct) => {
              if (correct) {
                setStatus('correct');
                soundManager.playSuccess();
                triggerConfetti();
              } else {
                setStatus('wrong');
                soundManager.playError();
                setMistakesCount((prev) => prev + 1);
                onLoseHeart();
              }
            }}
            isAnswered={status !== 'idle'}
          />
        ) : (
          <div>
            {/* Question Title & Instruction */}
            <div className="mb-6">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
                Exercício {currentExerciseIndex + 1} de {lesson.exercises.length}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                {currentExercise.question}
              </h2>
              {currentExercise.instruction && (
                <p className="text-slate-400 text-sm mt-1.5 font-normal">
                  {currentExercise.instruction}
                </p>
              )}
            </div>

            {/* Code Snippet Box (if present) */}
            {currentExercise.codeSnippet && currentExercise.type !== 'code_runner' && (
              <div className="mb-6 rounded-2xl bg-slate-900 border border-slate-800 p-4 font-mono text-sm text-slate-100 whitespace-pre-wrap shadow-inner">
                {currentExercise.codeSnippet}
              </div>
            )}

            {/* Multiple Choice & Find Bug Question View */}
            {(currentExercise.type === 'multiple_choice' || currentExercise.type === 'find_bug') && (
              <div className="grid grid-cols-1 gap-3">
                {currentExercise.options?.map((option) => {
                  const isSelected = selectedOption === option.id;
                  let cardStyle = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-850';

                  if (status === 'correct' && option.isCorrect) {
                    cardStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/30';
                  } else if (status === 'wrong' && isSelected) {
                    cardStyle = 'bg-rose-950/60 border-rose-500 text-rose-100 ring-2 ring-rose-500/30';
                  } else if (isSelected) {
                    cardStyle = 'bg-slate-800 border-amber-500 text-white ring-2 ring-amber-500/30';
                  }

                  return (
                    <button
                      key={option.id}
                      onClick={() => {
                        if (status === 'idle') {
                          soundManager.playClick();
                          setSelectedOption(option.id);
                        }
                      }}
                      disabled={status !== 'idle'}
                      className={`w-full flex items-center gap-3.5 p-4 rounded-xl text-left font-medium text-sm transition-all border cursor-pointer ${cardStyle}`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center uppercase shrink-0">
                        {option.id}
                      </div>
                      <span className="flex-1">{option.text}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Fill in the Blanks Question View */}
            {currentExercise.type === 'fill_blank' && (
              <div className="space-y-6">
                {/* Code template container */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-sm leading-loose">
                  <div className="flex flex-wrap items-center gap-2">
                    {currentExercise.templateCode?.split('____').map((part, index, arr) => (
                      <React.Fragment key={index}>
                        <span className="text-slate-300">{part}</span>
                        {index < arr.length - 1 && (
                          <div className="inline-flex items-center min-w-[70px] min-h-[32px] px-3 py-1 bg-slate-950 border border-amber-500/60 rounded-lg text-amber-300 font-bold">
                            {selectedTokens[index] ? (
                              <button
                                onClick={() => {
                                  if (status === 'idle') {
                                    soundManager.playClick();
                                    const next = [...selectedTokens];
                                    next.splice(index, 1);
                                    setSelectedTokens(next);
                                  }
                                }}
                                className="hover:line-through cursor-pointer"
                              >
                                {selectedTokens[index]}
                              </button>
                            ) : (
                              <span className="text-slate-600 text-xs italic">clique abaixo</span>
                            )}
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Tokens pool */}
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                    Banco de Termos:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentExercise.blankTokens?.map((token) => {
                      const isUsed = selectedTokens.includes(token);
                      return (
                        <button
                          key={token}
                          onClick={() => {
                            if (status === 'idle' && !isUsed) {
                              soundManager.playClick();
                              setSelectedTokens([...selectedTokens, token]);
                            }
                          }}
                          disabled={status !== 'idle' || isUsed}
                          className={`px-4 py-2 rounded-xl text-sm font-mono font-bold transition-all border cursor-pointer ${
                            isUsed
                              ? 'bg-slate-900 border-slate-800 text-slate-600 opacity-40 cursor-not-allowed'
                              : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-amber-300 hover:border-amber-500/50 shadow-sm'
                          }`}
                        >
                          {token}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Order Blocks (Parsons puzzle) */}
            {currentExercise.type === 'order_blocks' && (
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Use as setas para ordenar as linhas de código:
                </div>
                {orderedBlocks.map((block, idx) => (
                  <div
                    key={block.id}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-slate-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-slate-500 w-5">
                        {idx + 1}.
                      </span>
                      <span>{block.code}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveBlock(idx, 'up')}
                        disabled={idx === 0 || status !== 'idle'}
                        className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveBlock(idx, 'down')}
                        disabled={idx === orderedBlocks.length - 1 || status !== 'idle'}
                        className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Interactive Code Runner */}
            {currentExercise.type === 'code_runner' && (
              <InteractiveCodeRunner
                initialCode={currentExercise.initialCode || ''}
                expectedOutput={currentExercise.expectedOutput}
                language={currentExercise.language || 'javascript'}
                onSuccess={() => setCodeRunnerPassed(true)}
              />
            )}
          </div>
        )}

      </div>

      {/* Bottom Action / Feedback Bar */}
      <div
        className={`sticky bottom-0 w-full border-t p-4 sm:p-5 transition-colors ${
          status === 'correct'
            ? 'bg-emerald-950/90 border-emerald-800 text-emerald-100'
            : status === 'wrong'
            ? 'bg-rose-950/90 border-rose-800 text-rose-100'
            : 'bg-slate-900/90 border-slate-800 text-slate-200'
        }`}
      >
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Feedback Info Box */}
          <div className="flex-1 w-full sm:w-auto">
            {status === 'correct' && (
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Excelente! {currentExercise.explanation}</span>
              </div>
            )}
            {status === 'wrong' && (
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <XCircle className="w-5 h-5" />
                <span>Ops! {currentExercise.explanation}</span>
              </div>
            )}
            {status === 'idle' && (
              <div className="text-xs text-slate-400">
                Pense com calma e selecione sua resposta antes de verificar.
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="w-full sm:w-auto">
            {status === 'idle' ? (
              <button
                onClick={handleVerify}
                disabled={!canVerify}
                className="w-full sm:w-48 py-3 px-6 rounded-xl bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/10 transition-all cursor-pointer"
              >
                Verificar Resposta
              </button>
            ) : (
              <button
                onClick={handleNext}
                className={`w-full sm:w-48 py-3 px-6 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  status === 'correct'
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                    : 'bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/20'
                }`}
              >
                <span>Continuar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      </div>

      {/* No Hearts Modal Dialog */}
      {showNoHeartsModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center text-slate-100 shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-500/20 flex items-center justify-center text-rose-400 mb-4">
              <Heart className="w-8 h-8 fill-rose-500" />
            </div>
            <h3 className="text-xl font-extrabold text-white">Sem Corações!</h3>
            <p className="text-xs text-slate-400 mt-2 mb-6">
              Você usou todos os seus 5 corações. Recarregue agora usando DevCoins na Loja ou descanse um pouco!
            </p>

            <div className="space-y-2">
              <button
                onClick={() => {
                  onRefillHearts();
                  setShowNoHeartsModal(false);
                }}
                className="w-full py-3 px-4 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 cursor-pointer"
              >
                Recarregar Corações (35 🪙)
              </button>
              <button
                onClick={() => {
                  setShowNoHeartsModal(false);
                  onClose();
                }}
                className="w-full py-3 px-4 rounded-xl bg-slate-800 text-slate-300 font-semibold text-sm hover:bg-slate-700 cursor-pointer"
              >
                Voltar ao Menu
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
