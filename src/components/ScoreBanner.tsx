import React from 'react';
import { RotateCcw, Award, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';

interface ScoreBannerProps {
  correctCount: number;
  totalCount: number;
  onResetGame: () => void;
  onContinueEditing: () => void;
}

export const ScoreBanner: React.FC<ScoreBannerProps> = ({
  correctCount,
  totalCount,
  onResetGame,
  onContinueEditing,
}) => {
  const percentage = Math.round((correctCount / totalCount) * 100);
  const isPerfect = correctCount === totalCount;
  const isGood = correctCount >= 10;

  return (
    <div
      id="score-result-banner"
      className={`rounded-2xl p-5 sm:p-6 border shadow-md transition-all animate-in fade-in slide-in-from-top-4 duration-300 ${
        isPerfect
          ? 'bg-[#E8F5E9] border-2 border-[#2E7D32] text-[#1b4e1f]'
          : isGood
          ? 'bg-white border-2 border-[#132A4E] text-[#132A4E]'
          : 'bg-[#FFEBEE]/60 border-2 border-[#C62828] text-[#781818]'
      }`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div
            className={`p-3 rounded-2xl shrink-0 ${
              isPerfect
                ? 'bg-[#2E7D32] text-white shadow-md'
                : isGood
                ? 'bg-[#132A4E] text-white shadow-md'
                : 'bg-[#D96B17] text-white shadow-md'
            }`}
          >
            {isPerfect ? (
              <Award className="w-8 h-8" />
            ) : isGood ? (
              <CheckCircle2 className="w-8 h-8" />
            ) : (
              <AlertTriangle className="w-8 h-8" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white border border-current/20">
                Resultado da Verificação
              </span>
              <span className="text-xs font-semibold opacity-80">
                {percentage}% de acerto
              </span>
            </div>

            <h2
              id="final-score-text"
              className="text-xl sm:text-2xl font-bold mt-1 tracking-tight"
            >
              Você acertou {correctCount} de {totalCount} itens!
            </h2>

            <p className="text-xs sm:text-sm mt-1 opacity-90 max-w-xl leading-relaxed">
              {isPerfect
                ? `Parabéns! Você classificou corretamente todos os ${totalCount} itens nas 5 categorias do Modelo Lógico!`
                : isGood
                ? 'Excelente desempenho! Observe os cards com borda vermelha (#C62828) para reposicioná-los nas categorias corretas.'
                : 'Observe os cards destacados com borda vermelha (#C62828) para reposicioná-los nas categorias correspondentes.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto shrink-0 flex-wrap">
          <button
            id="btn-score-retry"
            type="button"
            onClick={onContinueEditing}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#132A4E]/30 text-[#132A4E] text-xs sm:text-sm font-semibold hover:bg-[#F4F6F8] transition-colors shadow-xs"
          >
            <span>Ajustar Itens</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            id="btn-score-reset"
            type="button"
            onClick={onResetGame}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#132A4E] text-white text-xs sm:text-sm font-bold hover:bg-[#1c3c6e] transition-colors shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reiniciar o Jogo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
