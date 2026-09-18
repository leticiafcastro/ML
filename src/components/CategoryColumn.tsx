import React, { useState } from 'react';
import { CategoryId, CategoryInfo, ModelItem } from '../types';
import { ItemCard } from './ItemCard';
import { Inbox, CheckCircle, AlertCircle } from 'lucide-react';

interface CategoryColumnProps {
  category: CategoryInfo;
  items: ModelItem[];
  isVerified: boolean;
  itemResults: Record<string, boolean>;
  onDropItem: (itemId: string, targetCategory: CategoryId) => void;
  onMoveTo: (itemId: string, targetCategory: CategoryId | 'pool') => void;
  onSelectForQuickMove?: (item: ModelItem) => void;
}

export const CategoryColumn: React.FC<CategoryColumnProps> = ({
  category,
  items,
  isVerified,
  itemResults,
  onDropItem,
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
    // Avoid false leaves when hovering over child elements
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const itemId = e.dataTransfer.getData('text/plain');
    if (itemId) {
      onDropItem(itemId, category.id);
    }
  };

  // Count correct and incorrect for summary badge if verified
  const correctCount = isVerified
    ? items.filter((i) => itemResults[i.id] === true).length
    : 0;

  return (
    <div
      id={`column-${category.id.toLowerCase()}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col rounded-2xl transition-all duration-200 bg-[#FFFFFF] border shadow-xs ${
        isDragOver
          ? 'border-[#D96B17] ring-2 ring-[#D96B17]/30 shadow-md'
          : 'border-[#132A4E]/30'
      }`}
    >
      {/* Column Header */}
      <div className="p-3.5 border-b border-[#132A4E]/15 bg-[#FFFFFF] rounded-t-2xl">
        <div className="flex items-center justify-center text-center">
          <span
            id={`badge-cat-${category.id.toLowerCase()}`}
            className={`w-full text-base sm:text-lg font-bold tracking-wide uppercase px-3 py-1.5 rounded-xl border ${category.badgeColor}`}
          >
            {category.label}
          </span>
        </div>

        {isVerified && items.length > 0 && (
          <div className="mt-2.5 pt-2 border-t border-[#132A4E]/10 flex items-center justify-between text-xs">
            <span className="text-[#2E7D32] font-semibold inline-flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              {correctCount} corretos
            </span>
            {items.length - correctCount > 0 && (
              <span className="text-[#C62828] font-semibold inline-flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {items.length - correctCount} a corrigir
              </span>
            )}
          </div>
        )}
      </div>

      {/* Cards Area / Drop Target */}
      <div
        className={`p-3 flex-1 flex flex-col gap-2.5 min-h-[220px] transition-colors rounded-b-2xl ${
          isDragOver ? 'bg-[#F4F6F8]' : 'bg-[#FFFFFF]'
        }`}
      >
        {items.length === 0 ? (
          <div
            className={`flex-1 flex flex-col items-center justify-center p-4 text-center rounded-xl border border-dashed transition-all ${
              isDragOver
                ? 'border-[#D96B17] bg-[#D96B17]/5 text-[#D96B17]'
                : 'border-[#132A4E]/20 text-[#132A4E]/60'
            }`}
          >
            <Inbox className="w-6 h-6 mb-1.5 opacity-60 text-[#132A4E]" />
            <p className="text-xs font-medium">
              {isDragOver ? 'Solte o card aqui' : 'Arraste um card para esta coluna'}
            </p>
          </div>
        ) : (
          items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              currentCategory={category.id}
              isVerified={isVerified}
              isCorrect={itemResults[item.id]}
              onMoveTo={onMoveTo}
              onSelectForQuickMove={onSelectForQuickMove}
            />
          ))
        )}
      </div>
    </div>
  );
};
