import React from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';

interface TermsPageProps {
  onNavigate: (path: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Breadcrumb
        items={[
          { name: '홈', path: '/' },
          { name: '이용약관' },
        ]}
        onNavigate={onNavigate}
      />

      <header className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-950 text-blue-300 text-xs font-bold border border-blue-800">
            TERMS OF SERVICE · 이용약관
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            이용약관
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl mx-auto leading-relaxed font-normal">
            HK금융파트너스 경인사업본부 목동지점 공식 웹사이트 이용 조건 및 서비스 제공에 관한 제반 사항을 안내합니다.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-2 text-xs text-blue-300">
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHO: HK금융파트너스 목동지점
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHERE: 강남구 역삼동 708-33 파라다이스 밴처타워 6층
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHAT: 웹사이트 이용조건 및 면책 고지
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHO FOR: 웹사이트 이용자 및 상담 신청인
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">제1조 (목적)</h2>
            <p>
              본 약관은 HK금융파트너스 경인사업본부 목동지점(이하 "지점")이 제공하는 웹사이트 기반의 보험 정보 제공 및 상담 신청 서비스(이하 "서비스")의 이용 조건 및 절차에 관한 기본 사항을 규정함을 목적으로 합니다.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">제2조 (정보의 제공 및 한계)</h2>
            <p>
              1. 본 웹사이트에 게재된 보험 상품 관련 정보와 칼럼은 금융소비자의 일반적인 이해를 돕기 위한 예시 및 안내 자료입니다.
            </p>
            <p>
              2. 실제 보험 가입 체결 시 적용되는 보험료, 인수 기준, 세부 보장 범위는 개별 보험사의 약관 및 피보험자의 건강 상태, 직업 등에 따라 달라질 수 있으며, 최종 계약 체결 전 반드시 해당 보험사의 상품설명서 및 약관을 확인하셔야 합니다.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">제3조 (상담 신청 서비스)</h2>
            <p>
              이용자는 웹사이트를 통해 무료 보장분석 및 1:1 상담을 신청할 수 있으며, 지점은 접수된 내용을 검토하여 성실하게 답변 및 안내를 제공합니다.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">제4조 (지적재산권)</h2>
            <p>
              본 웹사이트에 게시된 콘텐츠, 상표, 텍스트, 그래픽에 대한 저작권 및 지적재산권은 지점에 귀속되며, 사전 승인 없이 무단 복제, 배포, 상업적 이용을 금합니다.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
            시행일자: 2026년 8월 1일
          </div>
        </div>
      </div>
    </div>
  );
};
