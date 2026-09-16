import React, { useState, useEffect } from 'react';
import { X, Briefcase, CheckCircle2, Phone, Calendar, User, UserCheck, MessageSquare, Sparkles } from 'lucide-react';
import { RecruitFormData, CompanyInfo } from '../../types';
import { getCanonicalUrl } from '../../config/site';

interface RecruitModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyInfo?: CompanyInfo;
}

export const RecruitModal: React.FC<RecruitModalProps> = ({ isOpen, onClose, companyInfo }) => {
  const [formData, setFormData] = useState<RecruitFormData>({
    name: '',
    phone: '',
    currentJob: '직장인',
    experience: '처음 시작',
    preferredTime: '평일 저녁 또는 주말',
    message: '',
    agreePrivacy: true,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [hpWebsite, setHpWebsite] = useState('');

  // Close on Escape key and lock body scroll
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^0-9]/g, '');
    if (val.length > 11) val = val.slice(0, 11);
    if (val.length > 7) {
      val = val.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    } else if (val.length > 3) {
      val = val.replace(/(\d{3})(\d{1,4})/, '$1-$2');
    }
    setFormData((prev) => ({ ...prev, phone: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmedName = formData.name.trim();
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');

    if (!trimmedName || trimmedName.length < 2) {
      setErrorMsg('성함을 2자 이상 입력해 주세요.');
      return;
    }
    if (cleanPhone.length < 9 || cleanPhone.length > 12) {
      setErrorMsg('올바른 연락처(전화번호)를 입력해 주세요.');
      return;
    }
    if (!formData.agreePrivacy) {
      setErrorMsg('개인정보 수집 및 이용에 동의해 주셔야 지원 상담이 가능합니다.');
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
          type: 'planner-recruitment',
          name: trimmedName,
          phone: formData.phone.trim(),
          consultationType: '설계사 상담',
          currentJob: formData.currentJob,
          experience: formData.experience,
          preferredTime: formData.preferredTime,
          message: formData.message.trim(),
          privacyAgreed: formData.agreePrivacy,
          privacyConsent: formData.agreePrivacy,
          hp_website: hpWebsite,
          sourceUrl: typeof window !== 'undefined' ? window.location.href : getCanonicalUrl('/recruit'),
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        const genId = 'HK-RC-' + Math.floor(100000 + Math.random() * 900000);
        setReferenceId(genId);
        setIsSubmitted(true);
      } else {
        setErrorMsg(data?.message || '상담 신청 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      }
    } catch (err) {
      console.error('[Recruit Submit Error]', err);
      setErrorMsg('상담 신청 중 오류가 발생했습니다. 네트워크 연결을 확인하고 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setIsSubmitting(false);
    setErrorMsg('');
    setFormData({
      name: '',
      phone: '',
      currentJob: '직장인',
      experience: '처음 시작',
      preferredTime: '평일 저녁 또는 주말',
      message: '',
      agreePrivacy: true,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white select-none">
          <div className="flex items-center space-x-2.5">
            <span className="p-1.5 bg-indigo-600 rounded-lg text-white">
              <Briefcase className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-white leading-snug">보험설계사 지원 및 커리어 상담</h3>
              <p className="text-xs text-slate-300">
                {companyInfo ? `${companyInfo.fullName} · 지점장 ${companyInfo.leaderName}` : 'HK금융파트너스 경인사업본부 목동지점 · 지점장 윤상진 1:1 멘토링 상담'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5 pointer-events-none" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[85vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-indigo-50/50">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-mono font-medium rounded-md mb-2">
                  지원접수번호: {referenceId}
                </span>
                <h4 className="text-xl font-bold text-slate-900">설계사 지원 신청이 접수되었습니다!</h4>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-md mx-auto">
                  새로운 도전을 진심으로 환영합니다. 목동지점장 윤상진이 직접 확인 후, 편안한 일정에 맞춰 개별 안내 연락을 드리겠습니다.
                </p>
              </div>

              <div className="p-4 bg-indigo-50/60 border border-indigo-100 rounded-xl text-left text-xs text-indigo-900 space-y-1.5">
                <p className="font-semibold text-indigo-950 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" /> 지원 접수 확인
                </p>
                <p>• 지원자명: {formData.name} 님</p>
                <p>• 연락처: {formData.phone}</p>
                <p>• 현재 직업: {formData.currentJob} | 설계사 경험: {formData.experience}</p>
                <p>• 희망 연락 시간: {formData.preferredTime}</p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition shadow-sm"
                >
                  확인 및 닫기
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-900 leading-relaxed">
                🤝 <strong>혼자 시작하지 마세요</strong>: 시험 비용 지원부터 교육, 설계 지원, 베테랑 동행까지 목동지점이 든든한 파트너가 되어드립니다.
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  지원자 성함 <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="홍길동"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  연락처 (휴대폰 번호) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="010-0000-0000"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                </div>
              </div>

              {/* Current Job */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    현재 직업 <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.currentJob}
                    onChange={(e) => setFormData({ ...formData, currentJob: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition cursor-pointer"
                  >
                    <option value="직장인">직장인 (이직/투잡 고려)</option>
                    <option value="자영업">자영업 / 사업자</option>
                    <option value="프리랜서">프리랜서 / 계약직</option>
                    <option value="주부">주부 (경력단절/재취업)</option>
                    <option value="기존 보험설계사">기존 보험설계사 (경력)</option>
                    <option value="기타">기타 / 구직 중</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    보험설계사 경험 <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <UserCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition cursor-pointer"
                    >
                      <option value="처음 시작">처음 시작 (무경험/신입)</option>
                      <option value="경험 있음">과거 활동 경험 있음</option>
                      <option value="현재 활동 중">현재 타사에서 활동 중</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Preferred Time */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  상담 희망 시간대
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition cursor-pointer"
                  >
                    <option value="평일 저녁 또는 주말">평일 저녁 또는 주말 (재직자 추천)</option>
                    <option value="평일 오전 (09:00 ~ 12:00)">평일 오전 (09:00 ~ 12:00)</option>
                    <option value="평일 오후 (13:00 ~ 18:00)">평일 오후 (13:00 ~ 18:00)</option>
                    <option value="상시 가능">언제든 연락 가능</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  궁금한 점 또는 남기실 말씀 (선택)
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <textarea
                    rows={3}
                    placeholder="예: 현재 직장에 다니고 있는데 주말이나 저녁에 교육을 받으며 시작할 수 있는지 궁금합니다."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
                  />
                </div>
              </div>

              {/* Privacy Consent */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <label className="flex items-start space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreePrivacy}
                    onChange={(e) => setFormData({ ...formData, agreePrivacy: e.target.checked })}
                    className="mt-0.5 w-4 h-4 text-indigo-600 rounded-sm border-slate-300 focus:ring-indigo-500 cursor-pointer"
                  />
                  <span className="text-xs text-slate-600 leading-snug">
                    <strong className="text-slate-800">[필수]</strong> 개인정보 수집 및 이용에 동의합니다.
                    (수집항목: 성함, 연락처, 직업정보 / 이용목적: 설계사 채용 및 1:1 상담 안내 / 보유기간: 상담 완료 후 즉시 파기)
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

              {/* Error Message Banner */}
              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium flex items-center gap-2">
                  <span className="font-bold">안내:</span> {errorMsg}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-indigo-400 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center space-x-2 cursor-pointer disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>접수 처리 중...</span>
                  </span>
                ) : (
                  <span>설계사 지원 상담 신청하기</span>
                )}
              </button>

              <p className="text-[11px] text-center text-slate-400">
                * 과장된 소득을 약속하지 않으며, 정직하고 체계적인 성장의 기회를 제공합니다.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
