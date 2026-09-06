import { CompanyInfo } from '../types';

export const initialCompanyInfo: CompanyInfo = {
  name: 'HK금융파트너스',
  division: '경인사업본부',
  branch: '목동지점',
  fullName: 'HK금융파트너스 경인사업본부 목동지점',
  leaderTitle: '지점장',
  leaderName: '윤상진',
  leaderGreeting: '보험을 잘 파는 조직보다, 고객에게 보험을 제대로 설명하고 설계사가 함께 성장할 수 있는 든든한 울타리를 만듭니다.',
  leaderPhilosophy: '불필요한 가입 권유를 지양하고, 고객의 생애주기와 재정 상황에 꼭 필요한 보장만을 객관적으로 분석하여 제안합니다. 아울러 신입 설계사가 현장에서 고립되지 않도록 체계적인 교육과 실무 동행 멘토링을 직접 책임집니다.',
  leaderQuote: '보험을 권하기보다, 필요한 보장을 함께 설계합니다.',
  zipCode: '07997',
  address: '서울특별시 양천구 목동',
  detailAddress: '목동지점',
  phone: '010-2627-8554',
  mobile: '010-2627-8554',
  tel: '1566-8163',
  fax: '0504-441-8554',
  email: 'genie.yoon@gmail.com',
  consultHours: '평일 09:00 ~ 18:00 (사전 예약 시 주말 및 야간 상담 가능)',
  kakaoLink: '',
  blogLink: '',
  youtubeLink: '',
  coreMessage: '고객에게는 신뢰를, 설계사에게는 성장의 기회를.',
  mainSlogan: '보험을 권하기보다, 필요한 보장을 함께 설계합니다.',
  subSloganCustomer: '보험, 혼자 결정하지 마세요.',
  subSloganRecruit: '보험설계사, 혼자 시작하지 마세요.',
};

export const branchCoreValues = [
  {
    number: '01',
    title: '고객 중심 설계',
    subtitle: '상품보다 고객의 상황을 먼저 살펴봅니다.',
    description: '특정 금융상품을 일방적으로 권유하지 않고, 고객의 연령·가족력·소득·기존 가입내역을 종합적으로 파악하여 가장 합리적인 보장 기준을 수립합니다.',
    icon: 'ShieldCheck',
  },
  {
    number: '02',
    title: '전문적인 객관적 상담',
    subtitle: '보험 가입 여부보다 필요한 보장과 보험료를 함께 검토합니다.',
    description: '가입을 전제로 하지 않는 객관적인 보장분석을 통해, 부족한 보장은 보완하고 불필요하게 중복된 지출은 점검할 수 있도록 도와드립니다.',
    icon: 'FileText',
  },
  {
    number: '03',
    title: '함께 성장하는 조직',
    subtitle: '신입 설계사가 혼자 시작하지 않도록 교육과 현장 지원을 제공합니다.',
    description: '자격증 취득부터 상품 분석, 선배 설계사 1:1 상담 동행, 디지털 영업 실무까지 전 과정을 체계적으로 밀착 지원하여 전문 설계사로 육성합니다.',
    icon: 'Users',
  },
];
