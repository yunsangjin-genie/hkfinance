import React from 'react';
import { ShieldCheck, User, Sparkles, CheckCircle2, Phone, Mail, Clock, MapPin, Briefcase, ArrowRight } from 'lucide-react';
import { CompanyInfo } from '../../types';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { DigitalBusinessCard } from '../../components/common/DigitalBusinessCard';

interface ManagerPageProps {
  companyInfo: CompanyInfo;
  onNavigate: (path: string) => void;
  onOpenConsult: (category?: string) => void;
  onOpenRecruit: () => void;
}

export const ManagerPage: React.FC<ManagerPageProps> = ({
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
          { name: '지점장 소개' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Page Header */}
      <header className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-950 text-blue-300 text-xs font-bold border border-blue-800">
            BRANCH MANAGER · 목동 지점장 소개
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            지점장 {companyInfo.leaderName} 소개
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl mx-auto leading-relaxed font-normal">
            "보험을 권하기보다, 필요한 보장을 함께 설계합니다." HK금융파트너스 경인사업본부 목동지점 윤상진 지점장의 상담 철학과 멘토링 방향, 1:1 직통 소통 채널 및 디지털 모바일 명함을 안내합니다.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-2 text-xs text-blue-300">
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHO: 지점장 {companyInfo.leaderName} (HK금융파트너스)
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHERE: 강남구 역삼동 708-33 파라다이스 밴처타워 6층
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHAT: 정직한 상담 철학 & 1:1 직통 멘토링
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHO FOR: 직접 상담 고객 & 예비 설계사
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Digital Business Card & Contact */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-600 uppercase">
                OFFICIAL CONTACT
              </span>
              <h2 className="text-lg font-bold text-slate-900">지점장 모바일 명함</h2>
            </div>

            {/* Embedded Interactive Business Card */}
            <DigitalBusinessCard companyInfo={companyInfo} />

            <div className="bg-white p-5 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2.5">
              <h3 className="font-bold text-slate-900 text-sm">지점장 직통 연락처</h3>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                <span>휴대폰: {companyInfo.mobile}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <span>이메일: {companyInfo.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{companyInfo.consultHours}</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{companyInfo.address} {companyInfo.detailAddress}</span>
              </p>
            </div>
          </div>

          {/* Right Column: Roles, Philosophies, and Approach */}
          <div className="lg:col-span-7 space-y-8">
            {/* Greeting & Philosophy */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-md">
                <Sparkles className="w-3.5 h-3.5" /> 지점장의 인사말
              </div>
              <h3 className="text-xl font-bold text-slate-900 leading-snug">
                "고객의 삶을 보호하고, 설계사의 자립을 돕는 든든한 파트너가 되겠습니다."
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {companyInfo.leaderGreeting}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {companyInfo.leaderPhilosophy}
              </p>
            </div>

            {/* Current Roles & Commitments */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">
                지점장의 두 가지 핵심 역할
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span>고객을 위한 1:1 보장분석 &amp; 객관적 감수</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    모든 상담 건에 대해 특정 상품 가입을 유도하지 않으며, 현재 가입된 약관을 기준으로 중복과 공백을 투명하게 비교 안내합니다.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Briefcase className="w-4 h-4 text-indigo-600" />
                    <span>신입 설계사 1:1 밀착 멘토링 &amp; 현장 동행</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    자격시험 준비부터 전산 설계, 첫 고객 대면 미팅까지 선배 설계사와 지점장이 직접 현장에 동행하여 든든하게 안착하도록 지원합니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onNavigate('/consulting/consultation')}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>지점장 1:1 보험 상담 신청</span>
              </button>
              <button
                onClick={() => onNavigate('/recruit')}
                className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Briefcase className="w-4 h-4 text-indigo-400" />
                <span>설계사 커리어 지원 문의</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
