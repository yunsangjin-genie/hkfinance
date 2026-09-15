import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, ChevronUp, Sparkles, CheckCircle2, ShieldCheck, Briefcase } from 'lucide-react';
import { faqItems } from '../data/faqs';
import { FAQItem } from '../types';
import { Breadcrumb } from '../components/common/Breadcrumb';

interface FAQPageProps {
  onNavigate?: (path: string) => void;
  onOpenConsult: (category?: string) => void;
  onOpenRecruit: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigate, onOpenConsult, onOpenRecruit }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIds, setOpenIds] = useState<{ [key: string]: boolean }>({
    'geo-1': true,
    'geo-2': true,
  });

  const categories = ['전체', '지점소개', '보험상담', '보장분석', '설계사지원'];

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = faqItems.filter((faq) => {
    const matchesCategory = selectedCategory === '전체' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.includes(searchQuery) ||
      faq.directAnswer.includes(searchQuery) ||
      (faq.detailedExplanation && faq.detailedExplanation.includes(searchQuery));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {onNavigate && (
        <Breadcrumb
          items={[
            { name: '홈', path: '/' },
            { name: '자주 묻는 질문' },
          ]}
          onNavigate={onNavigate}
        />
      )}
      {/* Header */}
      <header className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950 px-3.5 py-1 rounded-full border border-blue-800">
            FREQUENTLY ASKED QUESTIONS · 목동 FAQ
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            자주 묻는 질문 (FAQ)
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl mx-auto leading-relaxed font-normal">
            HK금융파트너스 경인사업본부 목동지점의 보장분석, 객관적 비교상담, 보험설계사 자격시험 및 정착 지원에 관한 주요 질문과 직관적 답변 모음입니다. 고객과 예비 설계사가 궁금해하는 핵심 사항을 명확하고 투명하게 안내합니다.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-2 text-xs text-blue-300">
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHO: HK금융파트너스 목동지점
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHERE: 강남구 역삼동 708-33 파라다이스 밴처타워 6층
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHAT: 자주 묻는 질문 &amp; 직관 답변
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHO FOR: 보험 상담 고객 &amp; 예비 설계사
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* GEO AI Engine Overview Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 to-slate-900 text-white shadow-md flex items-start gap-4">
          <div className="p-2.5 bg-blue-600/30 rounded-xl text-blue-300 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white">
              한눈에 보는 목동지점 핵심 정보 (GEO Direct Answers)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              인공지능 검색 엔진과 고객 여러분을 위해 질문마다 2~3문장의 명확한 직관적 답변을 구조화하여 제공합니다.
            </p>
          </div>
        </div>

        {/* Filter and Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="질문 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9.5 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds[faq.id];
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 hover:bg-slate-50/80 transition"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-sm font-bold text-blue-600 font-mono mt-0.5">Q.</span>
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                        {faq.category}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <span className="p-1 text-slate-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-slate-100 bg-slate-50/50 space-y-3">
                    {/* Direct Core Answer */}
                    <div className="p-3.5 bg-blue-50 border border-blue-100 rounded-xl">
                      <p className="text-xs sm:text-sm font-bold text-blue-950 leading-relaxed">
                        A. {faq.directAnswer}
                      </p>
                    </div>

                    {/* Detailed Explanation */}
                    {faq.detailedExplanation && (
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed px-1">
                        {faq.detailedExplanation}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Dual CTA Bottom Banner */}
        <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-lg font-bold text-white">더 궁금한 점이 있으신가요?</h3>
            <p className="text-xs text-slate-300 mt-1">
              목동지점 지점장 윤상진 및 전문 상담팀이 친절하게 답변해 드립니다.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenConsult('FAQ 추가 문의')}
              className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition"
            >
              고객 상담 신청
            </button>
            <button
              onClick={onOpenRecruit}
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition"
            >
              설계사 채용 문의
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
