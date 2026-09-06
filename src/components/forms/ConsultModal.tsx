import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, CheckCircle2, Phone, Calendar, User, FileQuestion, MessageSquare } from 'lucide-react';
import { ConsultFormData, CompanyInfo } from '../../types';

interface ConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
  initialCategory?: string;
  companyInfo?: CompanyInfo;
}

export const ConsultModal: React.FC<ConsultModalProps> = ({
  isOpen,
  onClose,
  defaultCategory,
  initialCategory = '보험 전체 점검 (보장분석)',
  companyInfo,
}) => {
  const categoryValue = defaultCategory || initialCategory;
  const [formData, setFormData] = useState<ConsultFormData>({
    name: '',
    phone: '',
    category: categoryValue,
    preferredTime: '상시 가능 (빠른 연락)',
    message: '',
    agreePrivacy: true,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

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

  // Sync category when prop changes
  useEffect(() => {
    if (categoryValue) {
      setFormData((prev) => ({ ...prev, category: categoryValue }));
    }
  }, [categoryValue]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('성함을 입력해 주세요.');
      return;
    }
    if (formData.phone.replace(/[^0-9]/g, '').length < 10) {
      setErrorMsg('올바른 연락처(10~11자리)를 입력해 주세요.');
      return;
    }
    if (!formData.agreePrivacy) {
      setErrorMsg('개인정보 수집 및 이용에 동의해 주셔야 상담 신청이 가능합니다.');
      return;
    }

    setErrorMsg('');
    const genId = 'HK-CS-' + Math.floor(100000 + Math.random() * 900000);
    setReferenceId(genId);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      category: categoryValue,
      preferredTime: '상시 가능 (빠른 연락)',
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
            <span className="p-1.5 bg-blue-600 rounded-lg text-white">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-white leading-snug">고객 맞춤 보험상담 신청</h3>
              <p className="text-xs text-slate-300">
                {companyInfo ? `${companyInfo.fullName} · 지점장 ${companyInfo.leaderName}` : 'HK금융파트너스 경인사업본부 목동지점 · 지점장 윤상진 1:1 보장분석'}
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
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-blue-50/50">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-mono font-medium rounded-md mb-2">
                  접수번호: {referenceId}
                </span>
                <h4 className="text-xl font-bold text-slate-900">상담 신청이 정상적으로 접수되었습니다.</h4>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-md mx-auto">
                  고객님의 상황을 면밀히 검토한 후, 희망하신 시간대에 맞춰 <strong>{companyInfo?.branch || '목동지점'} 전문 상담팀</strong>에서 안전하게 연락드리겠습니다.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-left text-xs text-slate-600 space-y-1.5">
                <p className="font-semibold text-slate-800">📌 접수 정보 요약</p>
                <p>• 신청자명: {formData.name} 고객님</p>
                <p>• 연락처: {formData.phone}</p>
                <p>• 상담 희망 분야: {formData.category}</p>
                <p>• 희망 시간: {formData.preferredTime}</p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition shadow-sm"
                >
                  확인 및 닫기
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-blue-900 leading-relaxed">
                💡 <strong>가입 강요 없는 객관적 분석</strong>: 현재 가입된 보험의 중복 여부와 부족한 보장 범위를 알기 쉽게 점검해 드립니다.
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  고객 성함 <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="홍길동"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  상담 희망 분야 <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <FileQuestion className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none cursor-pointer"
                  >
                    <option value="보험 전체 점검">보험 전체 점검 (무료 보장분석)</option>
                    <option value="실손보험">실손의료보험 (실비 전환 및 가입 점검)</option>
                    <option value="건강보험">건강보험 (수술비/입원비/종합보장)</option>
                    <option value="암보험">3대 질병 암·뇌·심장 집중 보장</option>
                    <option value="종신보험">종신 및 정기보험 (가족 사망보장)</option>
                    <option value="연금보험">연금보험 및 노후 준비</option>
                    <option value="화재보험">화재 및 사업장 재산종합보험</option>
                    <option value="기타">기타 맞춤 문의</option>
                  </select>
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
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none cursor-pointer"
                  >
                    <option value="상시 가능 (빠른 연락)">상시 가능 (가장 빠른 시간 연락 희망)</option>
                    <option value="평일 오전 (09:00 ~ 12:00)">평일 오전 (09:00 ~ 12:00)</option>
                    <option value="평일 오후 (13:00 ~ 18:00)">평일 오후 (13:00 ~ 18:00)</option>
                    <option value="평일 저녁 (18:00 ~ 20:00)">평일 저녁 (18:00 ~ 20:00)</option>
                    <option value="주말 상담 희망">주말 사전 예약 상담 희망</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  문의내용 또는 궁금한 점 (선택)
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <textarea
                    rows={3}
                    placeholder="예: 2015년에 가입한 보험이 있는데 보험료가 많이 올라 점검받고 싶습니다."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
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
                    className="mt-0.5 w-4 h-4 text-blue-600 rounded-sm border-slate-300 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-xs text-slate-600 leading-snug">
                    <strong className="text-slate-800">[필수]</strong> 개인정보 수집 및 이용에 동의합니다.
                    (수집항목: 성함, 연락처 / 이용목적: 보험 상담 및 보장분석 안내 / 보유기간: 상담 완료 후 즉시 파기 또는 법정 보존기간 준수)
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center space-x-2"
              >
                <span>무료 보험 상담 신청하기</span>
              </button>

              <p className="text-[11px] text-center text-slate-400">
                * 고객님의 소중한 정보는 상담 목적 외에는 절대 사용되지 않습니다.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
