import React, { useState } from 'react';
import { CategoryId, ModelItem } from '../types';
import { ItemCard } from './ItemCard';
import { Layers, Sparkles, MoveDown } from 'lucide-react';

interface CardsPoolProps {
  items: ModelItem[];
  totalItemsCount: number;
  onDropToPool: (itemId: string) => void;
  onMoveTo: (itemId: string, targetCategory: CategoryId | 'pool') => void;
  onSelectForQuickMove: (item: ModelItem) => void;
}

export const CardsPool: React.FC<CardsPoolProps> = ({
  items,
  totalItemsCount,
  onDropToPool,
  onMoveTo,
  onSelectForQuickMove,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const itemId = e.dataTransfer.getData('text/plain');
    if (itemId) {
      onDropToPool(itemId);
    }
  };

  const placedCount = totalItemsCount - items.length;

  return (
    <section
      id="cards-pool-section"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`rounded-2xl border transition-all duration-200 bg-[#FFFFFF] shadow-xs ${
        isDragOver
          ? 'border-[#D96B17] ring-2 ring-[#D96B17]/30 bg-[#F4F6F8]'
          : 'border-[#132A4E]/30'
      }`}
    >
      <div className="p-4 sm:p-5 border-b border-[#132A4E]/15 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#132A4E]/10 text-[#132A4E]">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#132A4E] flex items-center gap-2">
              Itens para Arrastar
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            id="pool-progress-pill"
            className="text-xs font-semibold px-3 py-1 rounded-full bg-[#132A4E]/5 text-[#132A4E] border border-[#132A4E]/15"
          >
            {items.length} {items.length === 1 ? 'card restante' : 'cards restantes'} ({placedCount}/{totalItemsCount} posicionados)
          </span>
        </div>
      </div>

      <div
        className={`p-4 sm:p-6 transition-colors ${
          isDragOver ? 'bg-[#F4F6F8]' : 'bg-[#FFFFFF]'
        }`}
      >
        {items.length === 0 ? (
          <div
            id="pool-empty-state"
            className="py-10 px-4 text-center rounded-xl border border-dashed border-[#2E7D32]/50 bg-[#E8F5E9]/50"
          >
            <Sparkles className="w-8 h-8 text-[#2E7D32] mx-auto mb-2" />
            <h3 className="text-sm font-bold text-[#1b4e1f] mb-1">
              Todos os {totalItemsCount} itens foram distribuídos nas colunas!
            </h3>
            <p className="text-xs text-[#2E7D32] max-w-md mx-auto mb-3">
              Clique em <strong className="font-semibold text-[#D96B17]">"Verificar Respostas"</strong> acima para avaliar sua classificação no Modelo Lógico.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-[#132A4E]/70 bg-white px-3 py-1.5 rounded-lg border border-[#132A4E]/20">
              <MoveDown className="w-3.5 h-3.5" />
              Você pode arrastar cards de volta para esta área a qualquer momento.
            </div>
          </div>
        ) : (
          <div
            id="pool-items-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
          >
            {items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                currentCategory="pool"
                isVerified={false}
                onMoveTo={onMoveTo}
                onSelectForQuickMove={onSelectForQuickMove}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
