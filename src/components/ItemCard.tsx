import React, { useRef } from 'react';
import { ModelItem, CategoryId } from '../types';
import { CheckCircle2, XCircle } from 'lucide-react';

interface ItemCardProps {
  item: ModelItem;
  currentCategory: CategoryId | 'pool';
  isVerified: boolean;
  isCorrect?: boolean;
  onMoveTo: (itemId: string, targetCategory: CategoryId | 'pool') => void;
  onSelectForQuickMove?: (item: ModelItem) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  currentCategory,
  isVerified,
  isCorrect,
  onSelectForQuickMove,
}) => {
  const isDraggingRef = useRef(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    e.dataTransfer.setData('text/plain', item.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 150);
  };

  const handleClick = () => {
    if (isDraggingRef.current) return;
    onSelectForQuickMove?.(item);
  };

  // Determine styling based on verification
  let borderClasses = 'border border-[#132A4E]/30 hover:border-[#132A4E] shadow-xs';
  let bgClasses = 'bg-[#FFFFFF] text-[#2D3748]';
  let statusBadge = null;

  if (isVerified && currentCategory !== 'pool') {
    if (isCorrect) {
      borderClasses = 'border-2 border-[#2E7D32] shadow-sm';
      bgClasses = 'bg-[#E8F5E9] text-[#1b4e1f]';
      statusBadge = (
        <span
          id={`status-correct-${item.id}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#2E7D32] bg-[#2E7D32]/10 border border-[#2E7D32]/30 px-2 py-0.5 rounded-md shrink-0"
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          Correto
        </span>
      );
    } else {
      borderClasses = 'border-2 border-[#C62828] shadow-sm';
      bgClasses = 'bg-[#FFEBEE] text-[#781818]';
      statusBadge = (
        <span
          id={`status-wrong-${item.id}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#C62828] bg-[#C62828]/10 border border-[#C62828]/30 px-2 py-0.5 rounded-md shrink-0"
        >
          <XCircle className="w-3.5 h-3.5" />
          Incorreto
        </span>
      );
    }
  }

  return (
    <div
      id={`card-${item.id}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectForQuickMove?.(item);
        }
      }}
      className={`group relative rounded-xl p-3.5 transition-all duration-200 cursor-pointer cursor-grab active:cursor-grabbing select-none shadow-xs hover:-translate-y-0.5 hover:shadow-md ${borderClasses} ${bgClasses}`}
      title="Clique na caixinha para escolher a coluna ou arraste-a diretamente"
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-snug text-slate-800 dark:text-slate-200">
          {item.text}
        </p>

        {statusBadge && (
          <div className="mt-2.5 pt-1.5 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-start">
            {statusBadge}
          </div>
        )}
      </div>
    </div>
  );
};
