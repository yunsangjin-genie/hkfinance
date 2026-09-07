import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Stethoscope,
  Activity,
  ShieldAlert,
  Coins,
  HeartHandshake,
  Building2,
  FileText,
} from 'lucide-react';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { insuranceProducts } from '../../data/products';

interface InsuranceDetailPageProps {
  type: string; // 'life' | 'health' | 'cancer' | 'silson' | 'whole-life' | 'pension' | 'fire'
  onNavigate: (path: string) => void;
  onOpenConsult: (category?: string) => void;
}

interface InsuranceDetailContent {
  slug: string;
  h1: string;
  title: string;
  categoryName: string;
  tagline: string;
  leadSummary: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string[];
  checkpoints: string[];
  targetAudience: string[];
  faqs: { q: string; a: string }[];
  relatedArticleId?: string;
  relatedArticleTitle?: string;
}

const DETAILS_DATA: Record<string, InsuranceDetailContent> = {
  silson: {
    slug: 'silson',
    h1: '실손보험 상담',
    title: '실손의료보험 (실비)',
    categoryName: '실손보험',
    tagline: '병원비 부담을 덜어주는 국민 기본형 의료비 보장',
    leadSummary: '실손보험의 기본 개념과 가입·변경 전 확인해야 할 사항을 이해하기 쉽게 안내합니다. HK금융파트너스 경인사업본부 목동지점은 서울 목동을 기반으로 하는 보험 상담 지점으로서, 30여 개 제휴 보험사의 실손의료보험 약관과 4세대 전환 조건을 객관적으로 비교 분석합니다. 보험 상담이 필요한 고객부터 새로운 금융 커리어를 시작하려는 보험설계사 지망생까지 모두에게 신뢰할 수 있는 명확한 기준을 제시합니다.',
    icon: Stethoscope,
    description: [
      '실손의료보험은 질병이나 상해로 병원에 입원하거나 통원 치료를 받을 때 실제 발생한 급여 및 비급여 의료비 중 본인부담금을 보장하는 가장 기본적인 보험입니다.',
      '현재 판매 중인 4세대 실손보험은 필수 치료인 급여 항목과 선택적 치료인 비급여 항목을 명확히 분리하여, 비급여 치료 이용량에 따라 보험료가 차등 적용(할인 또는 할증)되는 구조입니다.',
      '기존 1~3세대 실손을 보유하고 계신 분들은 본인의 병원 이용 빈도, 비급여 치료 여부, 갱신 시 예상 보험료 등을 종합적으로 고려하여 전환 여부를 신중히 판단해야 합니다.',
    ],
    checkpoints: [
      '급여 20%, 비급여 30%의 자기부담금 비율 이해',
      '도수치료, 비급여 주사료, 비급여 MRI 등 3대 비급여 특약의 보장 한도 및 횟수 확인',
      '직전 1년간 비급여 지급 보험금에 따른 보험료 차등 할인·할증 제도 점검',
      '다수 계약에 가입하더라도 실제 손해액을 한도로 비례보상(중복 보상 불가)되는 원칙 확인',
    ],
    targetAudience: [
      '병원비 기초 안전망이 전혀 준비되어 있지 않은 분',
      '기존 구 실손(1·2세대)의 가파른 갱신 보험료가 부담되어 전환을 고민 중인 분',
      '사회초년생 및 성장기 자녀',
    ],
    faqs: [
      {
        q: '실손보험은 왜 중복 가입해도 이중으로 보상이 안 되나요?',
        a: '실손의료보험은 실제 본인이 지출한 의료비 손해만을 실비로 보상하는 손해보험 원칙(실손보상)이 적용되기 때문에, 여러 개에 가입해도 실제 지출한 병원비를 각 보험사가 나누어 비례보상합니다.',
      },
      {
        q: '기존 1세대·2세대 실손을 4세대로 무조건 갈아타야 하나요?',
        a: '아닙니다. 평소 병원 이용이 많고 비급여 치료를 자주 받으시는 분은 자기부담금이 적은 기존 계약을 유지하는 것이 유리할 수 있습니다. 반면 병원 이용이 거의 없고 갱신 보험료 부담이 크다면 4세대 전환을 고려해 볼 수 있습니다.',
      },
    ],
    relatedArticleId: 'indemnity-switch-guide',
    relatedArticleTitle: '실손보험, 갈아타기 전에 확인해야 할 것',
  },
  health: {
    slug: 'health',
    h1: '건강보험 상담',
    title: '종합 건강보험',
    categoryName: '건강보험',
    tagline: '일상 질환부터 수술·입원비까지 체계적인 의료 안전망',
    leadSummary: '종합 건강보험의 기본 개념과 진단비·수술비·입원비 구성 시 확인해야 할 사항을 이해하기 쉽게 안내합니다. HK금융파트너스 경인사업본부 목동지점은 서울 목동을 기반으로 하는 보험 상담 지점으로서, 질병과 상해를 아우르는 균형 잡힌 보장분석과 합리적인 보험료 설계를 지원합니다. 보험 상담이 필요한 고객과 보험설계사로 안착하려는 분께 객관적인 정보를 제공합니다.',
    icon: Activity,
    description: [
      '종합 건강보험은 일상생활 중 발생할 수 있는 주요 질병 및 상해에 대해 진단비, 수술비, 입원일당, 간병비 등을 종합적으로 보완하는 핵심 보장성 보험입니다.',
      '실손보험이 실제 병원비의 본인부담금을 방어한다면, 건강보험은 치료 기간 동안의 소득 공백과 고액의 비급여 치료비, 간병 비용을 정액으로 보장받는 역할을 합니다.',
      '특히 질병의 범위가 넓은 수술비 특약과 비갱신형 구조를 적절히 배분하여 노년기까지 안정적으로 유지할 수 있도록 설계하는 것이 중요합니다.',
    ],
    checkpoints: [
      '1~5종 수술비 및 주요 N대 질병 수술비의 보장 범위 대조',
      '비갱신형(보험료 변동 없음)과 갱신형(초기 저렴하나 인상 위험)의 합리적 배분',
      '상해·질병 후유장해(3% 이상) 특약 반영 여부 확인',
      '기존에 가입된 다른 보험과의 중복 담보 유무 점검',
    ],
    targetAudience: [
      '첫 독립 후 제대로 된 건강 보장의 뼈대를 세우고자 하는 2030 세대',
      '가족력(고혈압, 당뇨, 혈관질환 등)에 대한 사전 대비가 필요한 분',
      '기존 보장에 수술비와 최신 치료 특약을 보강하고 싶은 4050 세대',
    ],
    faqs: [
      {
        q: '실손보험이 있는데 건강보험이 따로 필요한가요?',
        a: '실손보험은 실제 발생한 병원비만 보상하므로, 고액 질환 발생 시 직장을 쉬면서 발생하는 생활비나 고액의 간병비, 표적항암 치료비 등은 실손만으로 충당하기 어렵습니다. 정액 진단비와 수술비로 생활 안정을 도모해야 합니다.',
      },
      {
        q: '갱신형과 비갱신형 중 어떤 것이 더 좋은가요?',
        a: '장기적인 관점에서는 소득 활동 기간에 납입을 완료하고 노후까지 보장받는 비갱신형이 안전합니다. 다만 특정 고연령대나 단기 집중 보장이 필요할 때는 갱신형을 보조적으로 활용할 수 있습니다.',
      },
    ],
    relatedArticleId: 'why-coverage-lacks',
    relatedArticleTitle: '보험료는 내는데 보장이 부족한 이유',
  },
  cancer: {
    slug: 'cancer',
    h1: '암·3대질병 보험 상담',
    title: '암·3대질병 보험',
    categoryName: '암·3대질병',
    tagline: '치료비 부담이 큰 3대 중대질환(암·뇌·심장) 집중 대비',
    leadSummary: '암, 뇌혈관질환, 허혈성 심장질환 등 치료비 부담이 큰 3대 질병 보장의 기본 개념과 최신 치료 특약을 이해하기 쉽게 안내합니다. HK금융파트너스 경인사업본부 목동지점은 서울 목동을 기반으로 하는 보험 상담 지점으로서, 보장 공백 없는 치료비 플랜과 체계적인 비교 분석을 제공합니다. 보험 상담이 필요한 고객과 보험설계사를 시작하려는 분을 함께 지원합니다.',
    icon: ShieldAlert,
    description: [
      '한국인 사망 원인 상위를 차지하는 암, 뇌혈관질환, 허혈성 심장질환은 고액의 치료비와 긴 요양 기간으로 인해 가정 경제에 심각한 타격을 줄 수 있습니다.',
      '과거의 보장은 뇌출혈이나 급성심근경색 등 말기 중증 상태만 보장하는 경우가 많았으나, 현대 의학 발전에 맞춰 초기 단계인 뇌경색이나 협심증까지 포괄하는 보장으로 점검해야 합니다.',
      '또한 표적항암약물허가치료, 양성자·중입자치료 등 최신 신의료기술 특약을 선별적으로 반영하여 실효성을 높여야 합니다.',
    ],
    checkpoints: [
      '일반암 대비 유사암(갑상선암, 기타피부암 등)의 보장 한도 확인',
      '뇌출혈·뇌졸중보다 보장 범위가 넓은 "뇌혈관질환 진단비" 포함 여부',
      '급성심근경색증보다 넓은 "허혈성 심장질환" 및 "심혈관질환" 특약 점검',
      '가입 후 90일 면책기간 및 1년 이내 50% 감액기간 조건 확인',
    ],
    targetAudience: [
      '부모님이나 친척 중 암 또는 심뇌혈관 질환 이력이 있는 분',
      '10년 이상 전 가입한 과거 보험의 뇌/심장 보장 범위가 좁은 분',
      '가장으로서 중대 질병 발병 시 가계 소득 단절이 우려되는 분',
    ],
    faqs: [
      {
        q: '뇌출혈 진단비와 뇌혈관질환 진단비의 차이가 무엇인가요?',
        a: '뇌출혈은 뇌혈관이 터진 중증 상태만 보장하며 발병률은 약 10%에 불과합니다. 반면 뇌혈관이 막히는 뇌경색(약 70% 이상)과 초기 뇌혈관 질환을 모두 보장받으려면 포괄적인 "뇌혈관질환 진단비"가 필수적입니다.',
      },
      {
        q: '암보험에 가입하자마자 암 진단을 받으면 보험금이 나오나요?',
        a: '대부분의 암보험은 역선택 방지를 위해 가입일로부터 90일이 지난 다음 날부터 보장이 개시되는 "면책기간"이 적용되며, 1년 미만 시 50% 감액 조항이 있을 수 있으므로 건강할 때 미리 준비해야 합니다.',
      },
    ],
    relatedArticleId: 'forties-insurance-guide',
    relatedArticleTitle: '40대 보험 가입 전 확인해야 할 사항',
  },
  'whole-life': {
    slug: 'whole-life',
    h1: '종신보험 상담',
    title: '종신보험',
    categoryName: '종신보험',
    tagline: '평생 사망보장과 상속자금 플랜을 위한 든든한 자산 보호',
    leadSummary: '종신보험의 기본 개념과 평생 사망보장 및 상속자금 플랜 전 확인해야 할 사항을 이해하기 쉽게 안내합니다. HK금융파트너스 경인사업본부 목동지점은 서울 목동을 기반으로 하는 보험 상담 지점으로서, 무리한 가입 대신 가계 재정에 최적화된 맞춤 설계를 도와드립니다. 보험 상담이 필요한 고객과 보험설계사를 시작하려는 사람을 위한 체계적인 가이드를 제공합니다.',
    icon: ShieldCheck,
    description: [
      '종신보험은 사망 시기나 원인(고의적 사고 등 면책 사유 제외)에 관계없이 피보험자가 사망할 때까지 평생 동안 정해진 사망보험금을 100% 지급하는 보장 상품입니다.',
      '예기치 못한 유고 시 남겨진 가족의 생활비와 자녀의 학자금 마련, 부채 상환 재원으로 활용되며, 자산가의 경우 상속세 납부 재원으로도 널리 활용됩니다.',
      '보험료가 일반 정기보험에 비해 상대적으로 높기 때문에, 무리한 가입보다는 가계의 소득 수준과 장기 유지 가능성을 면밀히 따져 적정 규모를 산정해야 합니다.',
    ],
    checkpoints: [
      '평생 보장 유지에 따른 장기 납입 여력 및 적정 보험료 수준 점검',
      '체감형, 체증형 등 사망보험금 지급 구조의 다양성 비교',
      '사망보장 외에 중대 질병 진단 시 납입면제 기능 탑재 여부',
      '상속세 재원 마련 목적 시 계약자-수익자 지정에 따른 절세 효과 검토',
    ],
    targetAudience: [
      '가족의 생계를 전적으로 책임지고 있는 경제활동 주체',
      '부동산 등 비유동성 자산 비중이 높아 유가족의 상속세 재원 마련이 필요한 자산가',
      '평생 유지되는 확정 사망보장을 원하는 분',
    ],
    faqs: [
      {
        q: '종신보험을 저축이나 연금 목적으로 가입해도 되나요?',
        a: '종신보험은 기본적으로 사망을 보장하는 "보장성 보험"입니다. 해약환급금이 적립되거나 연금전환 기능이 있더라도 사업비와 위험보험료가 차감되므로, 순수 저축이나 연금 목적으로는 적합하지 않습니다.',
      },
    ],
    relatedArticleId: 'dont-cancel-old-insurance',
    relatedArticleTitle: '오래된 보험, 무조건 해지하면 안 되는 이유',
  },
  life: {
    slug: 'life',
    h1: '생명·정기보험 상담',
    title: '생명·정기보험',
    categoryName: '정기보험',
    tagline: '가족 부양 집중 기간을 위한 가성비 높은 사망보장',
    leadSummary: '정기보험과 생명보험의 기본 개념과 집중 경제활동기 사망보장 설계 시 확인해야 할 사항을 이해하기 쉽게 안내합니다. HK금융파트너스 경인사업본부 목동지점은 서울 목동을 기반으로 하는 보험 상담 지점으로서, 합리적인 비용으로 가족의 미래를 지키는 맞춤형 가성비 플랜을 제시합니다. 보험 상담이 필요한 고객과 보험설계사를 시작하려는 분을 함께 지원합니다.',
    icon: HeartHandshake,
    description: [
      '정기보험은 평생을 보장하는 종신보험과 달리, 60세, 65세, 70세 등 자녀가 성장하여 경제적으로 독립할 때까지의 특정 기간 동안만 사망을 보장하는 상품입니다.',
      '보장 기간이 한정되어 있는 대신 종신보험 대비 보험료가 훨씬 저렴하여, 합리적인 비용으로 가족을 위한 고액의 안전장치를 마련할 수 있습니다.',
      '절감된 보험료를 본인의 건강 보장이나 노후 연금 재원으로 분산 투자할 수 있어 실속 있는 자산 관리가 가능합니다.',
    ],
    checkpoints: [
      '막내 자녀의 사회 진출 및 대학 졸업 시기에 맞춘 보장 만기 설정',
      '주요 경제활동 연령대(30~60대)의 유고 위험 집중 방어',
      '건강체(비흡연, 정상혈압 등) 할인 특약 적용 가능 여부 조회',
    ],
    targetAudience: [
      '어린 자녀를 양육 중인 3040 맞벌이 및 외벌이 부모',
      '종신보험의 높은 보험료가 부담스러워 실속 있는 사망보장을 찾는 분',
      '사업이나 대출금 상환 기간 동안 한시적 리스크 헤지가 필요한 분',
    ],
    faqs: [
      {
        q: '정기보험과 종신보험의 가장 큰 차이는 무엇인가요?',
        a: '보장 기간의 차이입니다. 종신보험은 언제 사망하더라도 100% 보험금이 지급되는 평생 보장이며, 정기보험은 정해진 기간(예: 65세 만기) 내에 사망할 때만 지급됩니다. 기간이 한정된 만큼 정기보험의 보험료가 훨씬 저렴합니다.',
      },
    ],
    relatedArticleId: 'forties-insurance-guide',
    relatedArticleTitle: '40대 보험 가입 전 확인해야 할 사항',
  },
  pension: {
    slug: 'pension',
    h1: '연금 및 노후준비보험 상담',
    title: '연금 및 노후준비보험',
    categoryName: '연금보험',
    tagline: '은퇴 이후 안정적인 월 현금흐름 파이프라인 구축',
    leadSummary: '연금보험과 노후준비의 기본 개념과 은퇴 이후 현금흐름 구축 전 확인해야 할 사항을 이해하기 쉽게 안내합니다. HK금융파트너스 경인사업본부 목동지점은 서울 목동을 기반으로 하는 보험 상담 지점으로서, 세액공제와 비과세 혜택을 다각도로 분석하여 안정적인 노후 파이프라인 설계를 돕습니다. 보험 상담이 필요한 고객과 보험설계사를 시작하려는 사람을 함께 지원합니다.',
    icon: Coins,
    description: [
      '100세 시대를 맞아 국민연금의 소득 대체율 한계를 보완하고 안정적인 노후 생활비를 조달하기 위한 개인 연금 상품입니다.',
      '매년 연말정산 시 세액공제 혜택을 받을 수 있는 세제적격 "연금저축보험"과, 10년 이상 유지 시 이자소득세가 비과세되는 세제비적격 "일반 연금보험"으로 나뉩니다.',
      '연금 상품은 중도 해지 시 불이익이 크므로, 단기 고수익보다는 정년퇴직 이후 안정적으로 수령할 수 있도록 장기적인 납입 여력을 고려해야 합니다.',
    ],
    checkpoints: [
      '세액공제형(연말정산 환급) vs 10년 이상 비과세형 선택 기준 점검',
      '공시이율형(안정성 중심) vs 변액형(투자 실적 연계) 성향 파악',
      '연금 수령 개시 연령 및 종신연금형/확정연금형 지급 방식 비교',
      '중도 인출 및 납입 일시중지 기능 지원 여부 확인',
    ],
    targetAudience: [
      '매년 연말정산 절세 혜택을 꼼꼼하게 챙기려는 직장인',
      '국민연금 개시 연령 전 소득 공백기(은퇴 크레바스)를 대비하려는 4050 세대',
      '금융소득종합과세를 피하고 비과세 은퇴 자금을 모으려는 자영업자',
    ],
    faqs: [
      {
        q: '연금저축과 일반 연금보험의 세금 혜택은 어떻게 다른가요?',
        a: '연금저축은 매년 납입 시 세액공제(최대 16.5%)를 받는 대신 나중에 연금을 탈 때 연금소득세(3.3~5.5%)를 냅니다. 반면 일반 연금보험은 납입할 때 세액공제는 없지만, 10년 이상 유지 등 요건 충족 시 연금 수령 시 세금이 전액 면제(비과세)됩니다.',
      },
    ],
    relatedArticleId: 'annuity-pension-prep',
    relatedArticleTitle: '연금보험과 노후 준비, 무엇부터 봐야 할까?',
  },
  fire: {
    slug: 'fire',
    h1: '화재 및 재산종합보험 상담',
    title: '화재 및 재산종합보험',
    categoryName: '화재·재산보험',
    tagline: '주택 및 사업장의 불의의 사고로부터 소중한 재산 방어',
    leadSummary: '화재 및 재산보험의 기본 개념과 주택·사업장 자산 보호 전 확인해야 할 사항을 이해하기 쉽게 안내합니다. HK금융파트너스 경인사업본부 목동지점은 서울 목동을 기반으로 하는 보험 상담 지점으로서, 화재 손해와 이웃집 배상책임까지 꼼꼼하게 방어할 수 있는 보장을 안내합니다. 보험 상담이 필요한 고객과 보험설계사를 시작하려는 분을 함께 지원합니다.',
    icon: Building2,
    description: [
      '가정집이나 상가, 공장 등에서 화재가 발생하면 건물과 가재도구 손실뿐만 아니라 이웃집으로 불이 번져 막대한 대물배상책임이 발생할 수 있습니다.',
      '실화책임법 개정으로 단순 과실로 인한 화재라도 이웃집 피해에 대해 손해배상 책임을 져야 하므로 화재배상책임 한도를 충분히 설정해야 합니다.',
      '또한 아파트나 다세대 주택의 급배수시설 누수 손해, 가전제품 고장 수리비, 임차인과의 원상복구 분쟁 등 실생활 밀접 위험을 함께 커버합니다.',
    ],
    checkpoints: [
      '건물 및 가재도구 실손 보상 한도와 재조달가액 기준 평가',
      '실화책임에 대비한 대물배상책임 가입 금액(최소 수억 원 이상 권장)',
      '급배수시설 누출 손해 및 일상생활배상책임 특약 연계 점검',
      '음식점, 숙박시설 등 다중이용업소의 의무보험 가입 요건 충족 여부',
    ],
    targetAudience: [
      '아파트, 빌라, 단독주택을 소유하거나 거주하는 모든 가구',
      '매장, 사무실, 창고, 공장 등을 운영하는 자영업자 및 소상공인',
      '임대 건물을 보유하여 누수나 시설 사고 배상책임에 대비해야 하는 임대인',
    ],
    faqs: [
      {
        q: '아파트 단체 화재보험이 이미 가입되어 있는데 개인 화재보험이 또 필요한가요?',
        a: '아파트 단체보험은 대부분 보장 한도가 최소 수준(수천만 원 내외)으로 낮게 설정되어 있어, 실제 큰 화재나 이웃 세대로의 번짐 사고 시 충분한 배상이 어렵습니다. 개인 화재보험으로 부족한 한도와 누수, 배상책임을 보완해야 합니다.',
      },
    ],
  },
};

export const InsuranceDetailPage: React.FC<InsuranceDetailPageProps> = ({
  type,
  onNavigate,
  onOpenConsult,
}) => {
  const data = DETAILS_DATA[type] || DETAILS_DATA['silson'];
  const Icon = data.icon;

  return (
    <article className="min-h-screen bg-slate-50">
      <Breadcrumb
        items={[
          { name: '홈', path: '/' },
          { name: '보험상품', path: '/insurance' },
          { name: data.categoryName },
        ]}
        onNavigate={onNavigate}
      />

      {/* Header Banner */}
      <header className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600/30 text-blue-300 flex items-center justify-center border border-blue-500/40">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                INSURANCE GUIDE · {data.categoryName}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {data.h1}
              </h1>
            </div>
          </div>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed font-normal">
            {data.leadSummary}
          </p>
          <div className="pt-2 flex flex-wrap gap-2 text-xs text-blue-300">
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHO: HK금융파트너스 목동지점
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHERE: 서울 목동 보험상담
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHAT: 맞춤 약관비교 & 설계지원
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHO FOR: 고객 및 예비 설계사
            </span>
          </div>
        </div>
      </header>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Section 1: Overview & Characteristics */}
        <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <span>{data.categoryName}의 기본 특징과 이해</span>
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            {data.description.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Section 2: Key Checkpoints */}
        <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>상담 전 꼭 확인해야 할 핵심 체크리스트</span>
          </h2>
          <div className="space-y-2.5">
            {data.checkpoints.map((cp, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3 text-xs text-slate-700"
              >
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed font-medium">{cp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Recommended Target Audience */}
        <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <span>이런 분께 점검을 추천합니다</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {data.targetAudience.map((target, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 text-xs text-indigo-950 font-medium leading-relaxed"
              >
                {target}
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: FAQs */}
        {data.faqs.length > 0 && (
          <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <span>자주 묻는 질문 (FAQ)</span>
            </h2>
            <div className="space-y-3">
              {data.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-start gap-2">
                    <span className="text-blue-600 font-mono font-bold">Q.</span>
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs text-slate-600 pl-5 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 5: Related Knowledge Article Internal Link */}
        {data.relatedArticleId && (
          <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-blue-700 uppercase">
                RELATED INSURANCE ARTICLE
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                {data.relatedArticleTitle}
              </h3>
              <p className="text-xs text-slate-600">
                더 자세한 비교 사례와 실무 팁을 정보 콘텐츠에서 확인해 보세요.
              </p>
            </div>
            <button
              onClick={() => onNavigate(`/insurance-info/${data.relatedArticleId}`)}
              className="px-4 py-2 bg-white hover:bg-blue-600 hover:text-white text-blue-700 border border-blue-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
            >
              <span>칼럼 읽기</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Compliance Warning */}
        <div className="p-4 bg-slate-100 rounded-xl text-[11px] text-slate-500 leading-relaxed">
          <strong>준법 감시 안내:</strong> 본 안내는 이해를 돕기 위한 예시 및 일반적 안내이며, 특정 보험사의 가입 승인 조건 및 최종 보험료는 가입자의 연령, 성별, 건강 상태(고지의무), 직업 등에 따라 달라질 수 있습니다. 가입 체결 전 해당 상품의 약관 및 상품설명서를 반드시 확인하시기 바랍니다.
        </div>

        {/* Bottom Dual Navigation & CTA */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => onNavigate('/insurance')}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition cursor-pointer"
          >
            ← 전체 보험상품 목록
          </button>

          <button
            onClick={() => onNavigate('/consulting/consultation')}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-600/20"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{data.categoryName} 1:1 맞춤 상담 신청</span>
          </button>
        </div>
      </div>
    </article>
  );
};
