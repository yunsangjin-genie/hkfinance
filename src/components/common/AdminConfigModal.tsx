import React, { useState, useEffect } from 'react';
import { X, Settings, Check, Save, RotateCcw, Building, Phone, Mail, MapPin, Clock, Link2 } from 'lucide-react';
import { CompanyInfo } from '../../types';
import { initialCompanyInfo } from '../../data/company';

interface AdminConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyInfo: CompanyInfo;
  onSave: (updated: CompanyInfo) => void;
}

export const AdminConfigModal: React.FC<AdminConfigModalProps> = ({
  isOpen,
  onClose,
  companyInfo,
  onSave,
}) => {
  const [form, setForm] = useState<CompanyInfo>({ ...companyInfo });
  const [savedSuccess, setSavedSuccess] = useState(false);

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

  // Keep form in sync when modal opens
  useEffect(() => {
    if (isOpen) {
      setForm({ ...companyInfo });
    }
  }, [isOpen, companyInfo]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    setForm({ ...initialCompanyInfo });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white select-none">
          <div className="flex items-center space-x-2.5">
            <span className="p-1.5 bg-slate-700 rounded-lg text-white">
              <Settings className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-white leading-snug">지점 공식 정보 및 관리자 설정</h3>
              <p className="text-xs text-slate-300">실제 연락처·상세주소·SNS 채널 연동을 실시간으로 반영합니다.</p>
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[80vh] overflow-y-auto space-y-4">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed">
            🛡️ <strong>컴플라이언스 원칙</strong>: 임의의 전화번호나 주소는 자동 생성되지 않으며, 실제 지점 확정 정보로 변경 시 웹사이트 전 영역과 SEO 메타데이터에 즉시 적용됩니다.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Division & Branch Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">사업단 / 사업본부</label>
              <input
                type="text"
                value={form.division}
                onChange={(e) => setForm({ ...form, division: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">지점명</label>
              <input
                type="text"
                value={form.branch}
                onChange={(e) => setForm({ ...form, branch: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            {/* Leader Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">지점장명 / 호칭</label>
              <input
                type="text"
                value={form.leaderName}
                onChange={(e) => setForm({ ...form, leaderName: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">직통 휴대전화 (M.)</label>
              <input
                type="text"
                value={form.mobile || form.phone}
                onChange={(e) => setForm({ ...form, mobile: e.target.value, phone: e.target.value })}
                placeholder="010-2627-8554"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            {/* Tel */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">대표 전화번호 (T.)</label>
              <input
                type="text"
                value={form.tel || ''}
                onChange={(e) => setForm({ ...form, tel: e.target.value })}
                placeholder="070-8252-9712"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            {/* Fax */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">팩스 번호 (F.)</label>
              <input
                type="text"
                value={form.fax || ''}
                onChange={(e) => setForm({ ...form, fax: e.target.value })}
                placeholder="0504-441-8554"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">대표 이메일 (E.)</label>
              <input
                type="text"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="genie.yoon@gmail.com"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            {/* ZipCode */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">우편번호</label>
              <input
                type="text"
                value={form.zipCode || ''}
                onChange={(e) => setForm({ ...form, zipCode: e.target.value })}
                placeholder="우편번호"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">지점 주소</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="강남구 역삼동 708-33"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            {/* Detail Address */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">상세 주소 (층/호수)</label>
              <input
                type="text"
                value={form.detailAddress}
                onChange={(e) => setForm({ ...form, detailAddress: e.target.value })}
                placeholder="파라다이스 밴처타워 6층"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            {/* Consult Hours */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">상담 가능 시간 안내</label>
              <input
                type="text"
                value={form.consultHours}
                onChange={(e) => setForm({ ...form, consultHours: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            {/* Kakao Channel */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">카카오톡 채널 링크</label>
              <input
                type="text"
                value={form.kakaoLink}
                onChange={(e) => setForm({ ...form, kakaoLink: e.target.value })}
                placeholder="[관리자 입력 필요: https://pf.kakao.com/...]"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            {/* Blog Link */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">네이버 블로그 링크</label>
              <input
                type="text"
                value={form.blogLink}
                onChange={(e) => setForm({ ...form, blogLink: e.target.value })}
                placeholder="[관리자 입력 필요: https://blog.naver.com/...]"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
            >
              <RotateCcw className="w-3.5 h-3.5" /> 기본값 복원
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
              >
                취소
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> 저장 완료!
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" /> 설정 저장 및 즉시 반영
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
