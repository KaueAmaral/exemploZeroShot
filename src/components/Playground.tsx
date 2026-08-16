import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Terminal, 
  Code2, 
  Sparkles, 
  Trash2, 
  Layers,
  FileCode
} from 'lucide-react';
import { soundManager } from '../utils/audio';

const TEMPLATES = [
  {
    id: 'rpg-calc',
    title: 'Calculadora de Dano RPG',
    language: 'javascript',
    description: 'Calcule dano crítico, defesa e vida restante de um monstro.',
    code: `// Bem-vindo ao Laboratório! Teste variáveis e cálculos aqui:
let ataqueHeroi = 85;
let defesaMonstro = 30;
let chanceCritico = 0.5; // 50% de chance

let danoFinal = ataqueHeroi - defesaMonstro;

if (Math.random() < chanceCritico) {
  danoFinal *= 2;
  console.log("💥 GOLPE CRÍTICO!");
}

console.log("Dano causado ao monstro:", danoFinal);

let vidaMonstro = 120 - danoFinal;
console.log("Vida restante do Monstro:", Math.max(0, vidaMonstro));
`
  },
  {
    id: 'dev-compliment',
    title: 'Gerador de Motivação Dev',
    language: 'javascript',
    description: 'Sorteia frases motivacionais e dicas de ouro para iniciantes.',
    code: `const frases = [
  "Você está aprendendo a linguagem que move o futuro!",
  "Todo dev sênior já travou num 'Hello World' um dia.",
  "Erros e bugs são apenas pistas para você ficar mais esperto.",
  "Praticar 15 minutos por dia constrói uma carreira brilhante!"
];

const fraseSorteada = frases[Math.floor(Math.random() * frases.length)];

console.log("⭐ Dica do Dia:");
console.log(fraseSorteada);
`
  },
  {
    id: 'guess-number',
    title: 'Adivinhe o Número (Mini-Jogo)',
    language: 'javascript',
    description: 'Simulação de jogo de adivinhação de 1 a 10.',
    code: `const numeroSecreto = 7;
const chuteDoJogador = 7;

console.log("Tentando o palpite:", chuteDoJogador);

if (chuteDoJogador === numeroSecreto) {
  console.log("🎉 Parabéns! Você acertou o número secreto!");
} else if (chuteDoJogador < numeroSecreto) {
  console.log("📈 Dica: O número secreto é MAIOR!");
} else {
  console.log("📉 Dica: O número secreto é MENOR!");
}
`
  },
  {
    id: 'html-card',
    title: 'HTML & CSS: Cartão de Perfil',
    language: 'html',
    description: 'Veja como tags e estilos criam um cartão visual moderno.',
    code: `<div style="background: #1e293b; border: 1px solid #334155; padding: 20px; border-radius: 16px; text-align: center; color: white; font-family: sans-serif;">
  <div style="font-size: 40px; margin-bottom: 8px;">🧙‍♂️</div>
  <h2 style="margin: 0; color: #f59e0b; font-size: 20px;">Arthur, o Mago do Código</h2>
  <p style="color: #94a3b8; font-size: 14px; margin-top: 4px;">Nível 10 • Mestre em JavaScript</p>
  <button style="margin-top: 12px; background: #f59e0b; border: none; padding: 8px 16px; border-radius: 8px; font-weight: bold; cursor: pointer;">
    Desafiar para Duelo
  </button>
</div>
`
  }
];

interface PlaygroundProps {
  onRunCodeAction?: () => void;
}

export const Playground: React.FC<PlaygroundProps> = ({ onRunCodeAction }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>(TEMPLATES[0].id);
  const [code, setCode] = useState<string>(TEMPLATES[0].code);
  const [language, setLanguage] = useState<string>(TEMPLATES[0].language);
  const [outputLogs, setOutputLogs] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [htmlPreview, setHtmlPreview] = useState<string>('');

  const loadTemplate = (templateId: string) => {
    soundManager.playClick();
    const t = TEMPLATES.find((item) => item.id === templateId);
    if (t) {
      setSelectedTemplate(t.id);
      setCode(t.code);
      setLanguage(t.language);
      setOutputLogs([]);
      setHtmlPreview('');
    }
  };

  const handleRun = () => {
    soundManager.playClick();
    if (onRunCodeAction) onRunCodeAction();

    if (language === 'html') {
      setHtmlPreview(code);
      setOutputLogs(['[HTML renderizado na aba de pré-visualização abaixo]']);
      return;
    }

    try {
      const logs: string[] = [];
      const customConsole = {
        log: (...args: unknown[]) => {
          logs.push(
            args
              .map((a) => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)))
              .join(' ')
          );
        },
        error: (...args: unknown[]) => logs.push(`[ERRO]: ${args.join(' ')}`),
        warn: (...args: unknown[]) => logs.push(`[AVISO]: ${args.join(' ')}`),
      };

      const runner = new Function('console', code);
      runner(customConsole);

      setOutputLogs(logs.length ? logs : ['(Código executado com sucesso sem logs)']);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setOutputLogs([`❌ Erro na execução: ${msg}`]);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    soundManager.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            Sandbox Aberto
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            O Laboratório do Código
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Experimente ideias, rode códigos ao vivo e crie seus próprios algoritmos sem medo de errar.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-750 text-xs font-semibold transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copiado!' : 'Copiar Código'}</span>
          </button>

          <button
            onClick={handleRun}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Executar</span>
          </button>
        </div>
      </div>

      {/* Preset Projects Carousel / Tabs */}
      <div className="mb-6">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Projetos & Modelos Prontos:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => loadTemplate(tmpl.id)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                selectedTemplate === tmpl.id
                  ? 'bg-slate-800/90 border-amber-500/80 ring-1 ring-amber-500/30'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm text-slate-100">{tmpl.title}</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-amber-400">
                  {tmpl.language}
                </span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-2">{tmpl.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Split Editor and Terminal Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Code Editor */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl flex flex-col h-[450px]">
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-amber-400" />
              <span className="font-mono text-slate-200 font-bold">editor.{language === 'html' ? 'html' : 'js'}</span>
            </div>
            <button
              onClick={() => setCode('')}
              className="text-slate-400 hover:text-rose-400 transition-colors p-1"
              title="Limpar editor"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 w-full p-4 bg-slate-950 text-slate-100 font-mono text-sm leading-relaxed outline-none resize-none selection:bg-amber-500/30"
            spellCheck={false}
          />
        </div>

        {/* Right: Terminal Console Output & HTML Preview */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl flex flex-col h-[450px]">
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="font-mono text-slate-200 font-bold">Terminal & Visualização</span>
            </div>
            <button
              onClick={() => {
                setOutputLogs([]);
                setHtmlPreview('');
              }}
              className="text-slate-400 hover:text-slate-200 transition-colors text-xs"
            >
              Limpar
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto font-mono text-sm space-y-2 bg-slate-950">
            {htmlPreview && (
              <div className="mb-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[10px] uppercase font-bold text-slate-500 mb-2">
                  Prévia Visual Renderizada:
                </div>
                <div dangerouslySetInnerHTML={{ __html: htmlPreview }} />
              </div>
            )}

            {outputLogs.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 text-center">
                <Terminal className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-xs">Clique em &quot;Executar&quot; para rodar seu código e ver a saída aqui.</p>
              </div>
            ) : (
              outputLogs.map((log, index) => (
                <div
                  key={index}
                  className={`p-2.5 rounded-lg border text-xs leading-relaxed ${
                    log.startsWith('❌') || log.startsWith('[ERRO]')
                      ? 'bg-rose-950/40 border-rose-900/60 text-rose-300'
                      : 'bg-slate-900/80 border-slate-800 text-emerald-300'
                  }`}
                >
                  <pre className="whitespace-pre-wrap font-mono">{log}</pre>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
