import React from 'react';
import { Phone, ShieldCheck, Briefcase } from 'lucide-react';
import { CompanyInfo } from '../../types';

interface MobileStickyBarProps {
  onOpenConsult: () => void;
  onOpenRecruit: () => void;
  companyInfo: CompanyInfo;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  onOpenConsult,
  onOpenRecruit,
  companyInfo,
}) => {
  const isRealPhone = companyInfo.phone && !companyInfo.phone.includes('관리자 입력 필요');
  const cleanPhone = companyInfo.phone.replace(/[^0-9]/g, '');

  return (
    <aside aria-label="빠른 상담 및 지원" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 p-2.5 px-3 shadow-2xl">
      <div className="flex items-center gap-2">
        {/* Quick Phone Call if configured */}
        {isRealPhone && (
          <a
            href={`tel:${cleanPhone}`}
            className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-slate-100 text-slate-700 active:bg-slate-200 shrink-0 transition"
            aria-label="전화 상담 연결"
          >
            <Phone className="w-5 h-5 text-slate-800" />
            <span className="text-[10px] font-bold mt-0.5">전화</span>
          </a>
        )}

        {/* Customer Consulting CTA */}
        <button
          onClick={onOpenConsult}
          className="flex-1 h-12 px-3 bg-blue-600 active:bg-blue-700 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 transition cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>보험 상담 신청</span>
        </button>

        {/* Insurance Planner Recruiting CTA */}
        <button
          onClick={onOpenRecruit}
          className="flex-1 h-12 px-3 bg-slate-900 active:bg-black text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer"
        >
          <Briefcase className="w-4 h-4 shrink-0 text-indigo-400" />
          <span>설계사 지원하기</span>
        </button>
      </div>
    </aside>
  );
};
