export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  category?: string;
  keywords?: string;
  ogImage?: string;
  breadcrumb: { name: string; path?: string }[];
}

export const SITE_ROUTES: Record<string, RouteMeta> = {
  '/': {
    path: '/',
    title: 'HK금융파트너스 경인사업본부 목동지점 | 보험상담·설계사 지원',
    description: '보험을 권하기보다 필요한 보장을 함께 설계합니다. HK금융파트너스 목동지점 윤상진 지점장 1:1 맞춤 보장분석 및 보험설계사 체계적 육성 지원.',
    breadcrumb: [{ name: '홈', path: '/' }],
  },
  '/about': {
    path: '/about',
    title: '지점 소개 | HK금융파트너스 경인사업본부 목동지점',
    description: '고객에게는 신뢰를, 설계사에게는 성장의 기회를 제공하는 HK금융파트너스 목동지점의 운영 철학과 상담 원칙을 소개합니다.',
    breadcrumb: [{ name: '홈', path: '/' }, { name: '목동지점', path: '/about' }, { name: '지점 소개' }],
  },
  '/about/company': {
    path: '/about/company',
    title: '지점 소개 | HK금융파트너스 경인사업본부 목동지점',
    description: '고객 중심 설계와 객관적 상담을 지향하는 HK금융파트너스 목동지점의 가치와 비전.',
    breadcrumb: [{ name: '홈', path: '/' }, { name: '목동지점', path: '/about' }, { name: '지점 소개' }],
  },
  '/about/manager': {
    path: '/about/manager',
    title: '지점장 소개 | 윤상진 지점장 - HK금융파트너스 목동지점',
    description: '윤상진 지점장의 보험 상담 철학과 설계사 육성 방향, 그리고 1:1 직접 소통 채널과 디지털 모바일 명함을 안내합니다.',
    breadcrumb: [{ name: '홈', path: '/' }, { name: '목동지점', path: '/about' }, { name: '지점장 소개' }],
  },
  '/insurance': {
    path: '/insurance',
    title: '보험상품 안내 | 생명·건강·실손·암·연금·화재 - HK금융파트너스',
    description: '건강보험, 암보험, 실손보험, 종신보험, 연금보험, 화재재산보험 등 고객 상황별 맞춤 비교 상담을 위한 보험 카테고리 허브.',
    breadcrumb: [{ name: '홈', path: '/' }, { name: '보험상품' }],
  },
  '/insurance/life': {
    path: '/insurance/life',
    title: '생명보험 및 정기보험 상담 | 가족을 위한 든든한 보장',
    description: '가장의 부재 시 가족의 생활비와 자녀 자립을 지켜주는 종신 및 정기보험의 주요 특징과 설계 포인트 안내.',
    breadcrumb: [{ name: '홈', path: '/' }, { name: '보험상품', path: '/insurance' }, { name: '생명·정기보험' }],
  },
  '/insurance/health': {
    path: '/insurance/health',
    title: '종합 건강보험 상담 | 진단비·수술비·입원비 맞춤 설계',
    description: '일상 질환부터 3대 질병 수술·입원비까지 체계적인 의료 안전망을 구축하기 위한 건강보험 핵심 체크리스트.',
    breadcrumb: [{ name: '홈', path: '/' }, { name: '보험상품', path: '/insurance' }, { name: '건강보험' }],
  },
  '/insurance/cancer': {
    path: '/insurance/cancer',
    title: '암·3대질병 보험 상담 | 표적치료와 치료비 공백 대비',
    description: '암, 뇌혈관질환, 허혈성 심장질환 등 치료비 부담이 큰 3대 중대질환의 보장 범위와 최신 치료 특약 점검.',
    breadcrumb: [{ name: '홈', path: '/' }, { name: '보험상품', path: '/insurance' }, { name: '암·3대질병' }],
  },
  '/insurance/silson': {
    path: '/insurance/silson',
    title: '실손의료보험 상담 | 병원비 부담 완화와 4세대 실손 비교',
    description: '국민 기본 의료 안전망 실손의료보험의 급여·비급여 보장 기준과 기존 세대(1~3세대) 대비 4세대 실손 비교 분석.',
    breadcrumb: [{ name: '홈', path: '/' }, { name: '보험상품', path: '/insurance' }, { name: '실손보험' }],
  },
  '/insurance/whole-life': {
    path: '/insurance/whole-life',
    title: '종신보험 상담 | 평생 사망보장과 상속자금 플랜',
    description: '평생을 보장받는 종신보험의 목적별 활용법과 정기보험과의 합리적 분산 설계 전략 안내.',
    breadcrumb: [{ name: '홈', path: '/' }, { name: '보험상품', path: '/insurance' }, { name: '종신보험' }],
  },
  '/insurance/pension': {
    path: '/insurance/pension',
    title: '연금 및 노후준비보험 상담 | 은퇴 이후 현금흐름 구축',
    description: '세액공제형 연금저축과 비과세 연금보험의 세무적 차이와 안정적인 노후 생활비 마련 전략.',
    breadcrumb: [{ name: '홈', path: '/' }, { name: '보험상품', path: '/insurance' }, { name: '연금·노후' }],
  },
  '/insurance/fire': {
    path: '/insurance/fire',
    title: '화재 및 재산종합보험 상담 | 주택·사업장 자산 보호',
    description: '가정집 화재와 이웃집 배상책임, 매장/사업장 화재·누수 피해를 방어하는 재산종합보험 상담.',
    breadcrumb: [{ name: '홈', path: '/' }, { name: '보험상품', path: '/insurance' }, { name: '화재·재산보험' }],
  },
  '/consulting': {
    path: '/consulting',
    title: '목동 보험상담 | 가입 강요 없는 1:1 맞춤 보장분석',
    description: '내 보험 제대로 준비되어 있을까요? 가입 권유 없이 현재 가입 내역의 중복과 공백을 5단계로 투명하게 점검해 드립니다.',
    breadcrumb: [{ name: '홈', path: '/' }, { name: '보험상담' }],
  },
  '/consulting/analysis': {
    path: '/consulting/analysis',
    title: '내 보험 보장분석 | 중복 담보·갱신 리스크 진단',
    description: '불필요한 보험료 누수를 막고 부족한 치료비는 채우는 맞춤 보장분석. 인터랙티브 자가 진단 체크리스트 제공.',
    breadcrumb: [{ name: '홈', path: '/' }, { name: '보험상담', path: '/consulting' }, { name: '보장분석' }],
  },
  '/consulting/consultation': {
    path: '/consulting/consultation',
    title: '보험 상담 신청 | HK금융파트너스 목동지점 1:1 상담 접수',
    description: '궁금한 보험 내용을 남겨주시면 목동지점 수석 전문 상담팀이 상황에 맞는 맞춤 상담을 안전하게 진행해 드립니다.',
    breadcrumb: [{ name: '홈', path: '/' }, { name: '보험상담', path: '/consulting' }, { name: '상담 신청' }],
  },
  '/recruit': {
    path: '/recruit',
    title: '보험설계사 지원 | HK금융파트너스 목동지점 신입·경력 채용',
    description: '보험설계사, 혼자 시작하지 마세요. 시험비용 지원부터 체계적 교육, 1:1 선배 동행까지 함께 성장하는 목동지점.',
    breadcrumb: [{ name: '홈', path: '/' }, { name: '설계사 지원' }],
  },
  '/recruit/process': {
    path: '/recruit/process',
    title: '설계사 지원 프로세스 | 6단계 입문 및 성장 로드맵',
    description: '지원 상담부터 시험 준비, 기본 교육, 설계 실습, 베테랑 동행, 현장 안착까지 체계적인 6단계 프로세스 안내.',
    breadcrumb: [{ name: '홈', path: '/' }, { name: '설계사 지원', path: '/recruit' }, { name: '지원 프로세스' }],
  },
  '/recruit/support': {
    path: '/recruit/support',
    title: '설계사 지원 시스템 | 시험비용·교육·설계·상담 동행 4대 지원',
    description: '신입 설계사가 현장에서 고립되지 않도록 목동지점이 실제로 지원하는 4대 밀착 육성 시스템 상세.',
    breadcrumb: [{ name: '홈', path: '/' }, { name: '설계사 지원', path: '/recruit' }, { name: '지원 시스템' }],
  },
  '/recruit/story': {
    path: '/recruit/story',
    title: '설계사 시작 가이드 | 처음 시작하는 분을 위한 실무 Q&A',
    description: '보험설계사가 하는 일, 시험 준비 요령, 첫 고객 상담 준비 등 초보 설계사를 위한 실용적인 가이드.',
    breadcrumb: [{ name: '홈', path: '/' }, { name: '설계사 지원', path: '/recruit' }, { name: '설계사 가이드' }],
  },
  '/insurance-info': {
    path: '/insurance-info',
    title: '보험정보 허브 | 실손·건강·암·연금 알기 쉬운 보험 지식',
    description: '어려운 보험 용어와 제도, 4세대 실손 비교, 보험 리모델링 주의사항을 알기 쉽게 정리한 전문 지식 허브.',
    breadcrumb: [{ name: '홈', path: '/' }, { name: '보험정보' }],
  },
  '/contact': {
    path: '/contact',
    title: '지점 위치 및 연락처 | HK금융파트너스 목동지점 오시는 길',
    description: 'HK금융파트너스 경인사업본부 목동지점 위치(오목교역 인근), 상담 시간, 직통 전화 및 방문 예약 안내.',
    breadcrumb: [{ name: '홈', path: '/' }, { name: '오시는 길' }],
  },
  '/faq': {
    path: '/faq',
    title: '자주 묻는 질문 (FAQ) | 보험상담 & 설계사 지원 안내',
    description: '보장분석 비용, 기존 보험 유지 여부, 설계사 시험 준비, 교육 지원 등 가장 많이 묻는 질문 총정리.',
    breadcrumb: [{ name: '홈', path: '/' }, { name: 'FAQ' }],
  },
  '/privacy': {
    path: '/privacy',
    title: '개인정보처리방침 | HK금융파트너스 목동지점',
    description: '금융소비자의 소중한 개인정보를 안전하게 처리하고 보호하기 위한 방침 안내.',
    breadcrumb: [{ name: '홈', path: '/' }, { name: '개인정보처리방침' }],
  },
  '/terms': {
    path: '/terms',
    title: '이용약관 | HK금융파트너스 목동지점',
    description: 'HK금융파트너스 목동지점 웹사이트 이용에 관한 제반 사항 안내.',
    breadcrumb: [{ name: '홈', path: '/' }, { name: '이용약관' }],
  },
};
