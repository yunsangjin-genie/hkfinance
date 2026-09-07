import React from 'react';
import { ShieldCheck, HeartHandshake, Users, Award, CheckCircle2, ArrowRight, Compass, Shield } from 'lucide-react';
import { CompanyInfo } from '../../types';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { branchCoreValues } from '../../data/company';

interface BranchAboutPageProps {
  companyInfo: CompanyInfo;
  onNavigate: (path: string) => void;
  onOpenConsult: (category?: string) => void;
  onOpenRecruit: () => void;
}

export const BranchAboutPage: React.FC<BranchAboutPageProps> = ({
  companyInfo,
  onNavigate,
  onOpenConsult,
  onOpenRecruit,
}) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Breadcrumb
        items={[
          { name: '홈', path: '/' },
          { name: '목동지점', path: '/about' },
          { name: '지점 소개' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Page Header */}
      <header className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-950 text-blue-300 text-xs font-bold border border-blue-800">
            ABOUT MOKDONG BRANCH · 목동지점 소개
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            지점 소개
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl mx-auto leading-relaxed font-normal">
            고객에게는 신뢰를, 설계사에게는 성장의 기회를 제공하는 금융 컨설팅 전문 조직입니다. HK금융파트너스 경인사업본부 목동지점은 서울 목동을 기반으로 하는 보험 상담 지점으로서, 30여 개 제휴 보험사의 객관적 상품 분석과 가입 강요 없는 1:1 맞춤 보장설계를 지향합니다.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-2 text-xs text-blue-300">
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHO: HK금융파트너스 목동지점
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHERE: 서울 양천구 목동
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHAT: 객관적 비교분석 & 정착 인프라
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHO FOR: 현명한 금융소비자 & 예비 설계사
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* 3 Core Questions Section: Who / What / For Whom */}
        <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-900">
              목동지점은 어떤 곳인가요?
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              투명한 객관적 분석과 신뢰를 바탕으로 고객과 설계사 모두가 안심할 수 있는 조직을 만듭니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 space-y-2.5">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                WHO WE ARE
              </span>
              <h3 className="text-base font-bold text-slate-900">독립 GA 금융 파트너</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                특정 보험사 하나에 종속되지 않고, 다수 생명보험 및 손해보험사의 상품 약관을 비교 분석하는 전문 GA 지점입니다.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 space-y-2.5">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                WHAT WE DO
              </span>
              <h3 className="text-base font-bold text-slate-900">가입 강요 없는 보장분석</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                보험을 무리하게 권유하지 않으며, 현재 유지 중인 계약의 중복과 보장 공백을 꼼꼼하게 점검하여 최적의 선택을 돕습니다.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 space-y-2.5">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                WHO FOR
              </span>
              <h3 className="text-base font-bold text-slate-900">고객과 예비 설계사</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                제대로 된 보장을 원하는 일반 고객과, 영업을 체계적으로 배워 전문직으로 도약하고자 하는 신규 설계사 모두를 위한 곳입니다.
              </p>
            </div>
          </div>
        </section>

        {/* 3 Core Operating Philosophies */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              OUR VALUES
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">
              목동지점의 3대 운영 철학
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {branchCoreValues.map((val) => (
              <div
                key={val.number}
                className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3"
              >
                <span className="text-blue-600 font-mono font-bold text-sm">
                  {val.number}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{val.title}</h3>
                <p className="text-xs font-semibold text-slate-700">{val.subtitle}</p>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Branch Leader Callout & Navigation */}
        <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
              BRANCH LEADER
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              목동지점장 {companyInfo.leaderName}
            </h3>
            <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
              "보험을 잘 파는 조직보다, 고객에게 보험을 제대로 설명하고 설계사가 함께 성장할 수 있는 든든한 울타리를 만듭니다."
            </p>
          </div>

          <button
            onClick={() => onNavigate('/about/manager')}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>지점장 소개 보기</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </section>

        {/* Action CTAs */}
        <section className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('/consulting/consultation')}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>보험 상담 신청</span>
          </button>
          <button
            onClick={() => onNavigate('/recruit')}
            className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Users className="w-4 h-4 text-indigo-400" />
            <span>설계사 지원 문의</span>
          </button>
        </section>
      </div>
    </div>
  );
};
