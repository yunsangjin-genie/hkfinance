import React, { useState, useEffect } from 'react';
import { Activity, ShieldAlert, Stethoscope, Coins, HeartHandshake, Building2, Check, ArrowRight, ShieldCheck, HelpCircle, Search, Sparkles, X } from 'lucide-react';
import { InsuranceProduct } from '../types';
import { insuranceProducts } from '../data/products';

interface ProductsPageProps {
  onOpenConsult: (category: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onOpenConsult }) => {
  const [activeTab, setActiveTab] = useState<string>('전체');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeProductModal, setActiveProductModal] = useState<InsuranceProduct | null>(null);

  useEffect(() => {
    if (!activeProductModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveProductModal(null);
      }
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeProductModal]);

  const categories = ['전체', '건강·실손', '암·3대질병', '연금·노후', '종신·정기', '화재·재산'];

  const filteredProducts = insuranceProducts.filter((p) => {
    const matchesCategory = activeTab === '전체' || p.category === activeTab;
    const matchesSearch =
      p.name.includes(searchTerm) ||
      p.problemStatement.includes(searchTerm) ||
      p.description.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  const iconMap: { [key: string]: React.ReactNode } = {
    Activity: <Activity className="w-6 h-6 text-blue-600" />,
    ShieldAlert: <ShieldAlert className="w-6 h-6 text-indigo-600" />,
    Stethoscope: <Stethoscope className="w-6 h-6 text-emerald-600" />,
    Coins: <Coins className="w-6 h-6 text-amber-600" />,
    HeartHandshake: <HeartHandshake className="w-6 h-6 text-rose-600" />,
    Building2: <Building2 className="w-6 h-6 text-slate-700" />,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950 px-3.5 py-1 rounded-full border border-blue-800">
            INSURANCE SOLUTIONS
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            고민별 맞춤 보험상품 안내
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            국내 주요 보험사의 다양한 약관과 보장 구조를 객관적으로 비교하여 최적의 플랜을 제안합니다.
          </p>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition cursor-pointer ${
                  activeTab === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="상품명 또는 고민 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9.5 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 p-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 border border-blue-100">
                    {prod.problemStatement}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                    {iconMap[prod.iconName] || <Activity className="w-5 h-5 text-blue-600" />}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">{prod.name}</h3>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">{prod.tagline}</p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {prod.description}
                </p>

                <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                  <p className="font-bold text-slate-700">💡 핵심 보장 점검 포인트</p>
                  {prod.keyCoveragePoints.slice(0, 2).map((point, idx) => (
                    <p key={idx} className="text-[11px] text-slate-600 flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-blue-600 shrink-0" />
                      <span className="line-clamp-1">{point}</span>
                    </p>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setActiveProductModal(prod)}
                  className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition text-center cursor-pointer"
                >
                  상세보기
                </button>
                <button
                  onClick={() => onOpenConsult(prod.name)}
                  className="py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>1:1 상담</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Compliance Footer Box */}
        <div className="mt-14 p-5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-500 leading-relaxed">
          <p className="font-semibold text-slate-700 mb-1">📌 금융소비자 유의사항</p>
          <p>• 보험상품의 가입 한도, 세부 보장 내용 및 보험료는 각 보험회사의 사업방법서 및 약관에 따르며, 고객의 연령·건강상태·직업에 따라 가입 조건이 상이할 수 있습니다.</p>
          <p>• 가입 전 반드시 해당 보험사의 상품설명서와 약관을 꼼꼼히 확인하시기 바랍니다.</p>
        </div>
      </section>

      {/* Modal if open */}
      {activeProductModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
          onClick={() => setActiveProductModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white select-none">
              <div>
                <span className="text-xs font-bold text-blue-400">{activeProductModal.problemStatement}</span>
                <h3 className="text-base font-bold text-white">{activeProductModal.name}</h3>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveProductModal(null);
                }}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
                aria-label="닫기"
              >
                <X className="w-5 h-5 pointer-events-none" />
              </button>
            </div>
            <div className="p-6 max-h-[80vh] overflow-y-auto space-y-4">
              <p className="text-xs text-slate-700 leading-relaxed">{activeProductModal.description}</p>
              
              <div className="p-4 bg-slate-50 rounded-xl space-y-2">
                <p className="text-xs font-bold text-slate-800">🔍 주요 보장 특약</p>
                {activeProductModal.keyCoveragePoints.map((p, idx) => (
                  <p key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </p>
                ))}
              </div>

              <div className="p-3.5 bg-blue-50 text-blue-950 rounded-xl text-xs">
                <strong>지점장 윤상진의 상담 코멘트:</strong> {activeProductModal.consultingAdvice}
              </div>

              <button
                onClick={() => {
                  const pName = activeProductModal.name;
                  setActiveProductModal(null);
                  onOpenConsult(pName);
                }}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition"
              >
                이 상품에 대해 무료 상담 신청
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
