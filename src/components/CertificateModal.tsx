import React, { useRef } from 'react';
import { Award, CheckCircle, Printer, X, Sparkles, ShieldCheck, Download } from 'lucide-react';
import { UserStats, CourseTrack } from '../types';

interface CertificateModalProps {
  stats: UserStats;
  currentTrack: CourseTrack;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  stats,
  currentTrack,
  onClose,
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const certificateDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const certificateCode = `CQ-${currentTrack.id.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 my-8">
        
        {/* Top Controls */}
        <div className="flex items-center justify-between mb-6 print:hidden">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Award className="w-4 h-4" />
            Certificado Oficial de Conquista
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Salvar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Area */}
        <div
          ref={printRef}
          className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-4 border-double border-amber-500/40 rounded-2xl p-8 sm:p-12 text-center text-slate-100 shadow-inner overflow-hidden"
        >
          {/* Watermark Logo in background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none text-8xl font-black text-amber-400 select-none">
            ⚡ CODEQUEST
          </div>

          {/* Certificate Header */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black text-lg">
              ⚡
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              Code<span className="text-amber-400">Quest</span> Academy
            </span>
          </div>

          <div className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold mb-4">
            Certificado de Excelência em Programação
          </div>

          <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto mb-6">
            Certificamos com distinção e mérito que o aprendiz dev
          </p>

          {/* Student Name */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-amber-300 tracking-tight mb-4 underline decoration-amber-500/40 decoration-2 underline-offset-8">
            {stats.name || 'Dev Aprendiz'}
          </h1>

          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed mb-8">
            concluiu com êxito todos os módulos, exercícios práticos e desafios da trilha{' '}
            <strong className="text-white font-bold">{currentTrack.name}</strong>, demonstrando proficiência em lógica computacional, resolução de problemas e algoritmos modernos.
          </p>

          {/* Seal and Signatures */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-800 text-xs text-slate-400">
            <div className="text-left">
              <div className="font-mono text-slate-300 font-bold">Data de Emissão</div>
              <div>{certificateDate}</div>
            </div>

            {/* Gold Seal */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 flex items-center justify-center text-slate-950 font-black text-xs shadow-xl ring-4 ring-amber-500/20">
              <div className="w-13 h-13 rounded-full border-2 border-dashed border-slate-950 flex items-center justify-center flex-col text-[8px] font-mono leading-tight">
                <span>SELO</span>
                <span className="font-black">OFICIAL</span>
              </div>
            </div>

            <div className="text-right">
              <div className="font-mono text-slate-300 font-bold">Código de Autenticação</div>
              <div className="font-mono text-amber-400 font-bold">{certificateCode}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
