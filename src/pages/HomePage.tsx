import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { TwoTrackServiceSection } from '../components/home/TwoTrackServiceSection';
import { BranchValuesSection } from '../components/home/BranchValuesSection';
import { CoverageAnalysisSection } from '../components/home/CoverageAnalysisSection';
import { ProblemProductsSection } from '../components/home/ProblemProductsSection';
import { BlogInsightsSection } from '../components/home/BlogInsightsSection';
import { HelpCircle, ChevronRight, Sparkles, ShieldCheck, Briefcase, Users, CheckCircle2 } from 'lucide-react';
import { CompanyInfo, NavigationPage } from '../types';
import { faqItems } from '../data/faqs';
import { recruitmentBenefits, careerSteps } from '../data/recruitment';
import { siteImages } from '../assets/images';

interface HomePageProps {
  companyInfo: CompanyInfo;
  onOpenConsult: (category?: string) => void;
  onOpenRecruit: () => void;
  onNavigate: (page: NavigationPage) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  companyInfo,
  onOpenConsult,
  onOpenRecruit,
  onNavigate,
}) => {
  // Top 4 FAQ for home preview
  const previewFaqs = faqItems.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* SECTION 1: HERO */}
      <HeroSection
        companyInfo={companyInfo}
        onOpenConsult={onOpenConsult}
        onOpenRecruit={onOpenRecruit}
        onNavigate={onNavigate}
      />

      {/* SECTION 2: TWO SERVICES (CUSTOMER vs RECRUIT) */}
      <TwoTrackServiceSection
        onOpenConsult={onOpenConsult}
        onOpenRecruit={onOpenRecruit}
        onNavigate={onNavigate}
      />

      {/* SECTION 3: MOKDONG BRANCH VALUES */}
      <BranchValuesSection
        companyInfo={companyInfo}
        onNavigate={onNavigate}
        onOpenConsult={onOpenConsult}
      />

      {/* SECTION 4: COVERAGE ANALYSIS */}
      <CoverageAnalysisSection onOpenConsult={onOpenConsult} />

      {/* SECTION 5: PROBLEM-ORIENTED PRODUCTS */}
      <ProblemProductsSection onOpenConsult={onOpenConsult} />

      {/* RECRUITMENT TEASER SECTION */}
      <section className="py-20 bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-full border border-indigo-400/30">
                <Briefcase className="w-3.5 h-3.5" /> 신입 &amp; 경력 보험설계사 모집
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
                보험설계사,<br />
                <span className="text-indigo-400">혼자 시작하지 마세요.</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {companyInfo.fullName}은 보험설계사를 처음 시작하는 분들이 현장에서 빠르게 안착하고 성장할 수 있도록 
                <strong> 시험비용 지원부터 교육, 1:1 상담 동행</strong>까지 빈틈없는 실무 지원을 제공합니다.
              </p>

              <div className="space-y-2 pt-2">
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>보험영업 경험이 없어도 체계적인 기초 교육 제공</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>베테랑 선배 설계사 1:1 고객 미팅 현장 동행</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>블로그, SNS 등 디지털 고객 유입 노하우 전수</span>
                </div>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={onOpenRecruit}
                  className="w-full sm:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>설계사 지원 상담 신청</span>
                </button>
                <button
                  onClick={() => onNavigate('recruitment')}
                  className="w-full sm:w-auto px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-sm transition cursor-pointer"
                >
                  지원 혜택 &amp; 성장 로드맵 보기
                </button>
              </div>
            </div>

            {/* Visual Team Photo Showcase */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl group">
                <img
                  src={siteImages.teamGangnam}
                  alt="HK금융파트너스 지점 팀원 및 설계사 패밀리 사진"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-xs font-bold text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5 shadow-md">
                    <Users className="w-3.5 h-3.5" /> 서로 돕고 함께 성장하는 팀
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="text-base sm:text-lg font-bold">"혼자가 아닌, 든든한 팀과 함께 뜁니다"</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    정착률 90% 이상 · 실전 미팅 동행 멘토링 상시 운영
                  </p>
                </div>
              </div>

              {/* 2 Mini Badges Below Photo */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300">
                  <span className="text-indigo-400 font-bold block mb-0.5">자격취득 원스톱</span>
                  생명·손해보험 시험비 및 교재 100% 지원
                </div>
                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300">
                  <span className="text-indigo-400 font-bold block mb-0.5">1:1 맞춤 코칭</span>
                  초기 상담 동행 및 제안서 공동 검토
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: BLOG & INSIGHTS */}
      <BlogInsightsSection
        onOpenConsult={onOpenConsult}
        onNavigate={onNavigate}
      />


      {/* GEO & FAQ PREVIEW SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
              GEO &amp; FAQ DIRECT ANSWERS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              자주 묻는 질문 한눈에 보기
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              목동지점의 보험 상담 및 설계사 지원에 대한 핵심 답변입니다.
            </p>
          </div>

          <div className="space-y-4">
            {previewFaqs.map((faq) => (
              <div
                key={faq.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-left space-y-2"
              >
                <div className="flex items-start gap-2.5">
                  <span className="text-blue-600 font-bold font-mono text-sm shrink-0">Q.</span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">{faq.question}</h3>
                </div>
                <div className="pl-6 border-l-2 border-blue-500/50 mt-2 space-y-1">
                  <p className="text-xs sm:text-sm font-semibold text-blue-900 leading-relaxed">
                    A. {faq.directAnswer}
                  </p>
                  {faq.detailedExplanation && (
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {faq.detailedExplanation}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => onNavigate('faq')}
              className="inline-flex items-center gap-1.5 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs sm:text-sm transition"
            >
              <span>전체 FAQ &amp; 질문 답변 모음 보기</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
