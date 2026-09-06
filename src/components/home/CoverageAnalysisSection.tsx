import React from 'react';
import { Search, FileSearch, Scale, AlertCircle, CheckCircle2, ShieldCheck, Calculator, ArrowRight } from 'lucide-react';
import { InteractiveCoverageCheck } from '../common/InteractiveCoverageCheck';
import { siteImages } from '../../assets/images';

interface CoverageAnalysisSectionProps {
  onOpenConsult: (category?: string) => void;
}

export const CoverageAnalysisSection: React.FC<CoverageAnalysisSectionProps> = ({
  onOpenConsult,
}) => {
  const steps = [
    {
      step: '01',
      title: '현재 보험 확인',
      desc: '가입된 모든 보험의 증권 및 계약 현황을 안전하게 확인합니다.',
      icon: <Search className="w-5 h-5 text-blue-600" />,
    },
    {
      step: '02',
      title: '보장내용 분석',
      desc: '질병·상해·실손·사망·암 등 담보별 보장 범위와 기간을 정밀 분석합니다.',
      icon: <FileSearch className="w-5 h-5 text-indigo-600" />,
    },
    {
      step: '03',
      title: '보험료와 보장 수준 검토',
      desc: '현재 소득 대비 보험료 수준이 적절한지, 갱신형 인상 위험을 검토합니다.',
      icon: <Scale className="w-5 h-5 text-amber-600" />,
    },
    {
      step: '04',
      title: '부족한 보장 확인',
      desc: '가족력이나 연령대별로 발생 가능성이 높은 보장 공백을 짚어냅니다.',
      icon: <AlertCircle className="w-5 h-5 text-rose-600" />,
    },
    {
      step: '05',
      title: '맞춤형 보완 상담',
      desc: '기존 좋은 계약은 유지하고, 필요한 경우에만 최소한의 보완책을 제안합니다.',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" /> 1:1 객관적 보장분석 프로세스
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            내 보험, 제대로 준비되어 있을까요?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            보험은 많이 가입하는 것보다 <strong>내 상황과 생애주기에 맞게</strong> 준비되어 있는지가 중요합니다.
          </p>
        </div>

        {/* 5 Steps Visual Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {steps.map((item) => (
            <div
              key={item.step}
              className="relative p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono">
                    STEP {item.step}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Banner combining photo and summary */}
        <div className="mb-14 rounded-2xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold rounded-full border border-blue-400/30">
                <Calculator className="w-3.5 h-3.5" /> 불필요한 지출 절감 &amp; 핵심 보장 강화
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight">
                "매달 빠져나가는 보험료, 과연 다 필요한 걸까요?"
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                오래전 가입한 특약, 중복 청구되지 않는 담보, 갱신 시 보험료가 급증하는 상품 등 
                증권 하나하나 꼼꼼히 비교하여 <strong>가성비 높은 포트폴리오</strong>를 완성해 드립니다.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenConsult('증권 분석 및 보험료 다이어트')}
                  className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs sm:text-sm transition shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <FileSearch className="w-4 h-4" />
                  <span>내 증권 무료 정밀 분석 신청</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="lg:col-span-5 relative h-56 lg:h-full min-h-[220px]">
              <img
                src={siteImages.calculatorAnalysis}
                alt="보험료 계산 및 보장 분석 서류 점검"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Interactive Self-Diagnostic Tool Embedded */}
        <div className="mb-12">
          <InteractiveCoverageCheck onOpenConsult={onOpenConsult} />
        </div>

        {/* Compliance Guard Notice */}
        <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-500 text-center max-w-2xl mx-auto leading-relaxed">
          🔒 <strong>신뢰성 약속</strong>: HK금융파트너스는 '무조건 보험료 절감'이나 '100% 보장' 등 과장된 결과를 약속하지 않으며, 고객의 객관적 증권 데이터를 토대로 솔직하고 합리적인 상담만을 진행합니다.
        </div>
      </div>
    </section>
  );
};

