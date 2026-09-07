import React from 'react';
import { ShieldCheck, Search, AlertTriangle, CheckCircle2, ArrowRight, FileSpreadsheet, Layers, Clock } from 'lucide-react';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { InteractiveCoverageCheck } from '../../components/common/InteractiveCoverageCheck';

interface CoverageAnalysisPageProps {
  onNavigate: (path: string) => void;
  onOpenConsult: (category?: string) => void;
}

export const CoverageAnalysisPage: React.FC<CoverageAnalysisPageProps> = ({
  onNavigate,
  onOpenConsult,
}) => {
  const auditPoints = [
    {
      title: '보장 중복 여부 확인',
      desc: '동일하거나 유사한 담보가 여러 보험에 중복 가입되어 불필요하게 보험료가 이중 지출되고 있는지 점검합니다.',
      icon: Layers,
    },
    {
      title: '부족한 핵심 보장 공백 진단',
      desc: '의료기술 발전에 따른 최신 표적항암 치료비나 포괄적 뇌혈관·심혈관 수술비 등 꼭 필요한 안전망이 빠져 있는지 살핍니다.',
      icon: AlertTriangle,
    },
    {
      title: '갱신 주기 및 장기 보험료 위험',
      desc: '갱신 시점마다 급증할 수 있는 갱신형 담보 비율을 분석하여, 경제활동 은퇴 후에도 유지 가능한지 시뮬레이션합니다.',
      icon: Clock,
    },
    {
      title: '생애주기와 생활환경 적합성',
      desc: '결혼, 출산, 주택 매매 등 가족 구성원의 변화와 현재 소득 수준에 비추어 납입 가능한 적정 보험료를 산정합니다.',
      icon: FileSpreadsheet,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Breadcrumb
        items={[
          { name: '홈', path: '/' },
          { name: '보험상담', path: '/consulting' },
          { name: '보장분석' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <header className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-950 text-blue-300 text-xs font-bold border border-blue-800">
            COVERAGE AUDIT · 내 보험 보장분석
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            내 보험 보장분석
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl mx-auto leading-relaxed font-normal">
            불필요한 보험료 누수를 막고 부족한 핵심 담보를 점검하는 맞춤 보장분석 안내입니다. HK금융파트너스 경인사업본부 목동지점은 서울 목동을 기반으로 하는 보험 상담 지점으로서, 기존 가입 증권을 대조하여 객관적인 리포트와 개선 방향을 제시합니다. 보험 상담이 필요한 고객과 보험설계사를 시작하려는 사람 모두에게 투명한 분석 기준을 제공합니다.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-2 text-xs text-blue-300">
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHO: HK금융파트너스 목동지점
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHERE: 서울 목동 보장분석
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHAT: 중복·공백 진단 & 증권 정밀 대조
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHO FOR: 보험 리모델링 고객 & 설계사
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* 4 Core Audit Checkpoints */}
        <section className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">
              보장분석 시 무엇을 점검하나요?
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              단순히 해지를 권하거나 새 보험을 파는 것이 아니라, 기존 계약의 가치를 철저히 검증합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {auditPoints.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Embedded Interactive Check Tool */}
        <section className="space-y-4">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              SELF DIAGNOSIS
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">
              자가 보장 진단 테스트
            </h2>
            <p className="text-xs text-slate-600">
              간단한 4가지 질문을 통해 현재 내 보험의 안전도를 즉시 점검해 보세요.
            </p>
          </div>

          <InteractiveCoverageCheck
            onOpenConsult={() => onNavigate('/consulting/consultation')}
          />
        </section>

        {/* Callout to Request Consultation */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 text-center space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold">
            증권 분석을 통한 정밀 1:1 진단을 원하시나요?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            보험 증권 사진이나 가입 내역을 남겨주시면, 목동지점 수석 분석팀이 중복 여부와 보장 공백을 한눈에 보기 쉬운 분석표로 제작해 드립니다.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('/consulting/consultation')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 mx-auto cursor-pointer shadow-lg shadow-blue-600/30"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>1:1 맞춤 보장분석 신청하기</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
