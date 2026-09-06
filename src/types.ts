export type NavigationPage = 
  | 'home'
  | 'branch'
  | 'products'
  | 'consulting'
  | 'recruitment'
  | 'info'
  | 'faq'
  | 'privacy'
  | 'terms';

export interface CompanyInfo {
  name: string;
  division: string;
  branch: string;
  fullName: string;
  leaderTitle: string;
  leaderName: string;
  leaderGreeting: string;
  leaderPhilosophy: string;
  leaderQuote: string;
  zipCode: string;
  address: string;
  detailAddress: string;
  phone: string;
  mobile: string;
  tel: string;
  fax: string;
  email: string;
  consultHours: string;
  kakaoLink: string;
  blogLink: string;
  youtubeLink: string;
  coreMessage: string;
  mainSlogan: string;
  subSloganCustomer: string;
  subSloganRecruit: string;
}

export interface InsuranceProduct {
  id: string;
  category: '건강·실손' | '암·3대질병' | '종신·정기' | '연금·노후' | '화재·재산' | '치아·간병';
  problemStatement: string;
  name: string;
  tagline: string;
  description: string;
  targetAudience: string[];
  keyCoveragePoints: string[];
  consultingAdvice: string;
  iconName: string;
  badgeColor: string;
  complianceNotice: string;
}

export interface RecruitmentBenefit {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  highlights: string[];
}

export interface CareerStep {
  step: number;
  title: string;
  period: string;
  description: string;
  supportDetail: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: '보험상식' | '실손보험' | '건강보험' | '보험 리모델링' | '연금·노후' | '화재·재산';
  summary: string;
  content: string[];
  keyTakeaways: string[];
  targetReader: string;
  author: string;
  reviewer: string;
  publishDate: string;
  updateDate: string;
  readTime: string;
  tags: string[];
}

export interface FAQItem {
  id: string;
  category: '고객상담' | '설계사지원' | '보장분석' | '지점안내';
  question: string;
  directAnswer: string; // GEO concise answer (40~100 chars)
  detailedExplanation?: string;
  keywords: string[];
}

export interface ConsultFormData {
  name: string;
  phone: string;
  category: string;
  preferredTime: string;
  message: string;
  agreePrivacy: boolean;
}

export interface RecruitFormData {
  name: string;
  phone: string;
  currentJob: string;
  experience: string;
  preferredTime: string;
  message: string;
  agreePrivacy: boolean;
}
