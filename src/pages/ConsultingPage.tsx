import React, { useState } from 'react';
import { ShieldCheck, Search, Scale, AlertCircle, CheckCircle2, Phone, Calendar, Clock, Lock, Send, Check, Eye, HelpCircle } from 'lucide-react';
import { InteractiveCoverageCheck } from '../components/common/InteractiveCoverageCheck';
import { CompanyInfo } from '../types';
import { siteImages } from '../assets/images';
import { getCanonicalUrl } from '../config/site';

interface ConsultingPageProps {
  companyInfo: CompanyInfo;
  onOpenConsultModal: (category?: string) => void;
}

export const ConsultingPage: React.FC<ConsultingPageProps> = ({
  companyInfo,
  onOpenConsultModal,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    consultType: '보험 전체 점검 (보장분석)',
    ageGroup: '30대',
    preferredTime: '평일 오후 (14:00~18:00)',
    message: '',
    privacyAgreed: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [hpWebsite, setHpWebsite] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedName = formData.name.trim();
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');

    if (!trimmedName || trimmedName.length < 2) {
      setErrorMessage('성함을 2자 이상 입력해 주세요.');
      return;
    }
    if (cleanPhone.length < 9 || cleanPhone.length > 12) {
      setErrorMessage('올바른 연락처(전화번호)를 입력해 주세요.');
      return;
    }
    if (!formData.privacyAgreed) {
      setErrorMessage('개인정보 수집 및 이용에 동의해 주세요.');
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
          category: formData.consultType,
          preferredTime: formData.preferredTime,
          message: formData.message.trim(),
          privacyAgreed: formData.privacyAgreed,
          privacyConsent: formData.privacyAgreed,
          hp_website: hpWebsite,
          sourceUrl: typeof window !== 'undefined' ? window.location.href : getCanonicalUrl('/consulting/consultation'),
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data?.message || '상담 신청 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      }
    } catch (err) {
      console.error('[ConsultingPage Submit Error]', err);
      setErrorMessage('상담 신청 처리 중 문제가 발생했습니다. 네트워크 연결을 확인하고 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    {
      step: '01',
      title: '상담 접수 및 사전 분석',
      desc: '신청서 작성 후 담당 수석 팀장이 기존 가입 내역 사전 점검 준비',
    },
    {
      step: '02',
      title: '1:1 심층 보장 분석',
      desc: '불필요한 중복 담보, 보장 공백, 갱신 주기별 보험료 인상 리스크 진단',
    },
    {
      step: '03',
      title: '객관적 비교 리포트 제공',
      desc: '현행 보험의 유지 권장 항목과 보완 필요 항목을 투명하게 안내',
    },
    {
      step: '04',
      title: '맞춤형 포트폴리오 제안',
      desc: '고객의 선택에 따라 최적의 다수 보험사 플랜 비교 제시',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header with Photo Overlay */}
      <section className="relative bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src={siteImages.consultingAnalysis}
            alt="보장분석 배경"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950 px-3.5 py-1 rounded-full border border-blue-800">
            FREE INSURANCE AUDIT &amp; CONSULTING
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            가입 강요 없는 1:1 맞춤 보장분석
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            매달 나가는 보험료, 과연 우리 가족에게 꼭 맞는 보장일까요?
            {companyInfo.fullName}에서 객관적이고 투명하게 분석해 드립니다.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Visual Dual Photo Feature Highlight */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={siteImages.consultingAnalysis}
                alt="태블릿 기반 1:1 보장분석 및 비교 분석"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-4 text-xs font-bold text-white bg-blue-600/90 px-3 py-1 rounded-full backdrop-blur-xs">
                데이터 기반 투명한 보장 진단
              </span>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="text-base font-bold text-slate-900">태블릿 전산 비교 분석 시스템</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                국내 30여 개 생명·손해보험사의 보장 범위와 보험료를 한 화면에서 실시간 비교하여 가장 유리한 조건을 찾아드립니다.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={siteImages.consultingRoom}
                alt="안락하고 독립된 프라이빗 상담 공간"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-4 text-xs font-bold text-white bg-emerald-600/90 px-3 py-1 rounded-full backdrop-blur-xs">
                독립된 프라이빗 1:1 상담실
              </span>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="text-base font-bold text-slate-900">편안하고 비밀이 보장되는 상담 공간</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                목동지점에 마련된 안락한 상담 공간에서 개인정보 및 금융 자산에 관한 대화를 편안하게 나누실 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Self-Diagnostic Tool */}
        <section>
          <div className="mb-6 text-center max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              30초 내 보험 자가진단
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              간단한 체크를 통해 현재 보험의 점검 필요성을 확인해보세요.
            </p>
          </div>
          <InteractiveCoverageCheck onOpenConsult={onOpenConsultModal} />
        </section>

        {/* 4-Step Process Section */}
        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {companyInfo.fullName} 보장분석 상담 진행 절차
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              체계적이고 투명한 4단계 프로세스를 통해 안전하게 상담을 진행합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.step} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  STEP {s.step}
                </span>
                <h3 className="text-sm font-bold text-slate-900">{s.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Embedded Form Section */}
        <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                DIRECT APPLICATION
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                지금 바로 무료 상담을<br />신청하세요
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                신청서를 남겨주시면 {companyInfo.fullName} 전문 컨설턴트가 24시간 이내에 친절하게 연락드립니다.
              </p>

              <div className="space-y-3 pt-4 text-xs text-slate-700">
                <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                  <span>비대면 전화/카카오톡 상담 및 대면 상담 모두 가능</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2.5">
                  <Lock className="w-5 h-5 text-slate-600 shrink-0" />
                  <span>개인정보 암호화 및 상담 완료 후 안전 파기</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-4 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-emerald-900">
                    상담 신청이 정상적으로 접수되었습니다!
                  </h3>
                  <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                    지점 담당자가 신청 내용을 확인한 후 희망하신 시간대에 신속히 안내해 드리겠습니다.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 bg-emerald-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    추가 상담 접수
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        성함 <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="홍길동"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        연락처 <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="010-1234-5678"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        상담 유형 <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={formData.consultType}
                        onChange={(e) => setFormData({ ...formData, consultType: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                      >
                        <option>보험 전체 점검 (보장분석)</option>
                        <option>실손의료비 전환 및 점검</option>
                        <option>암/뇌/심장 3대질병 진단비</option>
                        <option>연금 및 노후 자금 설계</option>
                        <option>가족 종합 보험 리모델링</option>
                        <option>화재·사업장 배상책임</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        희망 상담 시간
                      </label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                      >
                        <option>상관 없음 (빠른 상담)</option>
                        <option>평일 오전 (09:00~12:00)</option>
                        <option>평일 오후 (14:00~18:00)</option>
                        <option>평일 저녁 (18:00~20:00)</option>
                        <option>주말 상담 희망</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      궁금하신 점 또는 보유 보험 상황 (선택)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="예: 20년 전 가입한 종신보험이 있는데 보험료가 부담됩니다. 점검받고 싶어요."
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.privacyAgreed}
                        onChange={(e) => setFormData({ ...formData, privacyAgreed: e.target.checked })}
                        className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                        required
                      />
                      <span className="text-xs text-slate-600 leading-tight">
                        [필수] 상담 접수 및 안내를 위한 개인정보(이름, 연락처) 수집 및 이용에 동의합니다.
                      </span>
                    </label>
                  </div>

                  {/* Honeypot field for anti-spam bots */}
                  <input
                    type="text"
                    name="hp_website"
                    value={hpWebsite}
                    onChange={(e) => setHpWebsite(e.target.value)}
                    style={{ display: 'none', position: 'absolute', left: '-9999px' }}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  {/* Error message */}
                  {errorMessage && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-bold rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>상담 신청서 전송 중...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>무료 보장분석 상담 신청 완료하기</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

