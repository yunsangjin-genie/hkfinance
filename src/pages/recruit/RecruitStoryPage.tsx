import React from 'react';
import { Briefcase, HelpCircle, CheckCircle2, ArrowRight, BookOpen, Lightbulb, Users } from 'lucide-react';
import { Breadcrumb } from '../../components/common/Breadcrumb';

interface RecruitStoryPageProps {
  onNavigate: (path: string) => void;
  onOpenRecruit: () => void;
}

export const RecruitStoryPage: React.FC<RecruitStoryPageProps> = ({
  onNavigate,
  onOpenRecruit,
}) => {
  const practicalGuides = [
    {
      q: '1. 보험설계사는 실제로 어떤 일을 할까?',
      summary: '보험상품을 판매하는 것을 넘어, 고객의 인생에서 발생할 수 있는 경제적 위험을 분석하고 지켜주는 금융 안전망 설계자입니다.',
      details: [
        '많은 분들이 보험설계사를 단순히 "보험을 파는 사람"으로 생각하지만, 실제 업무의 핵심은 "고객의 현재 상황과 보장을 꼼꼼히 점검하는 것"입니다.',
        '고객이 가입한 기존 보험 증권을 분석하여 불필요하게 새어나가는 보험료를 줄여드리고, 질병이나 상해 발생 시 치료비와 생활비 공백을 방어하는 보장 구조를 만듭니다.',
        '또한 사고나 질병 발생 시 복잡한 보험금 청구 절차를 대행하고 필요한 서류를 챙겨드리는 평생의 금융 파트너 역할을 수행합니다.',
      ],
    },
    {
      q: '2. 보험설계사를 처음 시작할 때 준비할 것은 무엇인가요?',
      summary: '특별한 자격이나 거창한 금융 지식보다는, 고객의 입장에서 생각하는 공감 능력과 성실한 배움의 자세가 가장 중요합니다.',
      details: [
        '전공이나 나이, 이전 경력은 크게 중요하지 않습니다. 실제로 목동지점에는 주부, 직장인 출신, 자영업자 등 다양한 배경을 가진 분들이 활동하고 있습니다.',
        '처음 시작할 때 가장 필요한 것은 "매일 새로운 약관과 지식을 학습하려는 성실함"과 "고객의 상황을 진심으로 경청하는 태도"입니다.',
        '어려운 법률, 세무, 전산 입력 등은 지점에서 단계별로 완벽하게 교육해 드리므로 걱정하지 않으셔도 됩니다.',
      ],
    },
    {
      q: '3. 보험설계사 자격시험은 어떻게 준비할까요?',
      summary: '손해보험협회와 생명보험협회에서 주관하는 등록 시험으로, 지점의 기출 요약집으로 1~2주간 집중 학습하면 충분히 합격할 수 있습니다.',
      details: [
        '시험은 4지선다형 객관식 필기시험이며, 100점 만점 중 60점 이상을 획득하면 합격합니다.',
        '보험의 기초 원리, 보험 계약법, 금융소비자보호법, 상품별 기초 지식 등이 출제됩니다.',
        '목동지점에서는 빈출 기출문제집과 모바일 모의고사 링크를 제공하며, 지점장이 직접 1:1 요점 과외를 진행하여 첫 시험에서 높은 합격률을 달성하도록 돕습니다.',
      ],
    },
    {
      q: '4. 보험영업을 처음 시작하면 무엇부터 배울까요?',
      summary: '지인에게 연락하는 것이 아니라, 먼저 "약관을 정확히 읽고 고객의 기존 보험을 분석하는 기술"부터 배웁니다.',
      details: [
        '목동지점은 초보자에게 무리한 지인 영업을 강요하지 않습니다. 지인에게 신뢰를 주려 해도 내가 먼저 전문가가 되어야 하기 때문입니다.',
        '따라서 입문 초기에는 실손보험 약관, 암 진단비의 범위, 수술비 종수술 분류 등 기초적인 보장 분석 기법과 제안서 전산 작성법을 철저히 익힙니다.',
        '내가 먼저 보험의 가치와 원리를 명확히 이해했을 때, 비로소 자신감 있는 상담이 가능해집니다.',
      ],
    },
    {
      q: '5. 첫 고객 상담은 어떻게 준비할까요?',
      summary: '혼자 보내지 않습니다. 사전 시뮬레이션 후 선배 설계사가 고객 미팅에 직접 동행합니다.',
      details: [
        '첫 상담 약속이 잡히면 지점 매니저와 함께 고객의 연령, 직업, 가족력, 기가입 보험을 사전에 분석하고 브리핑 자료를 만듭니다.',
        '실제 미팅 현장에는 베테랑 선배 설계사가 동행하여 고객의 질문에 전문적인 답변을 보좌하고, 신입 설계사는 현장의 상담 흐름과 라포 형성 기술을 직접 체득합니다.',
        '미팅 후에는 무엇이 좋았고 어떤 점을 보완해야 하는지 즉각적인 디브리핑을 진행하여 빠르게 실전 감각을 키워나갑니다.',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Breadcrumb
        items={[
          { name: '홈', path: '/' },
          { name: '설계사 지원', path: '/recruit' },
          { name: '설계사 이야기' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Header Banner */}
      <header className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 text-xs font-bold border border-indigo-800">
            BEGINNER'S PRACTICAL GUIDE · 목동 설계사 시작 가이드
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            설계사 시작 가이드
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl mx-auto leading-relaxed font-normal">
            보험설계사를 시작하려는 분들이 가장 궁금해하는 시험 준비, 교육 기간, 실무 현장에 대한 솔직한 실무 Q&A를 안내합니다. HK금융파트너스 경인사업본부 목동지점은 서울 목동을 기반으로 하는 보험 상담 지점으로서, 투명하고 정직한 정보로 새로운 금융 커리어의 첫걸음을 돕습니다. 보험 상담이 필요한 고객과 보험설계사를 시작하려는 사람을 위한 진솔한 지침서입니다.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-2 text-xs text-indigo-300">
            <span className="bg-indigo-950/70 px-2.5 py-1 rounded-md border border-indigo-800/60 font-medium">
              WHO: HK금융파트너스 목동지점
            </span>
            <span className="bg-indigo-950/70 px-2.5 py-1 rounded-md border border-indigo-800/60 font-medium">
              WHERE: 서울 목동 지점
            </span>
            <span className="bg-indigo-950/70 px-2.5 py-1 rounded-md border border-indigo-800/60 font-medium">
              WHAT: 실무 현실 Q&A & 정착 노하우
            </span>
            <span className="bg-indigo-950/70 px-2.5 py-1 rounded-md border border-indigo-800/60 font-medium">
              WHO FOR: 진로 고민 중인 예비 설계사
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {practicalGuides.map((guide, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs space-y-4"
          >
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 font-mono font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                Q{idx + 1}
              </span>
              <h2 className="text-lg font-bold text-slate-900 leading-snug">
                {guide.q}
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs sm:text-sm font-semibold text-indigo-950 leading-relaxed">
              "{guide.summary}"
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed pl-1 sm:pl-4">
              {guide.details.map((p, pIdx) => (
                <p key={pIdx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-2" />
                  <span>{p}</span>
                </p>
              ))}
            </div>
          </div>
        ))}

        {/* Action Callout */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 text-center space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold">
            더 궁금한 점이 있으신가요?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            언제든지 편안하게 지점의 문을 두드려 주세요. 커피 한 잔과 함께 진솔한 대화를 나누실 수 있습니다.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenRecruit}
              className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              <Briefcase className="w-4 h-4" />
              <span>지점장 1:1 상담 문의</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
