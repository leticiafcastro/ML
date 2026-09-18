import { useState, useMemo, useEffect } from 'react';
import { CATEGORIES, RAW_ITEMS, shuffleArray } from './data/modelLogicData';
import { CategoryId, ModelItem, PlacedItemsState } from './types';
import { CategoryColumn } from './components/CategoryColumn';
import { CardsPool } from './components/CardsPool';
import { ScoreBanner } from './components/ScoreBanner';
import { QuickMoveModal } from './components/QuickMoveModal';
import {
  CheckCheck,
  RotateCcw,
  Sparkles,
  ArrowDownCircle,
} from 'lucide-react';

export default function App() {
  // Shuffled items in initial state
  const [shuffledItems, setShuffledItems] = useState<ModelItem[]>(() =>
    shuffleArray(RAW_ITEMS)
  );

  // Placed status for each item: 'pool' or CategoryId
  const [placedItems, setPlacedItems] = useState<PlacedItemsState>(() => {
    const initial: PlacedItemsState = {};
    RAW_ITEMS.forEach((item) => {
      initial[item.id] = 'pool';
    });
    return initial;
  });

  const [isVerified, setIsVerified] = useState(false);
  const [quickMoveItem, setQuickMoveItem] = useState<ModelItem | null>(null);
  const [showWarningModal, setShowWarningModal] = useState(false);

  // Re-shuffle on mount if needed
  useEffect(() => {
    setShuffledItems(shuffleArray(RAW_ITEMS));
  }, []);

  // Items by placement
  const poolItems = useMemo(() => {
    return shuffledItems.filter((item) => placedItems[item.id] === 'pool');
  }, [shuffledItems, placedItems]);

  const itemsByCategory = useMemo(() => {
    const map: Record<CategoryId, ModelItem[]> = {
      Insumo: [],
      Atividade: [],
      Produto: [],
      Resultado: [],
      Impacto: [],
    };
    shuffledItems.forEach((item) => {
      const placement = placedItems[item.id];
      if (placement && placement !== 'pool') {
        map[placement].push(item);
      }
    });
    return map;
  }, [shuffledItems, placedItems]);

  // Results evaluation
  const evaluation = useMemo(() => {
    const itemResults: Record<string, boolean> = {};
    let correctCount = 0;

    RAW_ITEMS.forEach((item) => {
      const placement = placedItems[item.id];
      const isCorrect = placement === item.correctCategory;
      itemResults[item.id] = isCorrect;
      if (isCorrect) {
        correctCount++;
      }
    });

    return {
      total: RAW_ITEMS.length,
      correctCount,
      isPerfect: correctCount === RAW_ITEMS.length,
      itemResults,
    };
  }, [placedItems]);

  // Actions
  const handleMoveTo = (itemId: string, targetCategory: CategoryId | 'pool') => {
    setPlacedItems((prev) => ({
      ...prev,
      [itemId]: targetCategory,
    }));
  };

  const handleVerify = () => {
    if (poolItems.length > 0 && !isVerified) {
      setShowWarningModal(true);
      return;
    }
    setIsVerified(true);
  };

  const handleConfirmVerifyWithUnplaced = () => {
    setShowWarningModal(false);
    setIsVerified(true);
  };

  const handleResetGame = () => {
    const resetState: PlacedItemsState = {};
    RAW_ITEMS.forEach((item) => {
      resetState[item.id] = 'pool';
    });
    setPlacedItems(resetState);
    setShuffledItems(shuffleArray(RAW_ITEMS));
    setIsVerified(false);
    setQuickMoveItem(null);
    setShowWarningModal(false);
  };

  const placedCount = RAW_ITEMS.length - poolItems.length;

  return (
    <div className="min-h-screen bg-[#F4F6F8] text-[#2D3748] flex flex-col">
      {/* Top Navigation Header */}
      <header
        id="app-header"
        className="sticky top-0 z-30 bg-[#132A4E] text-white border-b border-[#132A4E] shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div>
              <h1 className="text-base sm:text-xl font-bold tracking-tight leading-tight text-white">
                Modelo Lógico - Dispensação de medicamentos
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end flex-wrap">
            <button
              id="btn-header-reset"
              type="button"
              onClick={handleResetGame}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white/90 bg-white/10 border border-white/20 hover:bg-white/20 transition-colors shadow-xs"
              title="Reiniciar jogo e reembaralhar todos os cards"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#F0A328]" />
              <span>Reiniciar</span>
            </button>

            <button
              id="btn-verify-answers"
              type="button"
              onClick={handleVerify}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#D96B17] hover:bg-[#c25c0e] active:bg-[#a94f0a] transition-colors shadow-md ring-offset-2 focus:ring-2 focus:ring-[#D96B17]"
            >
              <CheckCheck className="w-4 h-4" />
              <span>Verificar Respostas</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Verification Result Banner (if verified) */}
        {isVerified && (
          <ScoreBanner
            correctCount={evaluation.correctCount}
            totalCount={evaluation.total}
            onResetGame={handleResetGame}
            onContinueEditing={() => setIsVerified(false)}
          />
        )}

        {/* Instructions banner if not yet verified */}
        {!isVerified && (
          <div
            id="instruction-tip"
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#FFFFFF] border border-[#132A4E]/20 shadow-xs text-[14px] text-[#2D3748]"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#F0A328]/15 text-[#D96B17] shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <p className="text-[14px] leading-relaxed">
                Como jogar: Arraste os cards do rodapé para uma das 5 colunas no topo. Ao terminar, clique em "Verificar Respostas".
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 font-medium text-xs text-[#132A4E]/70 bg-[#132A4E]/5 px-3 py-1.5 rounded-xl border border-[#132A4E]/10">
              <ArrowDownCircle className="w-4 h-4 text-[#D96B17]" />
              <span>
                {placedCount} de {RAW_ITEMS.length} itens posicionados
              </span>
            </div>
          </div>
        )}

        {/* Section 1: Categorias do Modelo Lógico */}
        <section id="categories-columns-section">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#132A4E]">
              Categorias do Modelo Lógico
            </h2>
            <span className="text-xs text-[#132A4E]/60">
              5 dimensões estruturais
            </span>
          </div>

          <div
            id="columns-grid"
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3.5 items-stretch"
          >
            {CATEGORIES.map((cat) => (
              <CategoryColumn
                key={cat.id}
                category={cat}
                items={itemsByCategory[cat.id]}
                isVerified={isVerified}
                itemResults={evaluation.itemResults}
                onDropItem={(itemId, target) => handleMoveTo(itemId, target)}
                onMoveTo={handleMoveTo}
                onSelectForQuickMove={(item) => setQuickMoveItem(item)}
              />
            ))}
          </div>
        </section>

        {/* Section 2: Itens para Arrastar (Cards no Rodapé com Gabarito do Jogo) */}
        <CardsPool
          items={poolItems}
          totalItemsCount={RAW_ITEMS.length}
          onDropToPool={(itemId) => handleMoveTo(itemId, 'pool')}
          onMoveTo={handleMoveTo}
          onSelectForQuickMove={(item) => setQuickMoveItem(item)}
        />
      </main>

      {/* Footer info */}
      <footer className="border-t border-[#132A4E]/20 bg-[#FFFFFF] py-4 px-4 text-center text-xs sm:text-sm font-medium text-[#132A4E]/80">
        <p>Elaborado por Letícia Castro</p>
      </footer>

      {/* Quick Move Dialog for mobile / touch accessibility */}
      <QuickMoveModal
        item={quickMoveItem}
        categories={CATEGORIES}
        onClose={() => setQuickMoveItem(null)}
        onSelectCategory={(itemId, catId) => handleMoveTo(itemId, catId)}
      />

      {/* Warning modal if user clicks Verify with unplaced items */}
      {showWarningModal && (
        <div
          id="unplaced-warning-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 p-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
              Cards pendentes
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Você ainda tem <strong className="font-semibold">{poolItems.length} card(s)</strong> sem classificar. Deseja verificar agora mesmo assim ou continuar posicionando os itens?
            </p>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowWarningModal(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#132A4E] bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Continuar Posicionando
              </button>
              <button
                type="button"
                onClick={handleConfirmVerifyWithUnplaced}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#D96B17] hover:bg-[#c25c0e] transition-colors"
              >
                Verificar Agora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

