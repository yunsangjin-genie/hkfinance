import React, { useState, useEffect } from 'react';
import { Activity, ShieldAlert, Stethoscope, Coins, HeartHandshake, Building2, ArrowRight, Check, X, ShieldCheck, Sparkles, HelpCircle } from 'lucide-react';
import { InsuranceProduct } from '../../types';
import { insuranceProducts } from '../../data/products';

interface ProblemProductsSectionProps {
  onOpenConsult: (category: string) => void;
}

export const ProblemProductsSection: React.FC<ProblemProductsSectionProps> = ({
  onOpenConsult,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<InsuranceProduct | null>(null);

  useEffect(() => {
    if (!selectedProduct) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProduct(null);
      }
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProduct]);

  const iconMap: { [key: string]: React.ReactNode } = {
    Activity: <Activity className="w-6 h-6 text-blue-600" />,
    ShieldAlert: <ShieldAlert className="w-6 h-6 text-indigo-600" />,
    Stethoscope: <Stethoscope className="w-6 h-6 text-emerald-600" />,
    Coins: <Coins className="w-6 h-6 text-amber-600" />,
    HeartHandshake: <HeartHandshake className="w-6 h-6 text-rose-600" />,
    Building2: <Building2 className="w-6 h-6 text-slate-700" />,
  };

  return (
    <section className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
            INSURANCE SOLUTIONS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            고민에 맞춘 합리적 보장 솔루션
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            상품 이름을 나열하기보다, 지금 고객님께서 겪고 계신 걱정과 상황에 알맞은 맞춤 솔루션을 안내합니다.
          </p>
        </div>

        {/* 6 Problem-Oriented Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insuranceProducts.map((prod) => (
            <div
              key={prod.id}
              className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:bg-white hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Problem Badge Header */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100/80 text-blue-800">
                    {prod.problemStatement}
                  </span>
                  <div className="w-11 h-11 rounded-xl bg-white shadow-xs flex items-center justify-center border border-slate-100">
                    {iconMap[prod.iconName] || <Activity className="w-6 h-6 text-blue-600" />}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mt-1">
                    {prod.tagline}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {prod.description}
                </p>

                {/* Key Coverage Points Preview */}
                <div className="pt-2 border-t border-slate-200/60 space-y-1.5">
                  <p className="text-[11px] font-bold text-slate-400">주요 검토 포인트</p>
                  {prod.keyCoveragePoints.slice(0, 2).map((point, idx) => (
                    <div key={idx} className="flex items-start space-x-1.5 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 mt-4 border-t border-slate-200/80 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedProduct(prod)}
                  className="py-2.5 px-3 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-semibold rounded-xl text-xs transition text-center cursor-pointer"
                >
                  상세보기
                </button>
                <button
                  onClick={() => onOpenConsult(prod.name)}
                  className="py-2.5 px-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl text-xs transition shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>상담하기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
          onClick={() => setSelectedProduct(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white select-none">
              <div className="flex items-center space-x-2.5">
                <span className="text-xs font-bold px-2 py-0.5 bg-blue-600 rounded-md text-white">
                  {selectedProduct.problemStatement}
                </span>
                <h3 className="text-base font-bold text-white">{selectedProduct.name}</h3>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProduct(null);
                }}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
                aria-label="닫기"
              >
                <X className="w-5 h-5 pointer-events-none" />
              </button>
            </div>

            <div className="p-6 max-h-[80vh] overflow-y-auto space-y-5">
              <div>
                <p className="text-sm font-semibold text-blue-700 mb-1">{selectedProduct.tagline}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{selectedProduct.description}</p>
              </div>

              {/* Target Audience */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <p className="text-xs font-bold text-slate-800">🎯 이런 분께 추천합니다</p>
                <ul className="space-y-1">
                  {selectedProduct.targetAudience.map((item, idx) => (
                    <li key={idx} className="text-xs text-slate-600 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Points */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-800">🔍 핵심 점검 항목</p>
                <div className="space-y-1.5">
                  {selectedProduct.keyCoveragePoints.map((point, idx) => (
                    <div key={idx} className="p-2.5 bg-blue-50/50 border border-blue-100 rounded-lg text-xs text-slate-700 flex items-start gap-2">
                      <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consulting Advice */}
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
                <strong>💡 목동지점 지점장 윤상진 팁:</strong> {selectedProduct.consultingAdvice}
              </div>

              {/* Compliance Notice */}
              <p className="text-[11px] text-slate-400 italic">
                * {selectedProduct.complianceNotice}
              </p>

              {/* Action */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    const catName = selectedProduct.name;
                    setSelectedProduct(null);
                    onOpenConsult(catName);
                  }}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2"
                >
                  <span>이 상품에 대해 1:1 맞춤 상담 신청하기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
