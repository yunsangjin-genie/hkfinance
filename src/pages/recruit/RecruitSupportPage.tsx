import React from 'react';
import {
  Briefcase,
  Coins,
  GraduationCap,
  FileCheck2,
  Users2,
  Laptop,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { siteImages } from '../../assets/images';

interface RecruitSupportPageProps {
  onNavigate: (path: string) => void;
  onOpenRecruit: () => void;
}

export const RecruitSupportPage: React.FC<RecruitSupportPageProps> = ({
  onNavigate,
  onOpenRecruit,
}) => {
  const supportSystems = [
    {
      num: '01',
      title: '자격시험 비용 100% 지원',
      category: 'FEE SUPPORT',
      icon: Coins,
      highlight: '시작하는 분들의 경제적 부담을 덜어드립니다.',
      description:
        '보험설계사로 활동하기 위해 필수적인 손해보험협회 및 생명보험협회 주관 등록 자격시험의 응시 수수료(재응시 포함)와 합격 대비 최신 기출 교재비를 지점에서 전액 지원합니다.',
      features: [
        '손해보험 및 생명보험 등록 시험 응시료 전액 실비 지원',
        '핵심 요약 정리 교재 및 최신 기출문제 무료 제공',
        '온·오프라인 시험 대비 모의테스트 지원',
      ],
    },
    {
      num: '02',
      title: '체계적인 1:1 맞춤 교육 시스템',
      category: 'EDUCATION',
      icon: GraduationCap,
      highlight: '비전공자도 전문가로 거듭나는 단계별 커리큘럼.',
      description:
        '단순 주입식 암기가 아닌, 고객의 관점에서 보험 약관을 해석하고 실질적인 보장 설계를 진행할 수 있는 실무 중심 금융 교육을 제공합니다.',
      features: [
        '기초 금융 상식부터 복잡한 질병·상해 약관 분석 실습',
        '고객 상황별 맞춤 상담 화법 및 커뮤니케이션 훈련',
        '금융소비자보호법 및 필수 컴플라이언스 준법 교육',
      ],
    },
    {
      num: '03',
      title: 'GA 통합 비교설계 & 제안서 전산 지원',
      category: 'DESIGN SYSTEM',
      icon: FileCheck2,
      highlight: '제안서 작성이 막막할 때 지점이 함께 검토합니다.',
      description:
        '국내 30여 개 주요 생명·손해보험사의 전산을 한눈에 비교할 수 있는 통합 솔루션을 제공하며, 고객 제출 전 지점장과 전문 설계 매니저가 제안서의 완성도를 꼼꼼히 점검해 드립니다.',
      features: [
        '다수 보험사 상품 실시간 비교 견적 전산 솔루션 제공',
        '고객 맞춤형 1:1 보장분석표 자동 생성 툴 지원',
        '초기 제안서 작성 시 담보 누락 및 가성비 크로스체크',
      ],
    },
    {
      num: '04',
      title: '베테랑 설계사 고객 상담 현장 동행',
      category: 'MENTORING',
      icon: Users2,
      highlight: '첫 고객 미팅, 두려워하지 마세요. 선배가 함께합니다.',
      description:
        '신입 설계사가 가장 큰 부담을 느끼는 첫 대면 상담 시, 지점장 또는 10년 차 이상 베테랑 선배 설계사가 미팅 현장에 동행하여 상담을 매끄럽게 이끌고 실전 대응력을 길러줍니다.',
      features: [
        '미팅 전 고객 프로필 분석 및 상담 전략 사전 수립',
        '현장에서 발생하는 까다로운 질문 실시간 서포트',
        '미팅 완료 후 피드백을 통한 단계적 자신감 확보',
      ],
    },
    {
      num: '05',
      title: '지점 인프라 및 디지털 영업 도구 제공',
      category: 'INFRASTRUCTURE',
      icon: Laptop,
      highlight: '활동에만 집중할 수 있는 쾌적한 비즈니스 환경.',
      description:
        '지하철 오목교역 인근에 위치한 쾌적한 지점 오피스 공간, 개별 업무 데스크, 고객 접견용 회의실, 전용 프린터 및 모바일 디지털 명함을 무상 제공합니다.',
      features: [
        '목동역·오목교역 역세권 지점 시설 및 상담 룸 완비',
        '개인별 모바일 디지털 명함 및 온라인 소개 페이지 지원',
        '고객 설명용 전문 브로슈어 및 보장 안내 자료 제공',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Breadcrumb
        items={[
          { name: '홈', path: '/' },
          { name: '설계사 지원', path: '/recruit' },
          { name: '지원 시스템' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Header Banner */}
      <header className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 text-xs font-bold border border-indigo-800">
            TOTAL SUPPORT SYSTEM · 목동 설계사 지원 체계
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            설계사 지원 시스템
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl mx-auto leading-relaxed font-normal">
            신입 설계사가 겪는 자격시험 부담, 상품 학습, 비교설계, 첫 고객 상담의 어려움을 해소하는 목동지점만의 지원 체계를 안내합니다. HK금융파트너스 경인사업본부 목동지점은 서울 목동을 기반으로 실무 중심의 밀착 멘토링을 제공합니다. 보험 상담이 필요한 고객과 보험설계사를 시작하려는 사람 모두에게 실질적인 성장 인프라를 제공합니다.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-2 text-xs text-indigo-300">
            <span className="bg-indigo-950/70 px-2.5 py-1 rounded-md border border-indigo-800/60 font-medium">
              WHO: HK금융파트너스 목동지점
            </span>
            <span className="bg-indigo-950/70 px-2.5 py-1 rounded-md border border-indigo-800/60 font-medium">
              WHERE: 서울 목동 지점
            </span>
            <span className="bg-indigo-950/70 px-2.5 py-1 rounded-md border border-indigo-800/60 font-medium">
              WHAT: 시험비용·1:1비교설계·상담동행
            </span>
            <span className="bg-indigo-950/70 px-2.5 py-1 rounded-md border border-indigo-800/60 font-medium">
              WHO FOR: 안착을 원하는 금융설계사
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Support Cards */}
        <div className="space-y-6">
          {supportSystems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-indigo-600 tracking-wider">
                        {item.category} · {item.num}
                      </span>
                      <h2 className="text-xl font-bold text-slate-900">{item.title}</h2>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs sm:text-sm font-semibold text-slate-800">
                    "{item.highlight}"
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="text-xs font-bold text-slate-800 block">
                      주요 지원 혜택:
                    </span>
                    <div className="space-y-1.5">
                      {item.features.map((feat, idx) => (
                        <p
                          key={idx}
                          className="text-xs text-slate-600 flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                          <span>{feat}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Box */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 text-center space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold">
            목동지점에서 함께 성장할 준비가 되셨나요?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            궁금한 점이 있으시다면 편안한 마음으로 지점을 방문하시거나 유선 상담을 신청해 주세요.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenRecruit}
              className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              <Briefcase className="w-4 h-4" />
              <span>설계사 지원 문의하기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
