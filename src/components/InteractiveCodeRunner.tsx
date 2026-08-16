import React, { useState } from 'react';
import { Play, RotateCcw, CheckCircle, XCircle, Terminal, AlertCircle } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface InteractiveCodeRunnerProps {
  initialCode: string;
  expectedOutput?: string;
  language?: string;
  onSuccess?: () => void;
  readOnly?: boolean;
}

export const InteractiveCodeRunner: React.FC<InteractiveCodeRunnerProps> = ({
  initialCode,
  expectedOutput,
  language = 'javascript',
  onSuccess,
  readOnly = false,
}) => {
  const [code, setCode] = useState<string>(initialCode);
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasPassed, setHasPassed] = useState<boolean>(false);

  const resetCode = () => {
    setCode(initialCode);
    setOutput('');
    setError(null);
    setHasPassed(false);
  };

  const runCode = () => {
    soundManager.playClick();
    setIsRunning(true);
    setError(null);
    setOutput('');

    try {
      const logs: string[] = [];
      const customConsole = {
        log: (...args: unknown[]) => {
          logs.push(
            args
              .map((arg) => {
                if (typeof arg === 'object' && arg !== null) {
                  try {
                    return JSON.stringify(arg, null, 2);
                  } catch {
                    return String(arg);
                  }
                }
                return String(arg);
              })
              .join(' ')
          );
        },
        error: (...args: unknown[]) => {
          logs.push(`[ERRO]: ${args.join(' ')}`);
        },
        warn: (...args: unknown[]) => {
          logs.push(`[AVISO]: ${args.join(' ')}`);
        },
      };

      // If python code, simulate basic print/assignment execution or run translated JS
      let executableCode = code;
      if (language === 'python') {
        // Transform basic python print to console.log for simple exercises
        executableCode = code
          .replace(/print\((.*)\)/g, 'console.log($1)')
          .replace(/def\s+(\w+)\((.*?)\):/g, 'function $1($2) {')
          .replace(/True/g, 'true')
          .replace(/False/g, 'false')
          .replace(/None/g, 'null');
      }

      // Execute in isolated function scope
      const runFn = new Function('console', executableCode);
      runFn(customConsole);

      const capturedOutput = logs.join('\n').trim();
      setOutput(capturedOutput || '(Código executado sem saída no console)');

      if (expectedOutput) {
        const cleanExpected = expectedOutput.trim();
        const isMatch = capturedOutput === cleanExpected;
        setHasPassed(isMatch);
        if (isMatch && onSuccess) {
          onSuccess();
        }
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      setHasPassed(false);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950 font-mono text-sm shadow-xl">
      {/* Editor Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="font-semibold text-slate-300 ml-2">
            script.{language === 'python' ? 'py' : 'js'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetCode}
            title="Restaurar código inicial"
            className="flex items-center gap-1 px-2.5 py-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Resetar</span>
          </button>
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Executar</span>
          </button>
        </div>
      </div>

      {/* Code Textarea Area */}
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          readOnly={readOnly}
          rows={Math.max(4, code.split('\n').length + 1)}
          className="w-full bg-slate-950 text-slate-100 p-4 font-mono text-sm leading-relaxed outline-none resize-y selection:bg-amber-500/30"
          spellCheck={false}
        />
      </div>

      {/* Output Console Box */}
      {(output || error) && (
        <div className="border-t border-slate-800 bg-slate-900/90 p-3">
          <div className="flex items-center justify-between mb-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-slate-400" />
              <span>Saída do Console</span>
            </div>
            {expectedOutput && (
              <div>
                {hasPassed ? (
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <CheckCircle className="w-3.5 h-3.5" /> Saída Correta!
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-amber-400 font-bold">
                    <AlertCircle className="w-3.5 h-3.5" /> Saída esperada: &quot;{expectedOutput}&quot;
                  </span>
                )}
              </div>
            )}
          </div>

          {error ? (
            <div className="text-xs text-rose-400 font-mono bg-rose-950/40 p-2.5 rounded border border-rose-900/50 flex items-start gap-2">
              <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold">Erro de Execução:</div>
                <div className="text-slate-300 mt-0.5">{error}</div>
              </div>
            </div>
          ) : (
            <pre className="text-xs text-emerald-300 font-mono whitespace-pre-wrap bg-slate-950 p-2.5 rounded border border-slate-800/80">
              {output}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};
