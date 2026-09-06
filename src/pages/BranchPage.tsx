import React from 'react';
import { Shield, User, Award, MapPin, Clock, Phone, Mail, CheckCircle2, Sparkles, Building, ArrowRight, Quote, HeartHandshake, Compass, Printer, ExternalLink, Users, Presentation } from 'lucide-react';
import { CompanyInfo, NavigationPage } from '../types';
import { branchCoreValues } from '../data/company';
import { DigitalBusinessCard } from '../components/common/DigitalBusinessCard';
import { siteImages } from '../assets/images';

interface BranchPageProps {
  companyInfo: CompanyInfo;
  onOpenConsult: () => void;
  onOpenRecruit: () => void;
  onNavigate: (page: NavigationPage) => void;
}

export const BranchPage: React.FC<BranchPageProps> = ({
  companyInfo,
  onOpenConsult,
  onOpenRecruit,
  onNavigate,
}) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/80 border border-blue-800/60 px-3.5 py-1 rounded-full">
            ABOUT BRANCH &amp; LEADER
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {companyInfo.fullName} 소개
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            "고객에게는 신뢰를, 설계사에게는 성장의 기회를 제공하는 금융 컨설팅 전문 조직입니다."
          </p>
        </div>
      </section>

      {/* Leader Profile & Digital Business Card Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Digital Business Card & Photo Slot Area */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">
                OFFICIAL BUSINESS CARD
              </span>
              <h3 className="text-lg font-bold text-slate-900">지점장 공식 모바일 명함</h3>
            </div>

            {/* Embedded Interactive Business Card */}
            <DigitalBusinessCard companyInfo={companyInfo} />

            {/* Additional info badge */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Shield className="w-4 h-4 text-blue-600" />
                <span>금융소비자보호 및 등록 인증 지점</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500">
                HK금융파트너스는 생명보험 및 손해보험 다수 보험사와 제휴된 법인보험대리점(GA)으로, 공정하고 객관적인 비교 분석을 원칙으로 합니다.
              </p>
            </div>
          </div>

          {/* Leader Story & Message */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-800 text-xs font-bold rounded-full">
              <Sparkles className="w-3.5 h-3.5" /> 지점장 {companyInfo.leaderName}의 다짐
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              "보험을 잘 파는 조직보다,<br />
              <span className="text-blue-600">보험을 제대로 설명할 수 있는 조직</span>을 만들겠습니다."
            </h2>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 text-sm text-slate-700 leading-relaxed space-y-3.5">
              <p>
                안녕하십니까. <strong>{companyInfo.fullName} 지점장 {companyInfo.leaderName}</strong>입니다.
              </p>
              <p>
                많은 분들이 보험을 '어렵고 복잡한 금융상품', 또는 '지인의 부탁으로 어쩔 수 없이 가입하는 것'으로 생각하십니다. 
                하지만 보험의 본질은 예기치 못한 인생의 위기 앞에서 고객과 가족의 일상을 든든하게 지켜주는 가장 안전한 경제적 방패입니다.
              </p>
              <p>
                당 지점은 특정 상품의 일방적 가입 권유를 지양하며, 고객의 실제 재정 상황과 가족력에 맞는 
                <strong> 꼭 필요한 보장만을 정직하게 분석</strong>하여 제안합니다.
              </p>
              <p>
                아울러, 보험영업을 새롭게 시작하는 신입 설계사분들이 고립되지 않고 전문 금융인으로 도약할 수 있도록
                <strong> 자격 취득, 1:1 약관 교육, 고객 상담 현장 동행, 디지털 마케팅</strong>까지 체계적으로 함께합니다.
              </p>
            </div>

            {/* 4 Operational Directives */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl text-xs space-y-1">
                <span className="font-bold text-blue-700 block">1. 고객 중심 보험 상담</span>
                <span className="text-slate-600 text-[11px]">가입 강요 없이 객관적 보장분석표 우선 제공</span>
              </div>
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl text-xs space-y-1">
                <span className="font-bold text-indigo-700 block">2. 설계사 교육 및 육성</span>
                <span className="text-slate-600 text-[11px]">기초 이론부터 실전 상담 화법까지 밀착 멘토링</span>
              </div>
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl text-xs space-y-1">
                <span className="font-bold text-emerald-700 block">3. 디지털 마케팅 활용</span>
                <span className="text-slate-600 text-[11px]">블로그, SNS 등 온라인 채널 브랜딩 교육</span>
              </div>
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl text-xs space-y-1">
                <span className="font-bold text-slate-800 block">4. 선배 설계사 현장 동행</span>
                <span className="text-slate-600 text-[11px]">초기 미팅 시 지점장·멘토가 현장에 직접 동행</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Facility & Team Gallery Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold rounded-full border border-blue-400/30">
              SPACE &amp; MEMBERS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {companyInfo.fullName} 현장 시설 &amp; 팀
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              고객을 위한 프라이빗 상담실과 설계사의 성장을 뒷받침하는 첨단 교육 인프라를 갖추고 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Gallery Card 1: Team Photo */}
            <div className="rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 group flex flex-col justify-between">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={siteImages.teamGangnam}
                  alt="HK금융파트너스 목동지점 설계사 팀원"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-xs text-[11px] font-bold text-blue-300 border border-slate-700">
                  <Users className="w-3.5 h-3.5 inline mr-1" /> 지점 패밀리
                </span>
              </div>
              <div className="p-5 space-y-1.5">
                <h4 className="text-sm font-bold text-white">열정과 신뢰를 나누는 파트너십</h4>
                <p className="text-xs text-slate-400">
                  신입부터 베테랑까지 격의 없이 소통하며 함께 성장하는 지점 문화
                </p>
              </div>
            </div>

            {/* Gallery Card 2: Consulting Room */}
            <div className="rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 group flex flex-col justify-between">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={siteImages.consultingRoom}
                  alt="HK금융파트너스 프라이빗 고객 상담실"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-xs text-[11px] font-bold text-emerald-300 border border-slate-700">
                  <Presentation className="w-3.5 h-3.5 inline mr-1" /> 프라이빗 상담실
                </span>
              </div>
              <div className="p-5 space-y-1.5">
                <h4 className="text-sm font-bold text-white">데이터 기반 비교 분석 브리핑</h4>
                <p className="text-xs text-slate-400">
                  대형 모니터와 전산 분석을 통해 고객이 직접 확인하는 투명한 상담
                </p>
              </div>
            </div>

            {/* Gallery Card 3: Mentoring Workshop */}
            <div className="rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 group flex flex-col justify-between">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={siteImages.mentoringSession}
                  alt="설계사 실무 멘토링 세미나 및 교육장"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-xs text-[11px] font-bold text-indigo-300 border border-slate-700">
                  <Sparkles className="w-3.5 h-3.5 inline mr-1" /> 교육 &amp; 멘토링 룸
                </span>
              </div>
              <div className="p-5 space-y-1.5">
                <h4 className="text-sm font-bold text-white">체계적인 신입 실무 교육 세미나</h4>
                <p className="text-xs text-slate-400">
                  약관 분석, 제안서 작성 실습, 온라인 브랜딩 기법 정기 워크숍
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Values Detailed */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">{companyInfo.branch}이 추구하는 가치</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              고객과 설계사가 함께 신뢰를 쌓아가는 3대 운영 철학입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {branchCoreValues.map((val) => (
              <div
                key={val.number}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3"
              >
                <span className="text-xs font-bold text-blue-600 font-mono">VALUE {val.number}</span>
                <h3 className="text-base font-bold text-slate-900">{val.title}</h3>
                <p className="text-xs font-semibold text-blue-800">"{val.subtitle}"</p>
                <p className="text-xs text-slate-600 leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Contact Information */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">
              LOCATION &amp; CONTACT
            </span>
            <h2 className="text-2xl font-bold text-slate-900">사무실 안내 및 오시는 길</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              강남대로 중심지에 위치하여 대중교통 이용이 매우 편리하며, 서울 전역 및 수도권 고객 상담과 설계사 멘토링을 활발히 진행하고 있습니다.
            </p>

            <div className="space-y-3 text-xs text-slate-700 pt-2">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900">사무실 주소</strong>
                  <span>({companyInfo.zipCode || '06123'}) {companyInfo.address} {companyInfo.detailAddress}</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    • 대중교통: 지하철 2호선 / 신분당선 강남역 11번 출구 도보 5분, 9호선 신논현역 6번 출구 도보 3분
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                  <Phone className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">직통 휴대전화 (M.)</strong>
                    <a href={`tel:${companyInfo.mobile || companyInfo.phone}`} className="text-blue-700 hover:underline font-semibold">
                      {companyInfo.mobile || companyInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                  <Building className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">대표 전화 (T.)</strong>
                    <a href={`tel:${companyInfo.tel || '1566-8163'}`} className="text-slate-800 hover:underline">
                      {companyInfo.tel || '1566-8163'}
                    </a>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                  <Printer className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">팩스 (F.)</strong>
                    <span>{companyInfo.fax || '0504-441-8554'}</span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">이메일 (E.)</strong>
                    <a href={`mailto:${companyInfo.email}`} className="text-blue-700 hover:underline">
                      {companyInfo.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900">상담 운영 시간</strong>
                  <span>{companyInfo.consultHours}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900 text-white space-y-6">
            <h3 className="text-lg font-bold text-white">상담 및 지원 문의</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              보험 증권 점검이 필요하신 고객님 또는 설계사 지원을 고민하시는 분 모두 부담 없이 {companyInfo.leaderName} 지점장과 1:1 상담을 나누실 수 있습니다.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={onOpenConsult}
                className="py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition text-center cursor-pointer"
              >
                고객 무료 상담 신청
              </button>
              <button
                onClick={onOpenRecruit}
                className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition text-center cursor-pointer"
              >
                설계사 지원 상담 신청
              </button>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400">
              <div className="flex items-center justify-between">
                <span>지점장 직통 연결:</span>
                <a href={`tel:${companyInfo.mobile || companyInfo.phone}`} className="text-blue-400 font-bold hover:underline">
                  {companyInfo.mobile || companyInfo.phone}
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span>사무실 대표 전화:</span>
                <span className="text-slate-300 font-medium">{companyInfo.tel || '1566-8163'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

