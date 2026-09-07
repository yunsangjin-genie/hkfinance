import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Lock, ShieldCheck } from 'lucide-react';
import { CompanyInfo } from '../../types';
import { HKLogo } from '../common/HKLogo';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenConsult: (category?: string) => void;
  onOpenRecruit: () => void;
  onOpenAdminConfig: () => void;
  companyInfo: CompanyInfo;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenAdminConfig,
  companyInfo,
}) => {
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [pinError, setPinError] = useState(false);

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: 1234 or branch manager phone last 4 digits (8554)
    if (adminPin === '1234' || adminPin === '8554') {
      setShowAdminPrompt(false);
      setAdminPin('');
      setPinError(false);
      onOpenAdminConfig();
    } else {
      setPinError(true);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs leading-relaxed pb-24 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & Address Column */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center space-x-2.5">
              <HKLogo size="sm" />
              <div>
                <h4 className="text-white font-bold text-sm leading-tight">
                  {companyInfo.fullName}
                </h4>
                <p className="text-[11px] text-slate-400">
                  지점장 {companyInfo.leaderName}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 font-medium pt-1">
              "보험을 권하기보다, 필요한 보장을 함께 설계합니다."
            </p>

            <div className="space-y-1 text-slate-400 text-[11px] pt-1">
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{companyInfo.address} {companyInfo.detailAddress}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>지점장 직통: {companyInfo.mobile} | 대표전화: {companyInfo.tel}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>이메일: {companyInfo.email} | 팩스: {companyInfo.fax}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{companyInfo.consultHours}</span>
              </p>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-6 flex flex-col sm:flex-row justify-end gap-8 sm:gap-12 pt-2 md:pt-0">
            <div>
              <h5 className="text-white font-bold text-xs mb-3 uppercase tracking-wider">주요 메뉴</h5>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => onNavigate('/about')}
                    className="hover:text-white transition cursor-pointer"
                  >
                    목동지점 소개
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('/about/manager')}
                    className="hover:text-white transition cursor-pointer"
                  >
                    지점장 소개
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('/consulting')}
                    className="hover:text-white transition cursor-pointer"
                  >
                    보험상담 안내
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('/insurance')}
                    className="hover:text-white transition cursor-pointer"
                  >
                    보험상품 가이드
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-bold text-xs mb-3 uppercase tracking-wider">설계사 및 정보</h5>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => onNavigate('/recruit')}
                    className="hover:text-white transition cursor-pointer"
                  >
                    설계사 지원
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('/insurance-info')}
                    className="hover:text-white transition cursor-pointer"
                  >
                    보험정보 허브
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('/contact')}
                    className="hover:text-white transition cursor-pointer"
                  >
                    오시는 길
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('/faq')}
                    className="hover:text-white transition cursor-pointer"
                  >
                    자주 묻는 질문
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-bold text-xs mb-3 uppercase tracking-wider">이용 정책</h5>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => onNavigate('/privacy')}
                    className="hover:text-white transition font-medium text-slate-300 cursor-pointer"
                  >
                    개인정보처리방침
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('/terms')}
                    className="hover:text-white transition cursor-pointer"
                  >
                    이용약관
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Compliance Notice */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 text-[11px] text-slate-500 space-y-1 leading-relaxed">
          <p className="flex items-center gap-1.5 font-medium text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span>금융소비자보호 및 준법 고지</span>
          </p>
          <p>
            HK금융파트너스는 금융소비자보호법을 준수하며, 다수 보험사와 제휴된 법인보험대리점(GA)으로서 공정하고 객관적인 보장분석 및 비교상담을 제공합니다.
            본 웹사이트에 게재된 보험 관련 정보는 이해를 돕기 위한 예시 및 일반적 안내이며, 가입 전 상품설명서와 약관을 반드시 확인하시기 바랍니다.
          </p>
        </div>

        {/* Bottom Copyright & Discreet Admin Access */}
        <div className="mt-6 pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} {companyInfo.fullName}. All rights reserved.</p>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowAdminPrompt(true)}
              className="text-slate-600 hover:text-slate-400 flex items-center gap-1 transition cursor-pointer"
              title="관리자 설정"
            >
              <Lock className="w-3 h-3" />
              <span>관리자 설정</span>
            </button>
          </div>
        </div>
      </div>

      {/* Admin Authentication Prompt Modal */}
      {showAdminPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl text-slate-200">
            <div className="flex items-center gap-2 font-bold text-white mb-2">
              <Lock className="w-4 h-4 text-blue-400" />
              <span>지점 관리자 인증</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              지점 정보 및 연락처 수정을 위해 관리자 비밀번호를 입력해 주세요. (기본: 1234)
            </p>

            <form onSubmit={handleAdminAuth} className="space-y-3">
              <input
                type="password"
                placeholder="비밀번호 입력"
                value={adminPin}
                onChange={(e) => {
                  setAdminPin(e.target.value);
                  setPinError(false);
                }}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-hidden focus:border-blue-500"
                autoFocus
              />
              {pinError && (
                <p className="text-[11px] text-rose-400">비밀번호가 올바르지 않습니다.</p>
              )}

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdminPrompt(false)}
                  className="px-3.5 py-2 text-xs text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition cursor-pointer"
                >
                  확인
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
};
