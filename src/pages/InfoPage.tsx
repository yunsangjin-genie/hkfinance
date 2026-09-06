import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Clock, User, CheckCircle2, ArrowRight, X, Sparkles, Tag, ShieldCheck } from 'lucide-react';
import { BlogPost } from '../types';
import { blogPosts } from '../data/blog';

interface InfoPageProps {
  onOpenConsult: (category?: string) => void;
}

export const InfoPage: React.FC<InfoPageProps> = ({ onOpenConsult }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (!activePost) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePost(null);
      }
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePost]);

  const categories = ['전체', '실손보험', '건강보험', '보험 리모델링', '연금·노후', '보험상식'];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === '전체' || post.category === selectedCategory;
    const matchesSearch =
      post.title.includes(searchQuery) ||
      post.summary.includes(searchQuery) ||
      post.tags.some((t) => t.includes(searchQuery));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-3.5 py-1 rounded-full border border-emerald-800">
            KNOWLEDGE &amp; INSIGHTS
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            보험 정보 &amp; 금융 가이드
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            소비자가 꼭 알아야 할 보험 상식, 리모델링 노하우, 법적 권리를 알기 쉽게 설명합니다.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search & Categories */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="칼럼 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9.5 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setActivePost(post)}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 p-6 flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 border border-blue-100">
                    {post.category}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {post.summary}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {post.tags.map((t) => (
                    <span key={t} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-semibold">
                <span>상세 내용 보기</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Post Modal */}
      {activePost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
          onClick={() => setActivePost(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white select-none">
              <span className="text-xs font-bold px-2 py-0.5 bg-blue-600 rounded">
                {activePost.category}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePost(null);
                }}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
                aria-label="닫기"
              >
                <X className="w-5 h-5 pointer-events-none" />
              </button>
            </div>

            <div className="p-6 max-h-[80vh] overflow-y-auto space-y-5 text-left">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{activePost.title}</h2>
                <p className="text-xs text-slate-500 mt-1">
                  작성: {activePost.author} · 감수: {activePost.reviewer} · {activePost.publishDate}
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl text-xs text-slate-700">
                <strong>🎯 추천 대상:</strong> {activePost.targetReader}
              </div>

              <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-xl space-y-1.5">
                <p className="text-xs font-bold text-blue-950">핵심 요약 포인트</p>
                {activePost.keyTakeaways.map((k, i) => (
                  <p key={i} className="text-xs text-blue-900 flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{k}</span>
                  </p>
                ))}
              </div>

              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                {activePost.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200">
                <button
                  onClick={() => {
                    const postTitle = activePost.title;
                    setActivePost(null);
                    onOpenConsult(postTitle);
                  }}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs sm:text-sm transition"
                >
                  이 주제와 관련해 내 보험 점검 신청하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
