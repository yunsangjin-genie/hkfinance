import React, { useState } from 'react';
import {
  ShieldCheck,
  Send,
  CheckCircle2,
  Phone,
  Clock,
  Lock,
  ArrowRight,
  RotateCcw,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { CompanyInfo } from '../../types';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { getCanonicalUrl } from '../../config/site';

interface ConsultationFormPageProps {
  companyInfo: CompanyInfo;
  onNavigate: (path: string) => void;
  defaultCategory?: string;
}

export const ConsultationFormPage: React.FC<ConsultationFormPageProps> = ({
  companyInfo,
  onNavigate,
  defaultCategory = '보험 전체 점검',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: defaultCategory,
    preferredTime: '오후 2시',
    message: '',
    privacyAgreed: true,
    hp_website: '', // Honeypot spam defense
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const categories = [
    '보험 전체 점검',
    '보장분석',
    '실손보험',
    '건강보험',
    '암보험',
    '종신보험',
    '연금·노후',
    '화재·재산보험',
    '기타',
  ];

  const timeOptions = [
    '오전 (09:00 ~ 12:00)',
    '오후 2시',
    '오후 (13:00 ~ 18:00)',
    '야간 (18:00 ~ 21:00, 사전예약)',
    '주말 상담 희망 (사전협의)',
    '상관없음 (빠른 상담 희망)',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedName = formData.name.trim();
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');

    if (!trimmedName || trimmedName.length < 2) {
      setErrorMessage('성함을 2자 이상 입력해 주세요.');
      return;
    }

    if (cleanPhone.length < 9 || cleanPhone.length > 12) {
      setErrorMessage('연락처를 올바른 전화번호 형식으로 입력해 주세요 (예: 010-1234-5678).');
      return;
    }

    if (!formData.privacyAgreed) {
      setErrorMessage('개인정보 수집 및 이용에 동의하셔야 상담 접수가 가능합니다.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'insurance-consultation',
          name: trimmedName,
          phone: formData.phone.trim(),
          category: formData.category,
          preferredTime: formData.preferredTime,
          message: formData.message.trim(),
          privacyAgreed: formData.privacyAgreed,
          privacyConsent: formData.privacyAgreed,
          hp_website: formData.hp_website,
          sourceUrl: typeof window !== 'undefined' ? window.location.href : getCanonicalUrl('/consulting/consultation'),
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setErrorMessage(
          data?.message || '상담 신청 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.'
        );
      }
    } catch (err) {
      console.error('[Consultation Submit Error]', err);
      setErrorMessage('상담 신청 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrorMessage(null);
    setFormData({
      name: '',
      phone: '',
      category: '보험 전체 점검',
      preferredTime: '오후 2시',
      message: '',
      privacyAgreed: true,
      hp_website: '',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Breadcrumb
        items={[
          { name: '홈', path: '/' },
          { name: '보험상담', path: '/consulting' },
          { name: '상담 신청' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <header className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-950 text-blue-300 text-xs font-bold border border-blue-800">
            APPLY FOR CONSULTATION · 목동 보험 상담 신청
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            보험 상담 신청
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl mx-auto leading-relaxed font-normal">
            궁금한 보험 내용을 접수해 주시면 전문 상담팀이 상황에 맞는 맞춤 상담을 안전하게 진행합니다. HK금융파트너스 경인사업본부 목동지점은 금융소비자보호법을 준수하며 가입 강요 없이 고객의 권익을 최우선으로 보호합니다.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-2 text-xs text-blue-300">
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHO: HK금융파트너스 목동지점
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHERE: 강남구 역삼동 708-33 파라다이스 밴처타워 6층
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHAT: 1:1 맞춤 비교상담 접수
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHO FOR: 보험 점검 희망 고객
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {submitted ? (
          /* Submission Complete Card */
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-lg text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                접수 완료
              </span>
              <h2 className="text-2xl font-bold text-slate-900">
                상담 신청이 접수되었습니다.
              </h2>
              <p className="text-sm sm:text-base text-slate-700 max-w-md mx-auto leading-relaxed font-medium">
                확인 후 상담을 위해 연락드리겠습니다.
              </p>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                신청하신 내용은 {companyInfo.fullName} 윤상진 지점장 및 전담팀에 안전하게 전달되었습니다.
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl text-left text-xs text-slate-600 space-y-2 border border-slate-100 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-400">신청자명</span>
                <span className="font-semibold text-slate-800">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">연락처</span>
                <span className="font-semibold text-slate-800">{formData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">희망 분야</span>
                <span className="font-semibold text-slate-800">{formData.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">희망 시간</span>
                <span className="font-semibold text-slate-800">{formData.preferredTime}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => onNavigate('/')}
                className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition cursor-pointer"
              >
                홈으로 돌아가기
              </button>
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>추가 상담 신청</span>
              </button>
            </div>
          </div>
        ) : (
          /* Consultation Form */
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900">상담 신청서 작성</h2>
              <p className="text-xs text-slate-500 mt-1">
                작성하신 정보는 오직 1:1 맞춤 상담 배정 및 본인 연락 목적으로만 안전하게 사용됩니다.
              </p>
            </div>

            {/* Error Message Banner */}
            {errorMessage && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-rose-700 text-xs sm:text-sm">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot hidden input for spam defense */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="hp_website">웹사이트</label>
                <input
                  type="text"
                  id="hp_website"
                  name="hp_website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.hp_website}
                  onChange={(e) => setFormData({ ...formData, hp_website: e.target.value })}
                />
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="client-name" className="text-xs font-bold text-slate-800 flex items-center gap-1">
                    <span>이름</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    placeholder="홍길동"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:border-blue-500 transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="client-phone" className="text-xs font-bold text-slate-800 flex items-center gap-1">
                    <span>연락처</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="client-phone"
                    type="tel"
                    required
                    placeholder="010-0000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:border-blue-500 transition"
                  />
                </div>
              </div>

              {/* Consultation Category */}
              <div className="space-y-1.5">
                <label htmlFor="consult-category" className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <span>상담 분야</span>
                  <span className="text-rose-500">*</span>
                </label>
                <select
                  id="consult-category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:border-blue-500 transition cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Time Preference */}
              <div className="space-y-1.5">
                <label htmlFor="preferred-time" className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>상담 희망 시간 (선택)</span>
                </label>
                <select
                  id="preferred-time"
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:border-blue-500 transition cursor-pointer"
                >
                  {timeOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message / Details */}
              <div className="space-y-1.5">
                <label htmlFor="client-message" className="text-xs font-bold text-slate-800">
                  문의 내용 (선택)
                </label>
                <textarea
                  id="client-message"
                  rows={4}
                  placeholder="예: 현재 가입한 실손보험을 점검받고 싶습니다. 갱신 보험료가 인상되어 4세대 전환 여부를 고민 중입니다."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:border-blue-500 transition resize-none"
                />
              </div>

              {/* Privacy Agreement */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacy"
                  checked={formData.privacyAgreed}
                  onChange={(e) => setFormData({ ...formData, privacyAgreed: e.target.checked })}
                  className="mt-0.5 rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer w-4 h-4"
                />
                <label htmlFor="privacy" className="text-[11px] text-slate-600 leading-relaxed cursor-pointer select-none">
                  <span className="font-semibold text-slate-800">[필수] 개인정보 수집 및 이용 동의</span>
                  <br />
                  수집 항목: 이름, 연락처, 상담 분야, 문의 내용, 상담 희망 시간 / 수집 목적: 1:1 맞춤 보험 상담 신청 접수 및 회신 / 보유 기간: 상담 완료 후 1년 또는 정보주체의 파기 요청 시까지 안전하게 보관 후 파기.
                  <br />
                  <button
                    type="button"
                    onClick={() => onNavigate('/privacy')}
                    className="text-blue-600 hover:underline font-medium inline-block mt-0.5 cursor-pointer"
                  >
                    개인정보처리방침 자세히 보기 &rarr;
                  </button>
                </label>
              </div>

              {/* Submit Button with Anti-Double-Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-bold rounded-xl text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-600/20"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>상담 신청서 전송 중...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>상담 신청하기</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
