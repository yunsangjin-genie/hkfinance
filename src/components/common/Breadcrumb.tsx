import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate: (path: string) => void;
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  onNavigate,
  className = '',
}) => {
  if (!items || items.length <= 1) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-xs text-slate-500 flex items-center select-none ${className}`}
    >
      <ol className="flex items-center space-x-1.5 flex-wrap" itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isHome = index === 0;

          return (
            <li
              key={index}
              className="flex items-center space-x-1.5"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {index > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
              )}
              {isLast || !item.path ? (
                <span
                  className="font-semibold text-slate-800 line-clamp-1 max-w-[220px] sm:max-w-none"
                  itemProp="name"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => onNavigate(item.path!)}
                  className="hover:text-blue-600 transition flex items-center gap-1 cursor-pointer"
                  itemProp="item"
                >
                  {isHome && <Home className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                  <span itemProp="name">{item.name}</span>
                </button>
              )}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
