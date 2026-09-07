import React from 'react';
import {
  BookOpen,
  Clock,
  UserCheck,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Share2,
  Tag,
  ArrowLeft,
} from 'lucide-react';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { blogPosts } from '../../data/blog';

interface InsuranceInfoDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenConsult: (category?: string) => void;
}

export const InsuranceInfoDetailPage: React.FC<InsuranceInfoDetailPageProps> = ({
  slug,
  onNavigate,
  onOpenConsult,
}) => {
  const post = blogPosts.find((p) => p.id === slug) || blogPosts[0];

  // Related posts (excluding current)
  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 2);

  // Link to relevant insurance product based on category
  const getRelatedProduct = (category: string) => {
    switch (category) {
      case '실손보험':
        return { name: '실손의료보험 가이드', path: '/insurance/silson' };
      case '건강보험':
        return { name: '종합 건강보험 가이드', path: '/insurance/health' };
      case '연금·노후':
        return { name: '연금 및 노후보험 가이드', path: '/insurance/pension' };
      case '보험 리모델링':
      case '보험상식':
      default:
        return { name: '보장분석 및 점검 안내', path: '/consulting/analysis' };
    }
  };

  const relatedProduct = getRelatedProduct(post.category);

  return (
    <article className="min-h-screen bg-slate-50">
      <Breadcrumb
        items={[
          { name: '홈', path: '/' },
          { name: '보험정보', path: '/insurance-info' },
          { name: post.title },
        ]}
        onNavigate={onNavigate}
      />

      {/* Article Header Banner */}
      <header className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-md bg-blue-900 text-blue-200 font-bold">
              {post.category}
            </span>
            <span className="text-slate-400">발행일: {post.publishDate}</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>읽는 시간 약 {post.readTime}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight">
            {post.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal max-w-3xl">
            {post.summary}
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs text-blue-300">
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHO: HK금융파트너스 목동지점
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHERE: 서울 목동 보험정보센터
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHAT: 금융소비자 전문 칼럼
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHO FOR: 소비자 & 예비 설계사
            </span>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300 border-t border-slate-800">
            <div className="flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-blue-400" />
              <span>작성: {post.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>감수: {post.reviewer}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Article Body Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Core Summary Highlight Box */}
        <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-6 sm:p-7 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <h2 className="text-sm font-bold text-blue-950 uppercase tracking-wider">
              핵심 요약 (Key Summary)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-blue-950 font-medium leading-relaxed">
            {post.summary}
          </p>
          {post.targetReader && (
            <p className="text-xs text-blue-800/90 pt-1 border-t border-blue-200/60">
              <strong>추천 독자:</strong> {post.targetReader}
            </p>
          )}
        </div>

        {/* Key Takeaways Checklist Box */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>핵심 체크포인트</span>
            </h3>
            <div className="space-y-2.5">
              {post.keyTakeaways.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3 text-xs text-slate-700"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Content Paragraphs */}
        <article className="bg-white rounded-2xl p-7 sm:p-9 border border-slate-200 shadow-xs space-y-5 text-slate-700 text-xs sm:text-sm leading-relaxed">
          {post.content.map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </article>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Tag className="w-3.5 h-3.5 text-slate-400" />
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs text-slate-600 bg-slate-100 px-3 py-1 rounded-full font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Product Link Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-blue-700 uppercase">
              RECOMMENDED SERVICE
            </span>
            <h3 className="text-sm font-bold text-slate-900">
              {relatedProduct.name}
            </h3>
            <p className="text-xs text-slate-600">
              글에서 다룬 내용과 관련된 세부 보장 항목 및 가입 시 유의사항을 확인하세요.
            </p>
          </div>
          <button
            onClick={() => onNavigate(relatedProduct.path)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
          >
            <span>상세 페이지 가기</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Consultation Callout CTA */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 text-center space-y-4">
          <h3 className="text-xl font-bold">
            내 상황에 맞춘 구체적인 분석이 필요하신가요?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            가입 권유 없이 현재 가입된 약관과 증권을 바탕으로 객관적인 진단을 진행해 드립니다.
          </p>
          <div className="pt-1">
            <button
              onClick={() => onNavigate('/consulting/consultation')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 mx-auto cursor-pointer shadow-lg shadow-blue-600/30"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>1:1 맞춤 보장 상담 신청</span>
            </button>
          </div>
        </div>

        {/* Other Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h3 className="text-sm font-bold text-slate-900">
              함께 읽으면 좋은 다른 보험 칼럼
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onNavigate(`/insurance-info/${rel.id}`)}
                  className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-sm transition cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-sm">
                      {rel.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {rel.summary}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-semibold">
                    <span>읽어보기</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back to Hub Button */}
        <div className="pt-4">
          <button
            onClick={() => onNavigate('/insurance-info')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-4 py-2.5 rounded-xl transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>보험정보 전체 목록으로</span>
          </button>
        </div>
      </div>
    </article>
  );
};
