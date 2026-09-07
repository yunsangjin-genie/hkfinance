import React, { useState } from 'react';
import {
  ShieldCheck,
  Send,
  CheckCircle2,
  Phone,
  Clock,
  Lock,
  ArrowRight,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { CompanyInfo } from '../../types';
import { Breadcrumb } from '../../components/common/Breadcrumb';

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
    timePreference: '오후 (13:00 ~ 18:00)',
    message: '',
    privacyAgreed: true,
  });

  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  const categories = [
    '보험 전체 점검 및 보장분석',
    '실손의료보험 (실비 전환 등)',
    '종합 건강보험 (수술·입원비)',
    '암·뇌·심장 3대질병 보험',
    '종신 및 정기보험 (사망 보장)',
    '연금 및 노후 준비 보험',
    '화재 및 재산종합보험',
    '기타 맞춤 문의',
  ];

  const timeOptions = [
    '오전 (09:00 ~ 12:00)',
    '오후 (13:00 ~ 18:00)',
    '야간 (18:00 ~ 21:00, 사전예약)',
    '주말 상담 희망 (사전협의)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('성함과 연락처를 입력해 주세요.');
      return;
    }
    if (!formData.privacyAgreed) {
      alert('개인정보 수집 및 이용에 동의해 주세요.');
      return;
    }

    const ref = 'HK-' + Math.floor(100000 + Math.random() * 900000);
    setReferenceId(ref);

    // Save inquiry to localStorage for branch records
    const newInquiry = {
      id: ref,
      date: new Date().toISOString(),
      ...formData,
    };
    try {
      const existing = JSON.parse(localStorage.getItem('hk_consult_inquiries') || '[]');
      localStorage.setItem('hk_consult_inquiries', JSON.stringify([newInquiry, ...existing]));
    } catch {
      // fallback
    }

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      category: '보험 전체 점검 및 보장분석',
      timePreference: '오후 (13:00 ~ 18:00)',
      message: '',
      privacyAgreed: true,
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
            궁금한 보험 내용을 접수해 주시면 전문 상담팀이 상황에 맞는 맞춤 상담을 안전하게 진행합니다. HK금융파트너스 경인사업본부 목동지점은 서울 목동을 기반으로 하는 보험 상담 지점으로서, 금융소비자보호법을 준수하며 가입 강요 없이 고객의 권익을 최우선으로 보호합니다. 보험 상담이 필요한 고객과 보험설계사를 시작하려는 사람을 위한 열린 창구입니다.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-2 text-xs text-blue-300">
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHO: HK금융파트너스 목동지점
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHERE: 서울 목동 보험상담
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
                접수 번호: {referenceId}
              </span>
              <h2 className="text-2xl font-bold text-slate-900">
                상담 신청이 정상적으로 접수되었습니다.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                신청해 주신 내용은 <strong>{companyInfo.fullName}</strong> 상담팀에 안전하게 전달되었습니다.
                희망하신 시간대에 맞춰 정성을 다해 안내해 드리겠습니다.
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
                <span className="font-semibold text-slate-800">{formData.timePreference}</span>
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
                작성하신 정보는 오직 상담 배정 및 본인 연락 목적으로만 안전하게 사용됩니다.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                    <span>성함</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="홍길동"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:border-blue-500 transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                    <span>연락처 (휴대폰)</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
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
                <label className="text-xs font-bold text-slate-800">
                  상담 희망 분야
                </label>
                <select
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
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>연락 희망 시간대</span>
                </label>
                <select
                  value={formData.timePreference}
                  onChange={(e) => setFormData({ ...formData, timePreference: e.target.value })}
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
                <label className="text-xs font-bold text-slate-800">
                  문의 내용 및 점검하고 싶은 사항 (선택)
                </label>
                <textarea
                  rows={4}
                  placeholder="예: 실손보험 갱신 보험료가 너무 올라서 4세대로 바꾸는 게 좋은지 궁금합니다. / 기존에 가입한 암보험 진단비가 부족한지 확인하고 싶습니다."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:border-blue-500 transition resize-none"
                />
              </div>

              {/* Privacy Agreement */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacy"
                  checked={formData.privacyAgreed}
                  onChange={(e) => setFormData({ ...formData, privacyAgreed: e.target.checked })}
                  className="mt-0.5 rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="privacy" className="text-[11px] text-slate-600 leading-relaxed cursor-pointer">
                  <span className="font-semibold text-slate-800">[필수] 개인정보 수집 및 이용 동의</span>
                  <br />
                  수집 항목: 성명, 연락처, 상담 내용 / 수집 목적: 보험 상담 신청 접수 및 답변 안내 / 보유 기간: 상담 종료 후 1년 또는 파기 요청 시까지 안전하게 보관 후 파기.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold rounded-xl text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-600/20"
              >
                <Send className="w-4 h-4" />
                <span>무료 상담 신청하기</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
