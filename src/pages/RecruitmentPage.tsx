import React, { useState } from 'react';
import { Briefcase, CheckCircle2, ArrowRight, Sparkles, Award, Users, BookOpen, FileCheck, Compass, Send, Check, ShieldCheck, TrendingUp, Presentation } from 'lucide-react';
import { recruitmentBenefits, careerSteps, recruitKeyMessages } from '../data/recruitment';
import { CompanyInfo } from '../types';
import { siteImages } from '../assets/images';

interface RecruitmentPageProps {
  companyInfo: CompanyInfo;
  onOpenRecruitModal: () => void;
}

export const RecruitmentPage: React.FC<RecruitmentPageProps> = ({
  companyInfo,
  onOpenRecruitModal,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    experienceType: '신입 (보험영업 경험 없음)',
    preferredField: '종합 (생명/손해 전 분야)',
    consultTime: '평일 오후 (14:00~18:00)',
    motivation: '',
    privacyAgreed: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacyAgreed) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section with Photo Overlay */}
      <section className="bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src={siteImages.mentoringSession}
            alt="멘토링 교육 배경"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center space-y-5 relative">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30">
            <Briefcase className="w-3.5 h-3.5" /> {companyInfo.fullName} 설계사 상시 채용
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            보험설계사,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-300">
              혼자 시작하지 마세요.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {companyInfo.branch}은 보험설계사를 처음 시작하는 분들이 현장에서 빠르게 성장하고 안착할 수 있도록 
            <strong> 교육, 시험비용 지원, 1:1 상담 동행</strong>까지 든든하게 함께합니다.
          </p>
          <div className="pt-4">
            <button
              onClick={() => {
                const el = document.getElementById('recruit-form-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-indigo-600/30 transition cursor-pointer"
            >
              1:1 진로 상담 신청하기
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Visual Mentoring & Team Environment Highlights */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={siteImages.mentoringSession}
                alt="1:1 실무 멘토링 및 전산 분석 교육"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-4 text-xs font-bold text-white bg-indigo-600/90 px-3 py-1 rounded-full backdrop-blur-xs">
                지점장 &amp; 선배 설계사 1:1 밀착 코칭
              </span>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="text-base font-bold text-slate-900">현장 중심의 실전 약관 &amp; 화법 교육</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                이론에 그치지 않고 고객 상담 현장에서 즉시 활용 가능한 실전 화법과 상품 비교 노하우를 집중 전수합니다.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={siteImages.teamGangnam}
                alt="HK금융파트너스 목동지점 설계사 팀"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-4 text-xs font-bold text-white bg-blue-600/90 px-3 py-1 rounded-full backdrop-blur-xs">
                상호 존중과 협력의 팀 문화
              </span>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="text-base font-bold text-slate-900">혼자가 아닌 함께 성장하는 동반자</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                지인 영업 강요 없이 블로그, SNS 마케팅, 데이터 기반 분석 기법을 공유하며 지속 가능한 성공 모델을 만듭니다.
              </p>
            </div>
          </div>
        </section>

        {/* 3 Core Recruitment Messages */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              CORE PRINCIPLES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {companyInfo.branch} 리크루팅의 3가지 약속
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recruitKeyMessages.map((msg, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-slate-900">{msg.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{msg.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5 Core Benefits Detailed */}
        <section className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              5 MAJOR SUPPORTS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {companyInfo.branch} 신입 설계사 5대 지원 혜택
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              지점의 노하우를 아낌없이 나누며 안정적인 정착을 지원합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recruitmentBenefits.map((b) => (
              <div
                key={b.id}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-300 hover:bg-white transition-all space-y-3"
              >
                <span className="text-xs font-mono font-bold text-indigo-600">
                  혜택 {b.number}
                </span>
                <h3 className="text-base font-bold text-slate-900">{b.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{b.description}</p>
                <div className="pt-2 border-t border-slate-200/60">
                  <p className="text-[11px] font-semibold text-slate-500">주요 지원 항목</p>
                  <p className="text-xs text-indigo-900 font-medium mt-0.5">{b.highlights.join(' · ')}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7-Step Career Roadmap */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              7-STEP ROADMAP
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              신입 설계사 7단계 성장 로드맵
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              체계적인 단계를 거쳐 혼자서도 당당한 금융 전문가로 성장합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {careerSteps.map((step) => (
              <div
                key={step.step}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2 relative"
              >
                <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                  STEP {step.step}
                </span>
                <h3 className="text-sm font-bold text-slate-900">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Application Form */}
        <section id="recruit-form-section" className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                JOIN MOKDONG BRANCH
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                지금 {companyInfo.fullName}과<br />새로운 도전을 시작하세요
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                궁금한 점이 많으시다면 부담 없는 1:1 면담을 먼저 신청해 보세요.
                수수료 체계, 업무 환경, 교육 일정 등 모든 사항을 솔직하게 안내해 드립니다.
              </p>

              <div className="p-4 bg-slate-800 rounded-2xl space-y-2 text-xs text-slate-300 border border-slate-700">
                <p className="font-bold text-white">💼 지원 대상</p>
                <p>• 금융/보험 분야로 전직 또는 신규 커리어를 희망하시는 분</p>
                <p>• 지인 영업이 아닌 전문적인 분석 및 콘텐츠 영업을 배우고 싶으신 분</p>
                <p>• 시간 활용이 유연하고 노력한 만큼 합당한 보상을 원하는 분</p>
              </div>
            </div>

            <div className="lg:col-span-7">
              {submitted ? (
                <div className="p-8 bg-indigo-950/80 border border-indigo-500/40 rounded-2xl text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">지원서가 성공적으로 접수되었습니다!</h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    지점장 {companyInfo.leaderName} 및 채용 멘토가 빠른 시일 내에 연락드려 편안한 1:1 상담 일정을 조율하겠습니다.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    추가 문의 작성
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        성함 <span className="text-indigo-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="홍길동"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        연락처 <span className="text-indigo-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="010-1234-5678"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        보험영업 경력 여부 <span className="text-indigo-400">*</span>
                      </label>
                      <select
                        value={formData.experienceType}
                        onChange={(e) => setFormData({ ...formData, experienceType: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                      >
                        <option>신입 (보험영업 경험 없음)</option>
                        <option>타 GA 경력 (1년 미만)</option>
                        <option>타 GA 경력 (1년 이상)</option>
                        <option>원수사(생명/손해보험) 경력</option>
                        <option>금융권(은행/증권/카드) 경력</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        희망 상담 시간
                      </label>
                      <select
                        value={formData.consultTime}
                        onChange={(e) => setFormData({ ...formData, consultTime: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                      >
                        <option>평일 오후 (14:00~18:00)</option>
                        <option>평일 오전 (09:00~12:00)</option>
                        <option>평일 저녁 (18:00~20:00)</option>
                        <option>주말 일정 조율 희망</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      지원 동기 또는 궁금하신 사항 (선택)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.motivation}
                      onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                      placeholder="예: 초보자도 가능한지, 교육 일정과 정착 지원 내용에 대해 자세히 알고 싶습니다."
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    />
                  </div>

                  <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.privacyAgreed}
                        onChange={(e) => setFormData({ ...formData, privacyAgreed: e.target.checked })}
                        className="mt-0.5 rounded text-indigo-500 focus:ring-indigo-400"
                        required
                      />
                      <span className="text-xs text-slate-300 leading-tight">
                        [필수] 설계사 채용 상담 및 전형 안내를 위한 개인정보 수집·이용에 동의합니다.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>설계사 지원 신청서 제출하기</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

