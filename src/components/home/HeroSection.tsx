import React from 'react';
import { ShieldCheck, Briefcase, CheckCircle2, ArrowRight, Sparkles, Building, ChevronRight, Phone, Award } from 'lucide-react';
import { CompanyInfo, NavigationPage } from '../../types';
import { siteImages } from '../../assets/images';

interface HeroSectionProps {
  companyInfo: CompanyInfo;
  onOpenConsult: () => void;
  onOpenRecruit: () => void;
  onNavigate: (page: NavigationPage) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  companyInfo,
  onOpenConsult,
  onOpenRecruit,
  onNavigate,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-10 pb-16 md:py-20">
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Core Value & Dual CTA */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300 text-xs font-semibold backdrop-blur-xs">
              <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-ping" />
              <span>{companyInfo.fullName} 공식 채널</span>
            </div>

            {/* Main Slogan / Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight sm:leading-tight">
              보험을 권하기보다,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                필요한 보장을 함께 설계합니다.
              </span>
            </h1>

            {/* Sub Copy */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              {companyInfo.fullName}은 고객의 상황과 필요를 먼저 살펴보고 보험에 대한 합리적인 판단을 도와드립니다.
              아울러 보험설계사로 새롭게 시작하는 분들을 위한 체계적인 교육과 실무 동행 지원을 제공합니다.
            </p>

            {/* Key Value Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="flex items-center space-x-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>가입 강요 없는 1:1 객관적 무료 보장분석</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>신입 설계사 시험비용·교육·동행 멘토링</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>국내 30여 개 생·손보사 비교 견적</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>디지털 콘텐츠 및 온라인 고객 유입 노하우</span>
              </div>
            </div>

            {/* Dual CTA Buttons (Visually Clear & Distinct) */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              {/* Customer Funnel Button */}
              <button
                onClick={onOpenConsult}
                className="px-6 py-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-sm md:text-base rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition flex items-center justify-center gap-2 group cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5 text-blue-200" />
                <span>내 보험 무료 상담 신청</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Recruitment Funnel Button */}
              <button
                onClick={onOpenRecruit}
                className="px-6 py-4 bg-slate-800/90 hover:bg-slate-800 active:bg-slate-900 border border-slate-700 text-white font-bold text-sm md:text-base rounded-xl shadow-md hover:border-indigo-500/50 transition flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Briefcase className="w-5 h-5 text-indigo-400" />
                <span>보험설계사 지원하기</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors" />
              </button>
            </div>

            <p className="text-[11px] text-slate-400 pt-1">
              * 금융소비자보호법을 준수하며, 가입 결과나 특정 수익을 임의로 보장하지 않습니다.
            </p>
          </div>

          {/* Right Column: Visual Image Showcase Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/80 shadow-2xl group">
              {/* Main Photo with Gradient Mask */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] w-full overflow-hidden">
                <img
                  src={siteImages.heroConsultation}
                  alt="HK금융파트너스 목동지점 맞춤 보장분석 상담 현장"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent" />
                
                {/* Floating Top Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-slate-950/80 border border-slate-700/80 text-[11px] font-bold text-blue-300 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    1:1 맞춤 금융 보장분석
                  </span>
                </div>

                {/* Floating Direct Contact Chip */}
                <div className="absolute top-4 right-4">
                  <a
                    href={`tel:${companyInfo.mobile || companyInfo.phone}`}
                    className="px-3 py-1 rounded-full bg-blue-600/90 hover:bg-blue-600 border border-blue-400/40 text-[11px] font-bold text-white backdrop-blur-md flex items-center gap-1.5 shadow-lg transition"
                  >
                    <Phone className="w-3 h-3 text-white" />
                    <span>직통 {companyInfo.mobile || companyInfo.phone}</span>
                  </a>
                </div>

                {/* Bottom Overlay Content inside image */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/85 border border-slate-700/70 backdrop-blur-md space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                        HK
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white leading-none">
                          {companyInfo.fullName}
                        </p>
                        <p className="text-[11px] text-slate-300 mt-0.5">
                          지점장 {companyInfo.leaderName}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30">
                      실시간 상담 예약 가능
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 italic line-clamp-2">
                    "{companyInfo.leaderGreeting}"
                  </p>
                </div>
              </div>

              {/* Mini Action Bars Below Photo */}
              <div className="p-3.5 bg-slate-900 grid grid-cols-2 gap-2 text-center border-t border-slate-800">
                <button
                  onClick={() => onNavigate('consulting')}
                  className="py-2 px-3 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-xs font-semibold text-blue-300 hover:text-white border border-slate-700/60 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>보장분석 프로세스 보기</span>
                </button>
                <button
                  onClick={() => onNavigate('branch')}
                  className="py-2 px-3 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white border border-slate-700/60 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Building className="w-3.5 h-3.5 text-indigo-400" />
                  <span>지점 및 오시는 길</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

