import React, { useState } from 'react';
import { Menu, X, ChevronDown, Phone, Briefcase, ArrowRight, ShieldCheck, Sparkles, User } from 'lucide-react';
import { CompanyInfo } from '../../types';
import { HKLogo } from '../common/HKLogo';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenConsult: (category?: string) => void;
  onOpenRecruit: () => void;
  companyInfo: CompanyInfo;
}

interface NavItem {
  label: string;
  path: string;
  subItems?: { label: string; path: string; desc?: string }[];
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenConsult,
  onOpenRecruit,
  companyInfo,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navItems: NavItem[] = [
    { label: 'HOME', path: '/' },
    {
      label: '목동지점',
      path: '/about',
      subItems: [
        { label: '지점 소개', path: '/about', desc: '운영 철학 및 상담 방향' },
        { label: '지점장 소개', path: '/about/manager', desc: '윤상진 지점장 프로필 & 철학' },
      ],
    },
    {
      label: '보험상담',
      path: '/consulting',
      subItems: [
        { label: '상담 프로세스', path: '/consulting', desc: '5단계 객관적 보장 점검' },
        { label: '내 보험 보장분석', path: '/consulting/analysis', desc: '중복담보 및 공백 진단' },
        { label: '상담 신청', path: '/consulting/consultation', desc: '1:1 맞춤 상담 신청하기' },
      ],
    },
    {
      label: '보험상품',
      path: '/insurance',
      subItems: [
        { label: '보험상품 전체', path: '/insurance', desc: '카테고리별 상품 가이드' },
        { label: '실손의료보험', path: '/insurance/silson', desc: '4세대 실손 및 병원비 보장' },
        { label: '건강보험', path: '/insurance/health', desc: '진단비·수술비·입원비' },
        { label: '암·3대질병보험', path: '/insurance/cancer', desc: '암·뇌·심장 집중 케어' },
        { label: '종신·정기보험', path: '/insurance/whole-life', desc: '가족을 위한 유고 대비' },
        { label: '연금·노후보험', path: '/insurance/pension', desc: '세액공제 & 은퇴자금' },
        { label: '화재·재산보험', path: '/insurance/fire', desc: '주택 및 사업장 화재 방어' },
      ],
    },
    {
      label: '설계사 지원',
      path: '/recruit',
      subItems: [
        { label: '지원 개요', path: '/recruit', desc: '처음 시작하는 분을 위한 지원' },
        { label: '지원 프로세스', path: '/recruit/process', desc: '6단계 입문 & 성장 코스' },
        { label: '4대 지원 시스템', path: '/recruit/support', desc: '시험·교육·설계·상담동행' },
        { label: '설계사 이야기', path: '/recruit/story', desc: '초보 설계사 실무 가이드' },
      ],
    },
    { label: '보험정보', path: '/insurance-info' },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const isNavActive = (item: NavItem) => {
    if (item.path === '/') return currentPath === '/';
    if (currentPath.startsWith(item.path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 transition-all">
      {/* Top utility bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-slate-200">
              {companyInfo.fullName}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">지점장 직통: {companyInfo.mobile}</span>
          </div>

          <div className="flex items-center space-x-4 text-slate-400">
            <span>상담시간: {companyInfo.consultHours}</span>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => handleLinkClick('/contact')}
              className="text-slate-300 hover:text-white transition cursor-pointer"
            >
              오시는 길
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <div
            onClick={() => handleLinkClick('/')}
            className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group select-none py-1"
          >
            <HKLogo size="md" />
            <div className="hidden sm:flex flex-col justify-center border-l border-slate-200 pl-2.5 py-0.5">
              <span className="text-[11px] font-extrabold px-1.5 py-0.5 rounded-xs bg-blue-50 text-blue-950 border border-blue-200/80 w-fit">
                {companyInfo.branch || '목동지점'}
              </span>
              <span className="text-[10px] text-slate-500 font-semibold mt-0.5">
                {companyInfo.division || '경인사업본부'}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="메인 메뉴">
            {navItems.map((item) => {
              const active = isNavActive(item);
              const hasSub = !!item.subItems;

              return (
                <div
                  key={item.path}
                  className="relative group"
                  onMouseEnter={() => hasSub && setActiveDropdown(item.path)}
                  onMouseLeave={() => hasSub && setActiveDropdown(null)}
                >
                  <button
                    onClick={() => handleLinkClick(item.path)}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                      active
                        ? 'text-blue-700 bg-blue-50/80 font-bold'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/70'
                    }`}
                  >
                    <span>{item.label}</span>
                    {hasSub && (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-transform group-hover:rotate-180" />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {hasSub && (
                    <div className="absolute top-full left-0 w-64 pt-2 hidden group-hover:block transition-all animate-in fade-in-50 duration-150 z-50">
                      <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-2 space-y-1">
                        {item.subItems!.map((sub) => {
                          const isSubActive = currentPath === sub.path;
                          return (
                            <button
                              key={sub.path}
                              onClick={() => handleLinkClick(sub.path)}
                              className={`w-full text-left px-3 py-2.5 rounded-lg transition flex flex-col cursor-pointer ${
                                isSubActive
                                  ? 'bg-blue-50 text-blue-800 font-bold'
                                  : 'hover:bg-slate-50 text-slate-800'
                              }`}
                            >
                              <span className="text-xs font-bold leading-tight">{sub.label}</span>
                              {sub.desc && (
                                <span className="text-[11px] text-slate-500 font-normal mt-0.5">
                                  {sub.desc}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Core Action Buttons (Dual Funnel CTAs) */}
          <div className="hidden sm:flex items-center space-x-2">
            <button
              onClick={() => handleLinkClick('/consulting/consultation')}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs md:text-sm font-bold rounded-xl shadow-xs hover:shadow-md transition flex items-center space-x-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-blue-200" />
              <span>보험 상담</span>
            </button>
            <button
              onClick={() => handleLinkClick('/recruit')}
              className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 active:bg-black text-white text-xs md:text-sm font-semibold rounded-xl transition flex items-center space-x-1.5 cursor-pointer"
            >
              <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
              <span>설계사 지원</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger Toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-700 hover:text-slate-950 rounded-xl hover:bg-slate-100 transition cursor-pointer"
              aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bottom-0 bg-slate-900/60 backdrop-blur-xs z-50 flex flex-col justify-between">
          <div className="bg-white border-b border-slate-200 px-5 py-6 max-h-[80vh] overflow-y-auto shadow-2xl space-y-5">
            {/* Quick Mobile Action Buttons */}
            <div className="grid grid-cols-2 gap-2.5 pb-3 border-b border-slate-100">
              <button
                onClick={() => handleLinkClick('/consulting/consultation')}
                className="py-3 bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>보험 상담</span>
              </button>
              <button
                onClick={() => handleLinkClick('/recruit')}
                className="py-3 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Briefcase className="w-4 h-4 text-indigo-400" />
                <span>설계사 지원</span>
              </button>
            </div>

            {/* Navigation Category List */}
            <div className="space-y-3">
              {navItems.map((item) => {
                const active = isNavActive(item);
                return (
                  <div key={item.path} className="border-b border-slate-100 pb-2">
                    <button
                      onClick={() => handleLinkClick(item.path)}
                      className={`w-full text-left py-2 font-bold text-sm flex items-center justify-between cursor-pointer ${
                        active ? 'text-blue-600' : 'text-slate-900'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </button>

                    {item.subItems && (
                      <div className="pl-3 pr-1 py-1 space-y-1">
                        {item.subItems.map((sub) => (
                          <button
                            key={sub.path}
                            onClick={() => handleLinkClick(sub.path)}
                            className={`w-full text-left py-1.5 text-xs rounded-md block cursor-pointer ${
                              currentPath === sub.path
                                ? 'text-blue-700 font-bold bg-blue-50 px-2'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Branch Contact Quick Info */}
            <div className="pt-2 text-xs text-slate-500 space-y-1 bg-slate-50 p-3 rounded-xl">
              <p className="font-semibold text-slate-700">{companyInfo.fullName}</p>
              <p>지점장 직통: {companyInfo.mobile}</p>
              <p>상담시간: {companyInfo.consultHours}</p>
            </div>
          </div>

          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};
