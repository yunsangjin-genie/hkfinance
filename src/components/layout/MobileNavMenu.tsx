import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Briefcase,
  Phone,
  ArrowRight,
  FileSearch,
  Sparkles,
  MapPin,
  Clock,
  Building2,
  BookOpen,
  HelpCircle,
  Home,
  UserCheck,
  Award,
} from 'lucide-react';
import { CompanyInfo } from '../../types';
import { HKLogo } from '../common/HKLogo';

interface MobileNavMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
  onNavigate: (path: string) => void;
  companyInfo: CompanyInfo;
  onOpenConsult?: (category?: string) => void;
  onOpenRecruit?: () => void;
}

interface MenuSection {
  id: string;
  title: string;
  path?: string;
  icon: React.ReactNode;
  items: {
    label: string;
    path: string;
    desc?: string;
    badge?: string;
  }[];
}

export const MobileNavMenu: React.FC<MobileNavMenuProps> = ({
  isOpen,
  onClose,
  currentPath,
  onNavigate,
  companyInfo,
}) => {
  const [mounted, setMounted] = useState(false);

  // Accordion open states (default: all open for fast scanning, or toggleable)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    consulting: true,
    insurance: true,
    about: true,
    recruit: true,
    info: true,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // 1. Body Scroll Lock & Escape key listener: prevent background content scroll when menu is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    onClose();
    // Scroll to top smoothly on page transition
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const menuSections: MenuSection[] = [
    {
      id: 'consulting',
      title: '보험상담 & 보장분석',
      path: '/consulting',
      icon: <ShieldCheck className="w-4 h-4 text-blue-600" />,
      items: [
        {
          label: '보험상담 프로세스',
          path: '/consulting',
          desc: '5단계 객관적 보장 점검 원칙',
        },
        {
          label: '내 보험 보장분석',
          path: '/consulting/analysis',
          desc: '기존 보험 중복·과잉·부족 진단',
          badge: '추천',
        },
        {
          label: '1:1 상담 신청서',
          path: '/consulting/consultation',
          desc: '무료 맞춤 비교 상담 접수',
          badge: '신청',
        },
      ],
    },
    {
      id: 'insurance',
      title: '보험상품 비교 (30여 개 제휴사)',
      path: '/insurance',
      icon: <FileSearch className="w-4 h-4 text-emerald-600" />,
      items: [
        {
          label: '보험상품 전체보기',
          path: '/insurance',
          desc: '카테고리별 맞춤 상품 가이드',
        },
        {
          label: '실손의료보험',
          path: '/insurance/silson',
          desc: '4세대 실손 및 병원비 보장',
        },
        {
          label: '건강보험',
          path: '/insurance/health',
          desc: '3대 질병 진단비 및 수술비',
        },
        {
          label: '암·3대질병보험',
          path: '/insurance/cancer',
          desc: '암·뇌혈관·심장 집중 케어',
        },
        {
          label: '종신·정기보험',
          path: '/insurance/whole-life',
          desc: '가족을 위한 유고 대비',
        },
        {
          label: '생명보험',
          path: '/insurance/life',
          desc: '사망 보장 및 생애 맞춤 설계',
        },
        {
          label: '연금·노후보험',
          path: '/insurance/pension',
          desc: '세액공제 & 은퇴자금 마련',
        },
        {
          label: '화재·재산보험',
          path: '/insurance/fire',
          desc: '주택 및 사업장 화재 방어',
        },
      ],
    },
    {
      id: 'about',
      title: '목동지점 소개',
      path: '/about',
      icon: <Building2 className="w-4 h-4 text-slate-700" />,
      items: [
        {
          label: '목동지점 소개',
          path: '/about',
          desc: '운영 철학 및 고객 중심 상담 방향',
        },
        {
          label: '지점장 윤상진 소개',
          path: '/about/manager',
          desc: '지점장 프로필, 약력 및 상담 철학',
        },
      ],
    },
    {
      id: 'recruit',
      title: '설계사 채용 & 성장 지원',
      path: '/recruit',
      icon: <Briefcase className="w-4 h-4 text-indigo-600" />,
      items: [
        {
          label: '설계사 지원 개요',
          path: '/recruit',
          desc: '혼자 시작하지 않는 든든한 정착',
        },
        {
          label: '입문 6단계 프로세스',
          path: '/recruit/process',
          desc: '지원부터 전문 플래너 성장까지',
        },
        {
          label: '4대 집중 지원 시스템',
          path: '/recruit/support',
          desc: '시험비용·실무교육·설계·상담동행',
          badge: '4대 혜택',
        },
        {
          label: '초보 설계사 성장 스토리',
          path: '/recruit/story',
          desc: '선배 설계사의 솔직한 실무 인터뷰',
        },
      ],
    },
    {
      id: 'info',
      title: '정보센터 & 고객지원',
      path: '/insurance-info',
      icon: <BookOpen className="w-4 h-4 text-amber-600" />,
      items: [
        {
          label: '보험정보 칼럼 (인사이트)',
          path: '/insurance-info',
          desc: '전문가가 알려주는 실전 보험 팁',
        },
        {
          label: '자주 묻는 질문 (FAQ)',
          path: '/faq',
          desc: '상담 및 지원 시 궁금한 점 모음',
        },
        {
          label: '지점 위치 & 상담 문의',
          path: '/contact',
          desc: '오시는 길, 직통 연락처, 업무시간',
        },
      ],
    },
  ];

  const menuContent = (
    <div
      id="mobile-navigation-panel"
      role="dialog"
      aria-modal="true"
      aria-label="모바일 전체 메뉴"
      className="lg:hidden fixed inset-0 z-[9999] bg-white flex flex-col w-full h-[100vh] h-[100dvh] min-h-[100dvh] overflow-hidden"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: '100dvh',
        minHeight: '100dvh',
        zIndex: 9999,
      }}
    >
      {/* 1. FIXED TOP HEADER (Logo + Close X) */}
      <header
        className="flex-none h-16 sm:h-20 px-4 sm:px-6 flex items-center justify-between border-b border-slate-200 bg-white select-none z-10"
        style={{ flex: '0 0 auto' }}
      >
        {/* Brand Identity */}
        <div
          onClick={() => handleLinkClick('/')}
          className="flex items-center space-x-2.5 cursor-pointer py-1"
        >
          <HKLogo size="md" />
          <div className="flex flex-col justify-center border-l border-slate-200 pl-2.5 py-0.5">
            <span className="text-[11px] font-extrabold px-1.5 py-0.5 rounded-xs bg-blue-50 text-blue-950 border border-blue-200/80 w-fit">
              {companyInfo.branch || '목동지점'}
            </span>
            <span className="text-[10px] text-slate-500 font-semibold mt-0.5">
              {companyInfo.division || '경인사업본부'}
            </span>
          </div>
        </div>

        {/* Big Touch Target Close Button (X) */}
        <button
          onClick={onClose}
          type="button"
          aria-label="모바일 메뉴 닫기"
          className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 transition cursor-pointer border border-slate-200"
        >
          <X className="w-6 h-6 stroke-[2.5]" />
        </button>
      </header>

      {/* 2. SCROLLABLE MENU CONTENT */}
      <div
        className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 sm:px-6 py-5 space-y-6 pb-28 bg-white"
        style={{
          flex: '1 1 auto',
          minHeight: 0,
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-y',
        }}
      >
        {/* Quick Dual Action Banner */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => handleLinkClick('/consulting/consultation')}
            className="py-3 px-3 bg-blue-600 active:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-sm shadow-blue-500/20 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-blue-200 shrink-0" />
            <span>보험 상담 신청</span>
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('/recruit')}
            className="py-3 px-3 bg-slate-900 active:bg-black text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Briefcase className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>설계사 지원하기</span>
          </button>
        </div>

        {/* Home Quick Shortcut */}
        <button
          type="button"
          onClick={() => handleLinkClick('/')}
          className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between font-bold text-sm transition cursor-pointer ${
            currentPath === '/'
              ? 'bg-blue-50/80 border-blue-200 text-blue-700'
              : 'bg-slate-50 border-slate-200/80 text-slate-800 hover:bg-slate-100'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Home className="w-4 h-4 text-slate-600" />
            <span>홈 (메인 화면)</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </button>

        {/* Menu Sections (Categorized & Scannable) */}
        <div className="space-y-4">
          {menuSections.map((section) => {
            const isExpanded = openSections[section.id] ?? true;
            const isSectionActive = section.items.some((item) =>
              item.path === '/' ? currentPath === '/' : currentPath.startsWith(item.path)
            );

            return (
              <div
                key={section.id}
                className="border border-slate-200/90 rounded-2xl overflow-hidden bg-slate-50/40 shadow-xs"
              >
                {/* Section Header Button */}
                <div className="flex items-center justify-between bg-white px-4 py-3 border-b border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      if (section.path) {
                        handleLinkClick(section.path);
                      } else {
                        toggleSection(section.id);
                      }
                    }}
                    className={`flex items-center gap-2 text-left font-bold text-sm cursor-pointer flex-1 ${
                      isSectionActive ? 'text-blue-700' : 'text-slate-900'
                    }`}
                  >
                    {section.icon}
                    <span>{section.title}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSection(section.id);
                    }}
                    aria-label={`${section.title} 하위 메뉴 토글`}
                    className="p-1 text-slate-400 hover:text-slate-700 transition cursor-pointer"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Sub Items List */}
                {isExpanded && (
                  <div className="p-2 space-y-1 bg-white">
                    {section.items.map((sub) => {
                      const isSubActive =
                        sub.path === '/' ? currentPath === '/' : currentPath === sub.path;

                      return (
                        <button
                          key={sub.path}
                          type="button"
                          onClick={() => handleLinkClick(sub.path)}
                          className={`w-full text-left px-3 py-2.5 rounded-xl transition flex items-center justify-between cursor-pointer ${
                            isSubActive
                              ? 'bg-blue-50 text-blue-800 font-bold border border-blue-100'
                              : 'text-slate-700 hover:bg-slate-50 active:bg-slate-100'
                          }`}
                        >
                          <div className="pr-2">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`text-xs sm:text-sm font-semibold ${
                                  isSubActive ? 'text-blue-800 font-bold' : 'text-slate-800'
                                }`}
                              >
                                {sub.label}
                              </span>
                              {sub.badge && (
                                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-blue-100 text-blue-700">
                                  {sub.badge}
                                </span>
                              )}
                            </div>
                            {sub.desc && (
                              <p className="text-[11px] text-slate-500 font-normal mt-0.5 line-clamp-1">
                                {sub.desc}
                              </p>
                            )}
                          </div>
                          <ArrowRight
                            className={`w-3.5 h-3.5 shrink-0 ${
                              isSubActive ? 'text-blue-600' : 'text-slate-300'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 3. BRANCH CONTACT & LEADER OFFICIAL CARD */}
        <div className="mt-8 rounded-2xl bg-slate-900 text-white p-5 space-y-4 shadow-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-bold text-blue-400 tracking-wider">
                OFFICIAL BRANCH CONTACT
              </span>
              <h3 className="text-sm font-bold text-white mt-0.5">
                {companyInfo.fullName}
              </h3>
            </div>
            <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded-md font-medium border border-slate-700">
              지점장 윤상진
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>지점장 직통:</span>
              <a
                href={`tel:${companyInfo.mobile.replace(/[^0-9]/g, '')}`}
                className="font-bold text-white hover:text-blue-300 underline"
              >
                {companyInfo.mobile}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>대표전화:</span>
              <a
                href={`tel:${(companyInfo.tel || '070-8252-9712').replace(/[^0-9]/g, '')}`}
                className="font-bold text-white hover:text-blue-300 underline"
              >
                {companyInfo.tel || '070-8252-9712'}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>상담시간: {companyInfo.consultHours}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>소재지: {companyInfo.address} {companyInfo.detailAddress}</span>
            </div>
          </div>

          {/* Direct Call & Location Action Buttons */}
          <div className="pt-1 grid grid-cols-2 gap-2">
            <a
              href={`tel:${companyInfo.mobile.replace(/[^0-9]/g, '')}`}
              className="py-2.5 px-3 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 text-center shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>지점장 바로 통화</span>
            </a>
            <button
              type="button"
              onClick={() => handleLinkClick('/contact')}
              className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>오시는 길 안내</span>
            </button>
          </div>
        </div>

        {/* Legal & Policy Links */}
        <div className="pt-2 pb-4 flex items-center justify-center gap-4 text-xs text-slate-500 border-t border-slate-100">
          <button
            type="button"
            onClick={() => handleLinkClick('/privacy')}
            className="hover:text-slate-800 underline cursor-pointer"
          >
            개인정보처리방침
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={() => handleLinkClick('/terms')}
            className="hover:text-slate-800 underline cursor-pointer"
          >
            이용약관
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={() => handleLinkClick('/about/manager')}
            className="hover:text-slate-800 underline cursor-pointer"
          >
            지점장 소개
          </button>
        </div>
      </div>
    </div>
  );

  // If running in browser and mounted, portal into document.body to escape any parent stacking contexts
  if (mounted && typeof document !== 'undefined') {
    return createPortal(menuContent, document.body);
  }

  // Fallback for SSR / pre-render
  return menuContent;
};
