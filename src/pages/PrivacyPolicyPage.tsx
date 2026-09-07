import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';

interface PrivacyPolicyPageProps {
  onNavigate: (path: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Breadcrumb
        items={[
          { name: '홈', path: '/' },
          { name: '개인정보처리방침' },
        ]}
        onNavigate={onNavigate}
      />

      <header className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-950 text-blue-300 text-xs font-bold border border-blue-800">
            PRIVACY POLICY · 개인정보처리방침
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            개인정보처리방침
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl mx-auto leading-relaxed font-normal">
            HK금융파트너스 경인사업본부 목동지점은 정보주체의 자유와 권리 보호를 위해 개인정보보호법 등 관계 법령을 철저히 준수하며 고객님의 정보를 안전하게 관리합니다.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-2 text-xs text-blue-300">
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHO: HK금융파트너스 목동지점
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHERE: 서울 목동 지점
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHAT: 개인정보 보호 및 관리 기준
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHO FOR: 이용 고객 및 상담 신청인
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">제1조 (수집하는 개인정보 항목 및 수집 방법)</h2>
            <p>
              지점은 상담 신청, 서비스 제공, 민원 처리 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>수집 항목: 성명, 휴대전화번호, 상담 희망 분야, 희망 시간대, 문의 사항</li>
              <li>수집 방법: 홈페이지 상담 신청 폼, 유선 상담 요청, 서면 접수</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">제2조 (개인정보의 처리 목적)</h2>
            <p>
              수집된 개인정보는 다음의 목적을 위해 활용됩니다.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>보험 상품 비교 및 1:1 보장분석 상담 서비스 제공</li>
              <li>보험설계사 위촉 및 채용 지원 상담 진행</li>
              <li>상담 신청 내역 확인 및 본인 식별, 원활한 의사소통 경로 확보</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">제3조 (개인정보의 보유 및 이용 기간)</h2>
            <p>
              원칙적으로 개인정보의 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계 법령의 규정에 의하여 보존할 필요가 있는 경우 관련 법령이 정한 기간 동안 보관합니다.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>상담 신청 기록: 상담 종결일로부터 1년 또는 파기 요청 시까지</li>
              <li>전자상거래 등에서의 소비자보호에 관한 법률 등 관계 법령에 따른 보존: 법정 보유 기간 준수</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">제4조 (개인정보의 파기 절차 및 방법)</h2>
            <p>
              전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제하며, 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">제5조 (정보주체의 권리와 행사 방법)</h2>
            <p>
              정보주체는 언제든지 지점에 대해 개인정보 열람, 정정, 삭제, 처리정지 요구 등의 권리를 행사할 수 있으며, 지점 담당자를 통해 신속하게 조치받으실 수 있습니다.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
            시행일자: 2026년 8월 1일 | 개인정보보호 책임자: 윤상진 지점장 (010-2627-8554)
          </div>
        </div>
      </div>
    </div>
  );
};
