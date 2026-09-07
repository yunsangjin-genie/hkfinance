import React from 'react';
import {
  ShieldCheck,
  Search,
  Briefcase,
  BookOpen,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  HeartHandshake,
  Activity,
  ShieldAlert,
  Stethoscope,
  Coins,
  Building2,
  Phone,
} from 'lucide-react';
import { CompanyInfo } from '../types';
import { blogPosts } from '../data/blog';
import { siteImages } from '../assets/images';

interface HomePageProps {
  companyInfo: CompanyInfo;
  onNavigate: (path: string) => void;
  onOpenConsult: (category?: string) => void;
  onOpenRecruit: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  companyInfo,
  onNavigate,
  onOpenConsult,
  onOpenRecruit,
}) => {
  // Recent 3 insurance info articles
  const recentArticles = blogPosts.slice(0, 3);

  const quickServices = [
    {
      title: '내 보험 점검',
      desc: '현재 가입한 보험의 보장 내용을 확인하고 필요한 부분을 살펴봅니다.',
      path: '/consulting/analysis',
      icon: Search,
      color: 'blue',
    },
    {
      title: '보험 상담',
      desc: '생명보험, 건강보험, 실손보험, 연금 등 상황에 맞는 보험 상담을 제공합니다.',
      path: '/consulting',
      icon: ShieldCheck,
      color: 'emerald',
    },
    {
      title: '설계사 지원',
      desc: '보험설계사를 처음 시작하는 분들이 단계적으로 준비할 수 있도록 지원합니다.',
      path: '/recruit',
      icon: Briefcase,
      color: 'indigo',
    },
    {
      title: '보험정보',
      desc: '어렵게 느껴지는 보험 정보를 쉽고 이해하기 좋게 제공합니다.',
      path: '/insurance-info',
      icon: BookOpen,
      color: 'amber',
    },
  ];

  const consultingServices = [
    {
      title: '보장분석',
      desc: '중복 담보와 보장 공백을 객관적으로 점검합니다.',
      path: '/consulting/analysis',
    },
    {
      title: '실손보험 상담',
      desc: '기존 세대 실손과 4세대 실손의 차이를 비교합니다.',
      path: '/insurance/silson',
    },
    {
      title: '건강보험 상담',
      desc: '진단비, 수술비, 입원비를 가족력에 맞춰 설계합니다.',
      path: '/insurance/health',
    },
    {
      title: '암보험 상담',
      desc: '치료비 부담이 큰 3대 중대질환 보장을 점검합니다.',
      path: '/insurance/cancer',
    },
    {
      title: '노후·연금 상담',
      desc: '은퇴 이후 안정적인 현금흐름을 함께 고민합니다.',
      path: '/insurance/pension',
    },
    {
      title: '화재·재산보험 상담',
      desc: '주택 및 사업장의 화재와 배상책임을 대비합니다.',
      path: '/insurance/fire',
    },
  ];

  const insuranceTypes = [
    { title: '생명보험', path: '/insurance/life', icon: HeartHandshake, badge: '사망·유고 대비' },
    { title: '건강보험', path: '/insurance/health', icon: Activity, badge: '수술·입원비' },
    { title: '암보험', path: '/insurance/cancer', icon: ShieldAlert, badge: '3대 질병 집중' },
    { title: '실손보험', path: '/insurance/silson', icon: Stethoscope, badge: '병원비 실손보상' },
    { title: '종신보험', path: '/insurance/whole-life', icon: ShieldCheck, badge: '평생 자산보호' },
    { title: '연금보험', path: '/insurance/pension', icon: Coins, badge: '세액공제 & 노후' },
    { title: '화재·재산보험', path: '/insurance/fire', icon: Building2, badge: '주택 & 사업장' },
  ];

  const recruitBenefits = [
    {
      num: '01',
      title: '시험 비용 지원',
      desc: '손해보험·생명보험 자격시험 응시 및 학습 교재 전액 지원',
    },
    {
      num: '02',
      title: '교육 지원',
      desc: '초보자도 쉽게 배우는 금융·보험 기초 및 상품 비교 실무 교육',
    },
    {
      num: '03',
      title: '설계 지원',
      desc: '고객 상황별 맞춤 보장분석표와 제안서 1:1 크로스체크 피드백',
    },
    {
      num: '04',
      title: '베테랑 설계사 상담 동행',
      desc: '첫 고객 미팅 시 선배 설계사 현장 동행으로 든든한 실전 지원',
    },
  ];

  return (
    <div className="space-y-0">
      {/* 1. HERO SECTION */}
      <section className="relative bg-slate-900 text-white py-18 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle Background Overlay */}
        <div className="absolute inset-0 opacity-15">
          <img
            src={siteImages.heroConsultation}
            alt="HK금융파트너스 목동지점 1:1 상담"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-700/60 text-xs font-semibold text-blue-300">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span>{companyInfo.fullName}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            보험을 권하기보다,<br className="hidden sm:inline" />
            <span className="text-blue-400"> 필요한 보장을 함께 설계합니다.</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            고객의 상황을 먼저 살펴보고 필요한 보장을 함께 고민합니다.
            불필요한 가입 권유 없이 객관적인 보장분석과 맞춤형 금융 상담을 제공합니다.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('/consulting/consultation')}
              className="w-full sm:w-auto px-7 py-3.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>보험 상담하기</span>
            </button>
            <button
              onClick={() => onNavigate('/recruit')}
              className="w-full sm:w-auto px-7 py-3.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-slate-200 hover:text-white font-semibold rounded-xl text-sm border border-slate-700 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Briefcase className="w-4 h-4 text-indigo-400" />
              <span>설계사로 시작하기</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. QUICK SERVICE SECTION (4 CARDS) */}
      <section className="py-14 sm:py-18 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              QUICK SERVICE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              목동지점 핵심 서비스
            </h2>
            <p className="text-sm text-slate-600">
              필요하신 정보와 서비스로 빠르게 이동하실 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {quickServices.map((svc) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.title}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{svc.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{svc.desc}</p>
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-100">
                    <button
                      onClick={() => onNavigate(svc.path)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <span>자세히 보기</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. BRAND MESSAGE SECTION */}
      <section className="py-14 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full">
            BRAND PHILOSOPHY
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            고객에게는 신뢰를, 설계사에게는 성장의 기회를.
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            HK금융파트너스 목동지점은 특정 상품의 일방적인 판매를 지양합니다.
            고객 한 분 한 분의 소중한 일상을 지키는 든든한 보장을 설계하고,
            설계사가 현장에서 고립되지 않고 전문 금융인으로 성장하도록 돕습니다.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('/about')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition cursor-pointer"
            >
              <span>목동지점 알아보기</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. CONSULTING SECTION (6 CARDS) */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              INSURANCE AUDIT &amp; CONSULTING
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              내 보험, 제대로 준비되어 있을까요?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              보험은 많이 가입하는 것보다 현재 나에게 필요한 보장을 확인하는 것이 먼저입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {consultingServices.map((svc) => (
              <div
                key={svc.title}
                onClick={() => onNavigate(svc.path)}
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition flex items-center justify-between">
                    <span>{svc.title}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{svc.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('/consulting')}
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800 transition cursor-pointer"
            >
              <span>5단계 보험상담 프로세스 전체보기</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. INSURANCE SECTION (7 CATEGORY CARDS) */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              COVERAGE GUIDE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              필요한 보험을 알아보세요.
            </h2>
            <p className="text-sm text-slate-600">
              상황별 필요한 핵심 보장과 가입 전 체크해야 할 객관적인 기준을 안내합니다.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {insuranceTypes.map((ins) => {
              const Icon = ins.icon;
              return (
                <div
                  key={ins.title}
                  onClick={() => onNavigate(ins.path)}
                  className="bg-slate-50 hover:bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-2.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-700 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="inline-block text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                      {ins.badge}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition">
                      {ins.title}
                    </h3>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500 group-hover:text-blue-600 font-medium">
                    <span>안내 보기</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('/insurance')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              <span>전체 보험상품 카테고리 허브 가기</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. RECRUIT SECTION (4 BENEFIT CARDS) */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-indigo-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-indigo-400 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-800">
              RECRUITMENT SUPPORT
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              보험설계사, 혼자 시작하지 마세요.
            </h2>
            <p className="text-sm text-slate-300">
              보험설계사를 처음 시작하는 분들도 단계적으로 준비할 수 있도록 함께합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recruitBenefits.map((item) => (
              <div
                key={item.num}
                className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 space-y-3"
              >
                <span className="text-indigo-400 font-mono font-bold text-sm block">
                  {item.num}
                </span>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => onNavigate('/recruit')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/30 transition cursor-pointer"
            >
              <Briefcase className="w-4 h-4" />
              <span>설계사 지원 알아보기</span>
            </button>
          </div>
        </div>
      </section>

      {/* 7. RECENT INSURANCE INFORMATION PREVIEW (3 CARDS) */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                INSURANCE KNOWLEDGE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                알기 쉬운 보험정보
              </h2>
              <p className="text-sm text-slate-600">
                복잡한 보험 용어와 알쏭달쏭한 제도를 알기 쉽게 정리해 드립니다.
              </p>
            </div>

            <button
              onClick={() => onNavigate('/insurance-info')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition cursor-pointer shrink-0"
            >
              <span>보험정보 더보기</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => onNavigate(`/insurance-info/${article.id}`)}
                className="bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                      {article.category}
                    </span>
                    <span className="text-slate-400">{article.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>자세히 읽기</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA SECTION (DUAL FUNNEL) */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            {/* Customer Consultation CTA */}
            <div className="space-y-4 pr-0 md:pr-6 pb-6 md:pb-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-950 text-blue-300 text-xs font-bold rounded-full border border-blue-800">
                <ShieldCheck className="w-3.5 h-3.5" /> 고객 보장분석
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                보험이 궁금하다면,<br />
                먼저 현재 상황부터 이야기해 주세요.
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                가입 권유 없이 기존 계약의 중복과 보장 공백을 투명하게 진단해 드립니다.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('/consulting/consultation')}
                  className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>보험 상담 신청</span>
                </button>
              </div>
            </div>

            {/* Recruit CTA */}
            <div className="space-y-4 pl-0 md:pl-8 pt-6 md:pt-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-950 text-indigo-300 text-xs font-bold rounded-full border border-indigo-800">
                <Briefcase className="w-3.5 h-3.5" /> 신입 &amp; 경력 모집
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                설계사로 새로운 시작을<br />
                준비한다면
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                자격시험 비용 지원부터 체계적인 실무 교육, 선배 동행까지 함께합니다.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('/recruit')}
                  className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>설계사 지원 문의</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
