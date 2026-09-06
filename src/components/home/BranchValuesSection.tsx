import React from 'react';
import { ShieldCheck, FileText, Users, Quote, User, Sparkles, ArrowRight } from 'lucide-react';
import { CompanyInfo, NavigationPage } from '../../types';
import { branchCoreValues } from '../../data/company';

interface BranchValuesSectionProps {
  companyInfo: CompanyInfo;
  onNavigate: (page: NavigationPage) => void;
  onOpenConsult: () => void;
}

export const BranchValuesSection: React.FC<BranchValuesSectionProps> = ({
  companyInfo,
  onNavigate,
  onOpenConsult,
}) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-blue-600" />,
    FileText: <FileText className="w-6 h-6 text-indigo-600" />,
    Users: <Users className="w-6 h-6 text-emerald-600" />,
  };

  return (
    <section className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            HK FINANCIAL PARTNERS MOKDONG
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            목동지점은 이렇게 일합니다.
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {companyInfo.fullName}이 지켜나가는 3가지 핵심 원칙을 소개합니다.
          </p>
        </div>

        {/* 3 Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {branchCoreValues.map((val) => (
            <div
              key={val.number}
              className="relative p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-slate-300 font-mono">
                    {val.number}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-white shadow-xs flex items-center justify-center border border-slate-100">
                    {iconMap[val.icon] || <ShieldCheck className="w-6 h-6 text-blue-600" />}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {val.title}
                  </h3>
                  <p className="text-sm font-semibold text-blue-600 mt-1">
                    "{val.subtitle}"
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {val.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Branch Leader Spotlight Box */}
        <div className="mt-14 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 sm:p-10 shadow-xl overflow-hidden relative">
          <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full text-xs text-blue-300 border border-slate-700">
                <Sparkles className="w-3.5 h-3.5" /> 목동지점 총괄
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                "보험을 잘 파는 조직보다, 고객에게 제대로 설명하고 함께 성장하는 조직을 만듭니다."
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                {companyInfo.leaderPhilosophy}
              </p>
              <div className="pt-2 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {companyInfo.leaderName.charAt(0) || '윤'}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">지점장 {companyInfo.leaderName}</p>
                  <p className="text-xs text-slate-400">{companyInfo.fullName}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={() => onNavigate('branch')}
                className="w-full py-3.5 px-5 bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-xl text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>지점장 {companyInfo.leaderName} 소개 자세히 보기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenConsult}
                className="w-full py-3.5 px-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{companyInfo.leaderName} 지점장에게 상담 신청</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
