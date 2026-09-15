import React from 'react';
import { ShieldCheck, Search, CheckCircle2, ArrowRight, Clock, HelpCircle, FileText, UserCheck } from 'lucide-react';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { consultationSteps } from '../../data/company';

interface ConsultingHubPageProps {
  onNavigate: (path: string) => void;
  onOpenConsult: (category?: string) => void;
}

export const ConsultingHubPage: React.FC<ConsultingHubPageProps> = ({
  onNavigate,
  onOpenConsult,
}) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Breadcrumb
        items={[
          { name: '홈', path: '/' },
          { name: '보험상담' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Header Banner */}
      <header className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-950 text-blue-300 text-xs font-bold border border-blue-800">
            CONSULTING PROCESS · 목동 보험상담
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            목동 보험상담
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl mx-auto leading-relaxed font-normal">
            가입 권유 없이 현재 가입된 보험의 중복과 공백을 5단계로 투명하게 점검해 드립니다. HK금융파트너스 경인사업본부 목동지점은 보장분석부터 최적안 비교 및 지속적인 사후 관리까지 책임 있는 1:1 맞춤 상담을 제공합니다. 보험 상담이 필요한 고객과 보험설계사를 시작하려는 사람을 위한 신뢰의 기준을 세워갑니다.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-2 text-xs text-blue-300">
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHO: HK금융파트너스 목동지점
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHERE: 강남구 역삼동 708-33 파라다이스 밴처타워 6층
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHAT: 5단계 투명 보장분석
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHO FOR: 보험 점검 고객 & 예비 설계사
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Core Principles Callout */}
        <section className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <h2 className="text-lg font-bold text-slate-900">
              목동지점의 가입 강요 없는 객관적인 상담 원칙
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
              <span className="font-bold text-slate-900 block text-sm">01. 기존 보험 우선 존중</span>
              <p className="text-slate-600 leading-relaxed">
                과거 가입한 좋은 조건의 보험(확정 고금리형, 1~2세대 실손 등)은 무조건 해지하지 않고 최대한 유지하는 방향을 우선 검토합니다.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
              <span className="font-bold text-slate-900 block text-sm">02. 투명한 약관 비교</span>
              <p className="text-slate-600 leading-relaxed">
                특정 한 보험사 상품만을 밀지 않으며, 다수 제휴 보험사의 약관과 담보 보장 범위를 고객 눈높이에서 공정하게 비교합니다.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
              <span className="font-bold text-slate-900 block text-sm">03. 가입 권유 강요 배제</span>
              <p className="text-slate-600 leading-relaxed">
                보장 점검 결과 부족함이 없거나 현재 유지가 최선인 경우 추가 가입을 권하지 않으며, 고객이 스스로 판단할 수 있는 시간을 드립니다.
              </p>
            </div>
          </div>
        </section>

        {/* 5-Step Process */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              5-STEP ROADMAP
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">
              체계적인 5단계 상담 프로세스
            </h2>
            <p className="text-xs text-slate-600">
              상담 접수부터 최종 결정까지 군더더기 없이 투명하게 진행됩니다.
            </p>
          </div>

          <div className="space-y-4">
            {consultationSteps.map((step) => (
              <div
                key={step.step}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 font-mono font-extrabold text-sm flex items-center justify-center shrink-0">
                    {step.step}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                      {step.desc}
                    </p>
                  </div>
                </div>

                <div className="pl-16 md:pl-0">
                  <span className="inline-block text-[11px] font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {step.tip}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Navigation Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            onClick={() => onNavigate('/consulting/analysis')}
            className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
                내 보험 보장분석 자세히 알아보기
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                현재 가입된 보험의 중복 담보와 갱신형 리스크를 직접 진단해 보고, 자가 점검 체크리스트를 확인해 보세요.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
              <span>보장분석 안내 보기</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('/consulting/consultation')}
            className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition">
                1:1 맞춤 상담 신청하기
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                궁금한 보험 질문이나 증권 분석 요청을 간단히 남겨주시면, 담당 전문 상담팀이 친절하게 연락드립니다.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
              <span>상담 신청서 작성</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
