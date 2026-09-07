import React from 'react';
import { Briefcase, CheckCircle2, ArrowRight, Sparkles, Users, Award, ShieldCheck, HelpCircle } from 'lucide-react';
import { CompanyInfo } from '../../types';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { siteImages } from '../../assets/images';

interface RecruitHubPageProps {
  companyInfo: CompanyInfo;
  onNavigate: (path: string) => void;
  onOpenRecruit: () => void;
}

export const RecruitHubPage: React.FC<RecruitHubPageProps> = ({
  companyInfo,
  onNavigate,
  onOpenRecruit,
}) => {
  const recruitBenefits = [
    {
      num: '01',
      title: '시험 비용 지원',
      desc: '손해보험·생명보험 등록 자격시험 응시 수수료와 필수 핵심 교재비를 지점에서 100% 실비 지원합니다.',
      path: '/recruit/support',
    },
    {
      num: '02',
      title: '체계적인 교육 지원',
      desc: '금융 기초 개념부터 다수 보험사 전산 입력, 상품 약관 비교, 화법 실습까지 단계별 커리큘럼을 제공합니다.',
      path: '/recruit/support',
    },
    {
      num: '03',
      title: '1:1 맞춤 설계 지원',
      desc: '고객 상황별 제안서 작성 시 지점장 및 수석 매니저가 담보 구성과 가성비를 함께 크로스체크합니다.',
      path: '/recruit/support',
    },
    {
      num: '04',
      title: '베테랑 설계사 상담 동행',
      desc: '영업 초보자도 안심할 수 있도록, 첫 고객 대면 미팅 시 선배 설계사가 현장에 직접 동행하여 실전을 돕습니다.',
      path: '/recruit/support',
    },
  ];

  const targetAudience = [
    {
      title: '보험설계사를 처음 준비하는 분',
      desc: '금융 지식이나 영업 경험이 전혀 없어도 기초부터 차근차근 배우며 시작할 수 있습니다.',
    },
    {
      title: '영업이 처음이라 두려운 분',
      desc: '지인 영업을 강요하지 않으며, 체계적인 고객 발굴과 전문 상담 기술을 전수합니다.',
    },
    {
      title: '혼자 일하기보다 팀의 지원을 바라는 분',
      desc: '어려운 전산 처리와 현장 미팅 시 든든한 선배 멘토가 항상 함께 호흡합니다.',
    },
    {
      title: '정년 없는 새로운 전문직에 도전하는 분',
      desc: '경력 단절이나 새로운 진로를 모색하는 분들에게 성장의 발판을 제공합니다.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Breadcrumb
        items={[
          { name: '홈', path: '/' },
          { name: '설계사 지원' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Header Banner */}
      <header className="relative bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 text-xs font-bold border border-indigo-800">
            CAREER ROADMAP · 목동 보험설계사 지원
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
            보험설계사 지원
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl mx-auto leading-relaxed font-normal">
            보험설계사를 처음 시작하는 분들이 고립되지 않고 안정적으로 정착할 수 있도록 체계적인 육성을 지원합니다. HK금융파트너스 경인사업본부 목동지점은 서울 목동을 기반으로 하는 보험 상담 지점으로서, 자격시험 비용 지원부터 기초 입문 교육, 30여 개 보험사 1:1 비교설계 실무, 베테랑 선배의 현장 상담 동행까지 4대 정착 시스템을 완비하고 있습니다. 보험 상담이 필요한 고객에게 신뢰를 전할 예비 금융 전문가의 도전을 응원합니다.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-2 text-xs text-indigo-300">
            <span className="bg-indigo-950/70 px-2.5 py-1 rounded-md border border-indigo-800/60 font-medium">
              WHO: HK금융파트너스 목동지점
            </span>
            <span className="bg-indigo-950/70 px-2.5 py-1 rounded-md border border-indigo-800/60 font-medium">
              WHERE: 서울 목동 설계사 지원센터
            </span>
            <span className="bg-indigo-950/70 px-2.5 py-1 rounded-md border border-indigo-800/60 font-medium">
              WHAT: 시험지원·실무교육·현장동행
            </span>
            <span className="bg-indigo-950/70 px-2.5 py-1 rounded-md border border-indigo-800/60 font-medium">
              WHO FOR: 신입·경력 금융설계사 지망생
            </span>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenRecruit}
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/30"
            >
              <Briefcase className="w-4 h-4" />
              <span>설계사 지원 문의</span>
            </button>
            <button
              onClick={() => onNavigate('/recruit/process')}
              className="w-full sm:w-auto px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition cursor-pointer"
            >
              지원 프로세스 보기
            </button>
            <button
              onClick={() => onNavigate('/recruit/support')}
              className="w-full sm:w-auto px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition cursor-pointer"
            >
              4대 지원 시스템 보기
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Core 4 Benefits Grid */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              CORE 4 SUPPORTS
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">
              목동지점의 4대 실무 지원
            </h2>
            <p className="text-xs text-slate-600">
              신입 설계사가 현장에서 고립되지 않도록 실질적인 혜택을 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {recruitBenefits.map((item) => (
              <div
                key={item.num}
                onClick={() => onNavigate(item.path)}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-indigo-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <span className="font-mono text-sm font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                    SUPPORT {item.num}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                  <span>자세히 보기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Who Should Apply */}
        <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-900">이런 분께 추천합니다</h2>
            <p className="text-xs text-slate-500 mt-1">
              보험 경험 유무와 상관없이 성실함과 배움의 열정을 가지신 분이라면 누구나 환영합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {targetAudience.map((target, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5"
              >
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                  <span>{target.title}</span>
                </div>
                <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                  {target.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Story & Practical Q&A Callout */}
        <section className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-7 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-indigo-700 bg-white px-2.5 py-1 rounded-md border border-indigo-200">
              PRACTICAL FAQ
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              초보 설계사가 가장 궁금해하는 질문들
            </h3>
            <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
              보험설계사가 실제로 어떤 일을 하는지, 시험 준비는 어떻게 하는지, 첫 고객 상담은 어떻게 준비하는지 정리했습니다.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/recruit/story')}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>설계사 이야기 읽기</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </section>

        {/* Compliance Notice */}
        <div className="p-4 bg-slate-100 rounded-xl text-[11px] text-slate-500 leading-relaxed">
          <strong>채용 공지 준법 사항:</strong> HK금융파트너스는 공정하고 투명한 위촉 기준을 준수합니다. 본 안내는 지원자의 이해를 돕기 위한 일반적 업무 소개이며, 특정 소득이나 합격률을 확정 보장하지 않습니다. 위촉 조건 및 수수료 지급 규정은 관련 법령 및 회사 내부 규정에 따릅니다.
        </div>
      </div>
    </div>
  );
};
