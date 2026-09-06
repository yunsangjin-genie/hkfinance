import React from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { CompanyInfo } from '../types';

interface LegalPagesProps {
  type: 'privacy' | 'terms';
  companyInfo: CompanyInfo;
}

export const LegalPages: React.FC<LegalPagesProps> = ({ type, companyInfo }) => {
  if (type === 'privacy') {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="space-y-2 border-b border-slate-200 pb-6">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">
              PRIVACY POLICY
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              개인정보처리방침
            </h1>
            <p className="text-xs text-slate-500">
              최종 수정일: {new Date().getFullYear()}년 {new Date().getMonth() + 1}월 1일 · {companyInfo.fullName}
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
                1. 개인정보의 수집 및 이용 목적
              </h2>
              <p>
                {companyInfo.fullName}(이하 "지점")은 다음의 목적을 위하여 최소한의 개인정보를 수집·이용합니다.
                처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600">
                <li>보험 상담 및 무료 보장분석 서비스 신청에 따른 본인 확인 및 상담 진행</li>
                <li>보험설계사 입사 지원에 따른 1:1 채용 면담 및 전형 안내</li>
                <li>고객 문의 사항 응대 및 상담 내역 관리</li>
              </ul>
            </div>

            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
                2. 수집하는 개인정보의 항목
              </h2>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li><strong>보험 상담 신청 시:</strong> 성명, 연락처(휴대전화번호), 연령대, 상담 희망 항목, 거주 지역(선택), 상담 희망 시간</li>
                <li><strong>설계사 지원 신청 시:</strong> 성명, 연락처(휴대전화번호), 보험영업 경력 여부, 지원 동기, 상담 희망 시간</li>
              </ul>
            </div>

            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
                3. 개인정보의 보유 및 이용 기간
              </h2>
              <p>
                지점은 법령에 따른 개인정보 보유·이용 기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용 기간 내에서 개인정보를 처리·보유합니다.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600">
                <li>보험 상담 신청 정보: 상담 종료 후 1년 또는 정보주체의 파기 요청 시까지</li>
                <li>설계사 입사 지원 정보: 채용 전형 종료 후 6개월 이내 안전 파기</li>
              </ul>
            </div>

            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
                4. 개인정보의 제3자 제공 및 위탁에 관한 사항
              </h2>
              <p>
                지점은 정보주체의 사전 동의 없이 개인정보를 제3자에게 제공하거나 외부에 위탁하지 않습니다. 단, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
              </p>
            </div>

            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
                5. 개인정보 보호책임자
              </h2>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
                <p>• 소속: {companyInfo.fullName}</p>
                <p>• 책임자: 지점장 {companyInfo.leaderName}</p>
                <p>• 연락처: {companyInfo.phone}</p>
                <p>• 이메일: {companyInfo.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
        <div className="space-y-2 border-b border-slate-200 pb-6">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">
            TERMS &amp; CONSUMER PROTECTION
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            이용약관 및 금융소비자보호 안내
          </h1>
          <p className="text-xs text-slate-500">
            최종 수정일: {new Date().getFullYear()}년 {new Date().getMonth() + 1}월 1일 · {companyInfo.fullName}
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
              제1조 (목적)
            </h2>
            <p>
              본 약관은 {companyInfo.fullName}(이하 "지점")이 제공하는 공식 웹사이트의 보험 상담 안내, 보장분석 신청 및 설계사 지원 서비스 등의 이용 조건과 절차에 관한 제반 사항을 규정함을 목적으로 합니다.
            </p>
          </div>

          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
              제2조 (금융상품 관련 안내 및 소비자 유의사항)
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>본 웹사이트에서 제공되는 모든 보험 정보, 예시 금액, 비교 내용은 금융소비자의 이해를 돕기 위한 참고자료이며, 법적 구속력을 갖는 청약이나 승낙이 아닙니다.</li>
              <li>실제 보험계약 체결 시에는 각 해당 보험회사의 약관, 사업방법서 및 상품설명서가 우선 적용됩니다.</li>
              <li>보험계약 체결 전 반드시 상품설명서 및 약관을 읽어보시기 바랍니다.</li>
              <li>보험계약자가 기존에 체결했던 보험계약을 해지하고 다른 보험계약을 체결하면 보험인수가 거절되거나 보험료가 인상되거나 보장내용이 달라질 수 있습니다.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
              제3조 (금융소비자보호법 준수)
            </h2>
            <p>
              지점은 금융소비자보호에 관한 법률 및 관련 법규를 철저히 준수하며, 부당권유행위 금지, 적합성 원칙, 설명의무 등을 충실히 이행합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
