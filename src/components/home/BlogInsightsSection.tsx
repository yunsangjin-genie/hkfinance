import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, User, CheckCircle2, ArrowRight, X, Sparkles, Tag, ShieldCheck } from 'lucide-react';
import { BlogPost, NavigationPage } from '../../types';
import { blogPosts } from '../../data/blog';

interface BlogInsightsSectionProps {
  onOpenConsult: (category?: string) => void;
  onNavigate: (page: NavigationPage) => void;
}

export const BlogInsightsSection: React.FC<BlogInsightsSectionProps> = ({
  onOpenConsult,
  onNavigate,
}) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('전체');

  useEffect(() => {
    if (!selectedPost) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPost(null);
      }
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPost]);

  const categories = ['전체', '실손보험', '건강보험', '보험 리모델링', '연금·노후', '보험상식'];

  const filteredPosts = activeCategory === '전체'
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
            <BookOpen className="w-3.5 h-3.5" /> E-E-A-T 검증 전문 칼럼 &amp; 지식
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            보험, 어렵게 공부하지 마세요.
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            목동지점 지점장 윤상진과 전문 컴플라이언스 팀이 직접 검증한 알기 쉽고 객관적인 보험 가이드를 제공합니다.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition cursor-pointer ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 6 Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between p-6 cursor-pointer group"
            >
              <div className="space-y-3">
                {/* Category & Read Time */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                    {post.category}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime} 읽기
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {post.summary}
                </p>

                {/* E-E-A-T Author & Reviewer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3 text-slate-400" /> 작성: {post.author}
                  </span>
                  <span>{post.publishDate}</span>
                </div>
              </div>

              <div className="pt-4 mt-2 flex items-center justify-between text-xs text-blue-600 font-semibold group-hover:text-blue-700">
                <span>칼럼 전문 읽기</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate('info')}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold rounded-xl text-sm transition shadow-xs"
          >
            <span>보험 정보 전체 칼럼 보러가기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Blog Article Reader Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
          onClick={() => setSelectedPost(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white select-none">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold px-2 py-0.5 bg-blue-600 rounded text-white">
                  {selectedPost.category}
                </span>
                <span className="text-xs text-slate-300">{selectedPost.readTime} 분량</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPost(null);
                }}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
                aria-label="닫기"
              >
                <X className="w-5 h-5 pointer-events-none" />
              </button>
            </div>

            {/* Article Content */}
            <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6 text-left">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {selectedPost.title}
                </h2>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500 pb-4 border-b border-slate-100">
                  <span>작성자: <strong>{selectedPost.author}</strong></span>
                  <span>·</span>
                  <span>감수: {selectedPost.reviewer}</span>
                  <span>·</span>
                  <span>작성일: {selectedPost.publishDate} (최종업데이트: {selectedPost.updateDate})</span>
                </div>
              </div>

              {/* Target Reader Note */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
                <strong>🎯 추천 대상:</strong> {selectedPost.targetReader}
              </div>

              {/* Key Takeaways */}
              <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-xl space-y-2">
                <p className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-600" /> 핵심 요약 3가지
                </p>
                <ul className="space-y-1.5">
                  {selectedPost.keyTakeaways.map((item, idx) => (
                    <li key={idx} className="text-xs text-blue-900 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Body Content */}
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                {selectedPost.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {selectedPost.tags.map((t) => (
                  <span key={t} className="text-[11px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                    #{t}
                  </span>
                ))}
              </div>

              {/* Bottom Action */}
              <div className="p-4 bg-slate-900 text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-white">이 글과 관련된 내 보험을 점검받고 싶으신가요?</p>
                  <p className="text-[11px] text-slate-300">목동지점 지점장 윤상진 1:1 맞춤 무료 보장분석</p>
                </div>
                <button
                  onClick={() => {
                    const postTitle = selectedPost.title;
                    setSelectedPost(null);
                    onOpenConsult(postTitle);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-xs transition shrink-0"
                >
                  내 보험 상담받기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
