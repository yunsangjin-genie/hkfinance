import React from 'react';
import { ShieldCheck, Briefcase, CheckCircle2, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { NavigationPage } from '../../types';
import { siteImages } from '../../assets/images';

interface TwoTrackServiceSectionProps {
  onOpenConsult: (category?: string) => void;
  onOpenRecruit: () => void;
  onNavigate: (page: NavigationPage) => void;
}

export const TwoTrackServiceSection: React.FC<TwoTrackServiceSectionProps> = ({
  onOpenConsult,
  onOpenRecruit,
  onNavigate,
}) => {
  const customerServices = [
    { title: '보험 보장분석', desc: '현재 가입된 보험의 중복 및 사각지대 정밀 진단' },
    { title: '실손보험 상담', desc: '1~3세대 구 실손과 4세대 실손 비교 및 전환 가이드' },
    { title: '건강보험 상담', desc: '일상 질환, 수술비, 입원일당 종합 포트폴리오' },
    { title: '암·3대질병 상담', desc: '암·뇌혈관·허혈성심장질환 집중 진단비 구성' },
    { title: '연금보험 상담', desc: '안정적인 노후 자금 및 연말정산 세제 혜택' },
    { title: '화재·재산보험 상담', desc: '주택 및 사업장 화재, 배상책임 위험 방어' },
  ];

  const recruitServices = [
    { title: '시험 비용 지원', desc: '손해보험·생명보험 자격시험 교재 및 응시료 지원' },
    { title: '체계적인 실무 교육', desc: '기초 상품 이론부터 고객 상담 화법까지 단계별 교육' },
    { title: '보험 설계 지원', desc: '고객 맞춤 제안서 작성을 위한 선배·지점장 공동 검토' },
    { title: '베테랑 설계사 동행', desc: '초기 고객 상담 현장 1:1 동행 및 실전 노하우 전수' },
    { title: '고객 상담 실무 지원', desc: '디지털 마케팅, 블로그 콘텐츠를 통한 고객 유입 노하우' },
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100/70 text-blue-800 text-xs font-bold rounded-full">
            <Sparkles className="w-3.5 h-3.5" /> 맞춤형 2-Track 서비스
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            어떤 도움이 필요하신가요?
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            보험 가입 및 점검을 원하는 <strong>고객</strong>과 새로운 커리어를 시작하려는 <strong>예비 설계사</strong>를 위한 맞춤형 서비스를 제공합니다.
          </p>
        </div>

        {/* 2 Big Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* CARD A: Customer Consulting */}
          <div className="relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
            {/* Visual Photo Header */}
            <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100">
              <img
                src={siteImages.consultingAnalysis}
                alt="고객 맞춤 태블릿 보장분석 및 보험 포트폴리오 상담"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-blue-600/90 text-white backdrop-blur-xs flex items-center gap-1.5 shadow-md">
                  <ShieldCheck className="w-3.5 h-3.5" /> 고객 맞춤 보장 컨설팅
                </span>
              </div>
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <p className="text-xs font-medium text-blue-200">1:1 객관적 점검</p>
                <h4 className="text-lg font-bold">정직하고 투명한 보험 보장분석</h4>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-1 space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  보험이 궁금하신가요?
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  현재 가입한 보험을 점검하고, 가족과 나에게 꼭 필요한 보장에 대해 객관적이고 친절한 상담을 받아보세요.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  제공하는 주요 상담 서비스
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {customerServices.map((item) => (
                    <div
                      key={item.title}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-left hover:bg-blue-50/40 transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        <span className="text-xs font-bold text-slate-800">{item.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 pl-6 leading-tight">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions for Card A */}
            <div className="p-6 sm:p-8 pt-0 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onOpenConsult('보험 전체 점검')}
                className="w-full sm:flex-1 py-3.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>보험 상담 신청하기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('consulting')}
                className="w-full sm:w-auto py-3.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs sm:text-sm transition text-center cursor-pointer"
              >
                보장분석 과정 보기
              </button>
            </div>
          </div>

          {/* CARD B: Insurance Planner Recruiting */}
          <div className="relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
            {/* Visual Photo Header */}
            <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100">
              <img
                src={siteImages.mentoringSession}
                alt="신입 및 경력 보험설계사 1:1 멘토링 및 실무 교육 워크숍"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-indigo-600/90 text-white backdrop-blur-xs flex items-center gap-1.5 shadow-md">
                  <Briefcase className="w-3.5 h-3.5" /> 설계사 커리어 플랫폼
                </span>
              </div>
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <p className="text-xs font-medium text-indigo-200">성장 중심 지점 문화</p>
                <h4 className="text-lg font-bold">기초 교육부터 실전 동행까지 원스톱 지원</h4>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-1 space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  보험설계사로 새로운 시작을 원하시나요?
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  처음 시작하는 분도 단계적으로 보험설계사 업무를 배우고 현장에서 안정적으로 자리잡을 수 있도록 지원합니다.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  지점 신입 설계사 5대 핵심 지원
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {recruitServices.map((item) => (
                    <div
                      key={item.title}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-left hover:bg-indigo-50/40 transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                        <span className="text-xs font-bold text-slate-800">{item.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 pl-6 leading-tight">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions for Card B */}
            <div className="p-6 sm:p-8 pt-0 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={onOpenRecruit}
                className="w-full sm:flex-1 py-3.5 px-4 bg-slate-900 hover:bg-slate-800 active:bg-black text-white font-bold rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Briefcase className="w-4 h-4 text-indigo-400" />
                <span>설계사 지원하기</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => onNavigate('recruitment')}
                className="w-full sm:w-auto py-3.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs sm:text-sm transition text-center cursor-pointer"
              >
                지원 혜택 &amp; 성장과정
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

