import React from 'react';
import {
  HeartHandshake,
  Activity,
  ShieldAlert,
  Stethoscope,
  ShieldCheck,
  Coins,
  Building2,
  ArrowRight,
  HelpCircle,
  FileSearch,
} from 'lucide-react';
import { Breadcrumb } from '../../components/common/Breadcrumb';

interface InsuranceHubPageProps {
  onNavigate: (path: string) => void;
  onOpenConsult: (category?: string) => void;
}

export const InsuranceHubPage: React.FC<InsuranceHubPageProps> = ({
  onNavigate,
  onOpenConsult,
}) => {
  const insuranceCategories = [
    {
      id: 'silson',
      path: '/insurance/silson',
      title: '실손의료보험 (실비)',
      icon: Stethoscope,
      badge: '국민 기본 의료비 보장',
      desc: '입원 및 통원 시 실제 발생한 급여 본인부담금과 비급여 의료비 보장. 4세대 실손의 장단점 및 세대별 전환 여부 비교.',
      keyPoints: ['급여/비급여 자기부담금 구조', '비급여 이용량 할증 제도 이해', '기존 구 실손 대비 보험료 차이 분석'],
    },
    {
      id: 'health',
      path: '/insurance/health',
      title: '종합 건강보험',
      icon: Activity,
      badge: '진단비·수술비·입원비',
      desc: '일상 질환부터 중대 질병 수술비까지 단계별 의료 안전망 구축. 가족력과 연령에 맞춘 최적 특약 조합 검토.',
      keyPoints: ['주요 질환 수술비 특약 폭 점검', '비갱신형 구조를 통한 장기 유지성', '상해·질병 입원 및 간병비 지원'],
    },
    {
      id: 'cancer',
      path: '/insurance/cancer',
      title: '암·3대질병 보험',
      icon: ShieldAlert,
      badge: '치료비 부담 큰 중대질환',
      desc: '한국인 주요 질환인 암, 뇌혈관질환, 허혈성 심장질환 집중 케어. 표적항암 및 신의료기술 특약 반영 여부 확인.',
      keyPoints: ['일반암 vs 유사암 보장 범위', '뇌출혈 대비 넓은 뇌혈관질환 진단비', '급성심근경색 대비 심혈관질환 특약'],
    },
    {
      id: 'whole-life',
      path: '/insurance/whole-life',
      title: '종신보험',
      icon: ShieldCheck,
      badge: '평생 사망보장 & 자산보호',
      desc: '가장의 예기치 못한 유고 시 남겨진 가족을 위한 든든한 보호막. 상속세 재원 마련 및 유가족 생활 자금 설계.',
      keyPoints: ['평생 사망보험금 지급 구조', '상속 및 증여 플랜 연계', '정기보험과의 비용 효율 비교'],
    },
    {
      id: 'life',
      path: '/insurance/life',
      title: '생명·정기보험',
      icon: HeartHandshake,
      badge: '가족 부양 집중 기간 보장',
      desc: '자녀가 독립할 때까지 경제활동 집중 기간 동안 합리적인 비용으로 고액의 유고 위험을 방어하는 실속형 보장.',
      keyPoints: ['자녀 독립 시기까지 집중 보장', '종신보험 대비 가성비 높은 보험료', '체감형/체증형 수령 방식 검토'],
    },
    {
      id: 'pension',
      path: '/insurance/pension',
      title: '연금 및 노후준비보험',
      icon: Coins,
      badge: '은퇴 이후 소득 파이프라인',
      desc: '국민연금을 보완하는 3층 연금 체계 구축. 연말정산 세액공제형 연금저축과 비과세 연금보험 비교 안내.',
      keyPoints: ['세액공제형 vs 10년 비과세형 선택', '공시이율형 vs 변액형 리스크 점검', '종신/확정 연금 수령 개시 연령 설정'],
    },
    {
      id: 'fire',
      path: '/insurance/fire',
      title: '화재 및 재산종합보험',
      icon: Building2,
      badge: '주택·사업장 재산 손실 방어',
      desc: '가정집 화재, 이웃집 배상책임, 사업장/매장 누수 및 영업배상책임 등 예상치 못한 재산상 위험 종합 커버.',
      keyPoints: ['건물·가재도구 화재 손해 보상', '실화책임법 대비 대물배상 한도 점검', '소상공인 업종별 필수 의무보험 충족'],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Breadcrumb
        items={[
          { name: '홈', path: '/' },
          { name: '보험상품' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <header className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-950 text-blue-300 text-xs font-bold border border-blue-800">
            INSURANCE CATEGORIES · 목동 보험상품
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            보험상품 안내
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl mx-auto leading-relaxed font-normal">
            생명보험, 건강보험, 실손보험, 암보험, 연금보험, 화재보험 등 고객 상황별 맞춤 비교 상담을 위한 보험 카테고리 안내입니다. HK금융파트너스 경인사업본부 목동지점은 특정 보험사에 편향되지 않고 30여 개 제휴 보험사의 상품 약관과 가성비를 공정하게 분석하여 보험 상담이 필요한 고객과 보험설계사를 시작하려는 분 모두에게 객관적인 가이드를 제공합니다.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-2 text-xs text-blue-300">
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHO: HK금융파트너스 목동지점
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHERE: 강남구 역삼동 708-33 파라다이스 밴처타워 6층
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHAT: 30여개 보험사 객관적 비교
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHO FOR: 고객 및 예비 설계사
            </span>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Compliance Notice Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-xs text-blue-900 flex items-start gap-3">
          <FileSearch className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h2 className="font-bold text-blue-950 text-sm">객관적 안내 원칙</h2>
            <p className="leading-relaxed">
              본 안내는 보험상품의 일반적인 특징과 가입 전 확인해야 할 핵심 사항에 대한 이해를 돕기 위한 자료입니다.
              구체적인 보험료 및 보장내용은 개별 보험사 약관과 고객님의 연령, 성별, 직업, 건강 상태에 따라 상이하므로 전문 상담을 통해 확인하시기 바랍니다.
            </p>
          </div>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insuranceCategories.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-800">상담 시 주요 확인사항:</span>
                    {item.keyPoints.map((point, idx) => (
                      <p key={idx} className="text-[11px] text-slate-500 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                        <span>{point}</span>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onNavigate(item.path)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>상세 안내 보기</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onNavigate('/consulting/consultation')}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition cursor-pointer"
                  >
                    상담 신청
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Consulting Callout */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 text-center space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold">
            어떤 보험부터 확인해야 할지 막막하신가요?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            현재 가입된 보험 증권이 있다면 중복과 공백을 먼저 분석해 드립니다.
            불필요한 지출은 줄이고 꼭 필요한 보장만 객관적으로 확인해 보세요.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('/consulting/consultation')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition cursor-pointer"
            >
              1:1 맞춤 보장분석 상담 신청
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
