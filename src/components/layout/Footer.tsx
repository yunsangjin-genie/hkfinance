import React from 'react';
import { Shield, Phone, Mail, MapPin, Clock, ArrowRight, ExternalLink, Settings, Sparkles } from 'lucide-react';
import { NavigationPage, CompanyInfo } from '../../types';
import { HKLogo } from '../common/HKLogo';

interface FooterProps {
  onNavigate: (page: NavigationPage) => void;
  onOpenConsult: (category?: string) => void;
  onOpenRecruit: () => void;
  onOpenAdminConfig: () => void;
  companyInfo: CompanyInfo;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenConsult,
  onOpenRecruit,
  onOpenAdminConfig,
  companyInfo,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs leading-relaxed pb-24 md:pb-12">
      {/* Top Banner inside Footer */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-blue-400 font-semibold text-xs tracking-wider uppercase mb-1 block">
              HK FINANCIAL PARTNERS · MOKDONG BRANCH
            </span>
            <h3 className="text-lg md:text-xl font-bold text-white">
              {companyInfo.mainSlogan}
            </h3>
            <p className="text-slate-400 text-xs md:text-sm mt-1">
              {companyInfo.fullName} (지점장 {companyInfo.leaderName})
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenConsult('보험 전체 점검')}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition flex items-center gap-1.5"
            >
              <span>보험 상담 신청</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onOpenRecruit}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition flex items-center gap-1.5"
            >
              <span>설계사 지원하기</span>
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3.5">
            <div className="flex items-center space-x-3 text-white">
              <HKLogo variant="light" size="md" />
              <div className="border-l border-slate-700 pl-2.5">
                <span className="text-xs font-bold text-slate-300 block">
                  {companyInfo.branch || '목동지점'}
                </span>
                <span className="text-[11px] text-slate-500 block">
                  {companyInfo.division || '경인사업본부'}
                </span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-400">
              <p className="text-slate-300 font-medium">
                • 지점장 / 팀장: <strong className="text-white">{companyInfo.leaderName}</strong>
              </p>
              <p className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <span>주소: ({companyInfo.zipCode || '07997'}) {companyInfo.address} {companyInfo.detailAddress}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>직통: <a href={`tel:${companyInfo.mobile || companyInfo.phone}`} className="text-blue-400 hover:underline">{companyInfo.mobile || companyInfo.phone}</a></span>
                <span className="text-slate-600">|</span>
                <span>대표전화: <a href={`tel:${companyInfo.tel || '1566-8163'}`} className="hover:underline">{companyInfo.tel || '1566-8163'}</a></span>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>이메일: <a href={`mailto:${companyInfo.email}`} className="text-slate-300 hover:underline">{companyInfo.email}</a></span>
                <span className="text-slate-600">|</span>
                <span>팩스: {companyInfo.fax || '0504-441-8554'}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>상담 시간: {companyInfo.consultHours}</span>
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAdminConfig}
                className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-300 underline underline-offset-4"
              >
                <Settings className="w-3 h-3" />
                <span>[관리자] 지점 공식 정보 및 연락처 수정</span>
              </button>
            </div>
          </div>

          {/* Quick Menu - Customers */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              고객 서비스 &amp; 상담
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('consulting')}
                  className="hover:text-white transition"
                >
                  무료 보장분석 신청
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition"
                >
                  고민별 보험상품 안내
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('info')}
                  className="hover:text-white transition"
                >
                  보험 상식 &amp; 리모델링 가이드
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-white transition"
                >
                  자주 묻는 질문 (FAQ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('branch')}
                  className="hover:text-white transition"
                >
                  목동지점 소개 &amp; {companyInfo.leaderName} 지점장 인사말
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Menu - Recruitment & Policy */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              설계사 지원 &amp; 정책
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('recruitment')}
                  className="hover:text-white transition text-indigo-400 font-semibold"
                >
                  설계사 지원 혜택 (5대 지원)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('recruitment')}
                  className="hover:text-white transition"
                >
                  7단계 신입 성장 로드맵
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-white transition"
                >
                  개인정보처리방침
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="hover:text-white transition"
                >
                  이용약관 및 금융소비자보호
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenRecruit()}
                  className="hover:text-white transition text-slate-300 font-medium"
                >
                  설계사 1:1 진로 상담 신청
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Compliance & Consumer Protection Legal Notice */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-2 text-[11px] text-slate-500 leading-normal">
          <p className="font-semibold text-slate-400">
            [금융소비자보호 및 광고 심의 준수 안내]
          </p>
          <p>
            • 본 웹사이트의 모든 보험 관련 콘텐츠와 상담 내용은 고객의 이해를 돕기 위한 정보 제공 목적이며, 실제 계약 체결 시에는 해당 보험회사의 약관 및 상품설명서가 우선 적용됩니다.
          </p>
          <p>
            • 보험계약 시 피보험자의 연령, 성별, 직업, 과거 병력 및 건강 상태에 따라 가입 한도, 인수 조건 및 보험료가 달라지거나 가입이 제한될 수 있습니다.
          </p>
          <p>
            • 당 지점은 특정 수익률이나 보험금 지급 금액을 임의로 보장하지 않으며, 관계 법령(금융소비자보호법 등)을 철저히 준수합니다.
          </p>
          <p className="pt-2 text-slate-600">
            Copyright © {new Date().getFullYear()} {companyInfo.fullName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
