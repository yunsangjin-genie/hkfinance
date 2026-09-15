import React from 'react';
import { Briefcase, CheckCircle2, ArrowRight, HelpCircle, Clock, BookOpen, Users, Award, ShieldCheck } from 'lucide-react';
import { Breadcrumb } from '../../components/common/Breadcrumb';

interface RecruitProcessPageProps {
  onNavigate: (path: string) => void;
  onOpenRecruit: () => void;
}

export const RecruitProcessPage: React.FC<RecruitProcessPageProps> = ({
  onNavigate,
  onOpenRecruit,
}) => {
  const processSteps = [
    {
      step: '01',
      title: '상담 및 지원 (1:1 면담)',
      duration: '약 1~2일',
      desc: '부담 없이 지점을 방문하거나 유선으로 지점장과 1:1 상담을 진행합니다. 지원자의 상황과 희망하는 진로를 경청하고, 보험 설계사 업무와 지점의 지원 시스템을 투명하게 안내합니다.',
      points: ['업무 환경 및 적성 탐색', '지점 문화 및 육성 철학 소개', '궁금한 점 질의응답'],
    },
    {
      step: '02',
      title: '보험설계사 자격시험 준비',
      duration: '약 1~2주',
      desc: '생명보험협회 및 손해보험협회 주관 등록 자격시험을 준비합니다. 목동지점의 요점 정리 교재와 기출문제 풀이 특강을 제공하며, 시험 응시료를 전액 지원합니다.',
      points: ['손해보험 / 생명보험 등록 시험 대비', '시험 응시 수수료 100% 실비 지원', '합격률 높은 핵심 기출 요약집 제공'],
    },
    {
      step: '03',
      title: '체계적인 기초 이론 및 금융 교육',
      duration: '약 2주',
      desc: '시험 합격 후 금융소비자보호법, 보험의 기본 원리, 주요 상품(실손, 건강, 암, 종신, 연금)의 약관 분석과 세무 기초를 체계적으로 학습합니다.',
      points: ['약관 읽는 법 및 보장 범위 분석', '금융소비자보호법 준법 교육', '고객 니즈 파악 및 커뮤니케이션 기법'],
    },
    {
      step: '04',
      title: '보험 비교설계 전산 실무 훈련',
      duration: '약 1~2주',
      desc: '다수 제휴 보험사의 비교 전산 시스템 사용법을 익히고, 실제 보장분석표와 맞춤형 제안서를 작성하는 시뮬레이션 실습을 진행합니다.',
      points: ['GA 통합 비교설계 전산 마스터', '고객 보장분석 리포트 작성 실습', '지점장 1:1 제안서 크로스 피드백'],
    },
    {
      step: '05',
      title: '베테랑 설계사 고객 상담 현장 동행',
      duration: '초기 3~5회 미팅',
      desc: '첫 고객 대면 미팅 시 혼자 보내지 않습니다. 지점장이나 10년 차 이상 베테랑 선배가 현장에 함께 동행하여 상담을 보좌하고 실전 노하우를 전수합니다.',
      points: ['상담 전 브리핑 및 고객 성향 분석', '현장 상담 프로세스 참관 및 보조', '미팅 종료 후 즉각적인 피드백'],
    },
    {
      step: '06',
      title: '실전 경험 축적 및 독립 전문직 안착',
      duration: '지속적 성장 지원',
      desc: '스스로 고객을 발굴하고 상담을 주도할 수 있도록 지속적인 시장 정보, 법인/세무 특화 교육, 디브리핑 세션을 제공하여 자립형 금융 전문가로 성장합니다.',
      points: ['정기 스터디 및 최신 판례·약관 연구', '원하는 근무 일정 자율 관리', '장기적인 커리어 로드맵 구축'],
    },
  ];

  const faqs = [
    {
      q: '보험설계사 시험 난이도는 어느 정도인가요?',
      a: '보험설계사 시험은 절대평가로 60점 이상 득점 시 합격합니다. 지점에서 제공하는 기출문제와 핵심 요점 강의를 1~2주 정도 성실히 학습하시면 비전공자도 무리 없이 합격하실 수 있습니다.',
    },
    {
      q: '교육 기간 중에도 출근이나 시간 조율이 가능한가요?',
      a: '목동지점은 지원자의 현재 상황(육아, 겸업, 이직 준비 등)에 맞추어 온·오프라인 병행 교육 및 맞춤형 시간표를 협의하여 진행합니다.',
    },
    {
      q: '첫 고객 미팅 시 정말 선배가 동행해 주나요?',
      a: '네, 목동지점의 가장 확고한 원칙 중 하나입니다. 초보 설계사가 고객 앞에서 당황하지 않고 신뢰를 줄 수 있도록 선배 설계사가 현장 미팅에 직접 동행합니다.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Breadcrumb
        items={[
          { name: '홈', path: '/' },
          { name: '설계사 지원', path: '/recruit' },
          { name: '지원 프로세스' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Header Banner */}
      <header className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 text-xs font-bold border border-indigo-800">
            STEP-BY-STEP ROADMAP · 목동 설계사 프로세스
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            설계사 지원 프로세스
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl mx-auto leading-relaxed font-normal">
            지원 상담부터 자격시험 준비, 기초 입문 교육, 실습, 현장 동행, 전문 설계사 안착까지 6단계 로드맵을 안내합니다. HK금융파트너스 경인사업본부 목동지점은 초보자도 안심하고 성장할 수 있는 실질적인 지원 체계를 갖추고 있습니다. 보험 상담이 필요한 고객에게 정직한 설계를 전달할 설계사 지망생을 환영합니다.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-2 text-xs text-indigo-300">
            <span className="bg-indigo-950/70 px-2.5 py-1 rounded-md border border-indigo-800/60 font-medium">
              WHO: HK금융파트너스 목동지점
            </span>
            <span className="bg-indigo-950/70 px-2.5 py-1 rounded-md border border-indigo-800/60 font-medium">
              WHERE: 강남구 역삼동 708-33 파라다이스 밴처타워 6층
            </span>
            <span className="bg-indigo-950/70 px-2.5 py-1 rounded-md border border-indigo-800/60 font-medium">
              WHAT: 6단계 안착 로드맵
            </span>
            <span className="bg-indigo-950/70 px-2.5 py-1 rounded-md border border-indigo-800/60 font-medium">
              WHO FOR: 입문 희망 예비 설계사
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* 6 Steps Timeline */}
        <section className="space-y-6">
          {processSteps.map((st) => (
            <div
              key={st.step}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 font-mono font-extrabold text-base flex items-center justify-center shrink-0">
                  {st.step}
                </div>
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900">{st.title}</h2>
                    <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                      소요 기간: {st.duration}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                    {st.desc}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2">
                    {st.points.map((pt, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3 text-indigo-600" />
                        <span>{pt}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* FAQs */}
        <section className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <span>지원 프로세스 관련 자주 묻는 질문</span>
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  Q. {faq.q}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Action Button */}
        <section className="text-center pt-2">
          <button
            onClick={onOpenRecruit}
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 mx-auto cursor-pointer"
          >
            <Briefcase className="w-4 h-4" />
            <span>설계사 지원 상담 신청하기</span>
          </button>
        </section>
      </div>
    </div>
  );
};
