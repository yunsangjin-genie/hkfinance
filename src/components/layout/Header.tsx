import React, { useState } from 'react';
import { Menu, X, Shield, ChevronDown, Phone, Briefcase, Sparkles, Settings, ArrowRight } from 'lucide-react';
import { NavigationPage, CompanyInfo } from '../../types';
import { HKLogo } from '../common/HKLogo';

interface HeaderProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  onOpenConsult: (category?: string) => void;
  onOpenRecruit: () => void;
  onOpenAdminConfig: () => void;
  companyInfo: CompanyInfo;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenConsult,
  onOpenRecruit,
  onOpenAdminConfig,
  companyInfo,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavigationPage; label: string; badge?: string }[] = [
    { id: 'home', label: '홈' },
    { id: 'branch', label: companyInfo.branchName || '지점소개' },
    { id: 'products', label: '보험상품' },
    { id: 'consulting', label: '보험상담' },
    { id: 'recruitment', label: '설계사 지원', badge: '모집중' },
    { id: 'info', label: '보험정보' },
    { id: 'faq', label: 'FAQ' },
  ];

  const handleNavClick = (page: NavigationPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Top utility notification bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-medium text-slate-200">
              {companyInfo.fullName}
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">{companyInfo.consultHours}</span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <button
              onClick={onOpenAdminConfig}
              className="inline-flex items-center space-x-1 text-slate-400 hover:text-white transition cursor-pointer"
              title="지점 정보 및 연락처 설정"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>지점 정보 설정</span>
            </button>
            <span className="text-slate-600">·</span>
            <span className="text-blue-400 font-medium">{companyInfo.coreMessage}</span>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group select-none py-1"
          >
            <HKLogo size="md" />
            <div className="hidden sm:flex flex-col justify-center border-l border-slate-200 pl-2.5 py-0.5">
              <span className="text-[11px] font-extrabold px-1.5 py-0.5 rounded-sm bg-blue-50 text-blue-900 border border-blue-200/80 w-fit">
                {companyInfo.branch || '목동지점'}
              </span>
              <span className="text-[10px] text-slate-500 font-semibold mt-0.5">
                {companyInfo.division || '경인사업본부'}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'text-blue-600 bg-blue-50/70 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-extrabold px-1.5 py-0.2 bg-emerald-500 text-white rounded-full leading-tight animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Dual Funnel CTA Buttons */}
          <div className="hidden sm:flex items-center space-x-2.5">
            <button
              onClick={() => onOpenConsult('보험 전체 점검')}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs md:text-sm font-bold rounded-xl shadow-xs hover:shadow-md transition flex items-center space-x-1.5 cursor-pointer"
            >
              <span>보험 상담 신청</span>
            </button>
            <button
              onClick={onOpenRecruit}
              className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 active:bg-black text-white text-xs md:text-sm font-semibold rounded-xl transition flex items-center space-x-1.5 cursor-pointer"
            >
              <Briefcase className="w-4 h-4 text-indigo-400" />
              <span>설계사 지원하기</span>
            </button>
          </div>

          {/* Mobile menu hamburger button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={onOpenAdminConfig}
              className="p-2 text-slate-500 hover:text-slate-900 rounded-lg"
              title="설정"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsult('보험 전체 점검');
              }}
              className="py-3 px-3 bg-blue-600 text-white text-xs font-bold rounded-xl text-center shadow-xs"
            >
              보험 상담 신청
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRecruit();
              }}
              className="py-3 px-3 bg-slate-900 text-white text-xs font-bold rounded-xl text-center shadow-xs"
            >
              설계사 지원하기
            </button>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-500 text-white rounded-full">
                      {item.badge}
                    </span>
                  ) : (
                    <ArrowRight className="w-4 h-4 text-slate-300" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>{companyInfo.consultHours}</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminConfig();
              }}
              className="text-blue-600 font-medium"
            >
              지점 정보 관리
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
