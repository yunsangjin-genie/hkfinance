import React, { useState, useMemo } from 'react';
import { BookOpen, Search, Clock, ArrowRight, Tag, ShieldCheck, Filter } from 'lucide-react';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { blogPosts } from '../../data/blog';

interface InsuranceInfoHubPageProps {
  onNavigate: (path: string) => void;
  onOpenConsult: (category?: string) => void;
}

export const InsuranceInfoHubPage: React.FC<InsuranceInfoHubPageProps> = ({
  onNavigate,
  onOpenConsult,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const categories = ['전체', '실손보험', '보험상식', '건강보험', '보험 리모델링', '연금·노후'];

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchCat =
        selectedCategory === '전체' || post.category === selectedCategory;
      const matchSearch =
        !searchKeyword.trim() ||
        post.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchKeyword.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchKeyword]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Breadcrumb
        items={[
          { name: '홈', path: '/' },
          { name: '보험정보' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Header Banner */}
      <header className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-950 text-blue-300 text-xs font-bold border border-blue-800">
            KNOWLEDGE &amp; INSIGHTS · 목동 보험정보 허브
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            보험정보 허브
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl mx-auto leading-relaxed font-normal">
            어려운 보험 용어, 4세대 실손 비교, 보험 리모델링 주의사항을 알기 쉽게 정리한 보험 전문 칼럼 모음입니다. HK금융파트너스 경인사업본부 목동지점은 서울 목동을 기반으로 하는 보험 상담 지점으로서, 금융소비자의 합리적인 선택을 돕는 유익한 정보들을 정기적으로 업데이트합니다. 보험 상담이 필요한 고객과 보험설계사를 시작하려는 사람을 위한 열린 지식 아카이브입니다.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-2 text-xs text-blue-300">
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHO: HK금융파트너스 목동지점
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHERE: 서울 목동 보험정보센터
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHAT: 실손·건강·리모델링 핵심 가이드
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHO FOR: 금융소비자 및 설계사 지망생
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Search and Category Filter Toolbar */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          {/* Keyword Search Input */}
          <div className="relative max-w-lg">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="관심 키워드를 검색해 보세요 (예: 실손, 뇌혈관, 해지, 40대)"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:border-blue-500 transition"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            <Filter className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-slate-500 space-y-3 border border-slate-200">
            <p className="text-sm">검색 결과에 맞는 보험정보 글이 없습니다.</p>
            <button
              onClick={() => {
                setSelectedCategory('전체');
                setSearchKeyword('');
              }}
              className="text-xs font-bold text-blue-600 underline cursor-pointer"
            >
              전체 목록으로 초기화
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => onNavigate(`/insurance-info/${post.id}`)}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md">
                      {post.category}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h2 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {post.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="text-[11px] text-slate-400">작성자: {post.author}</span>
                  <span className="text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold">
                    <span>자세히 보기</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Consulting Callout */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 text-center space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold">
            내 보험에 직접 적용해보고 싶으신가요?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            인터넷 정보만으로는 내 가입 조건과 건강 상태에 맞는지 확신하기 어렵습니다. 목동지점 수석 상담팀과 함께 1:1로 증권을 대조해 보세요.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('/consulting/consultation')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 mx-auto cursor-pointer shadow-lg shadow-blue-600/30"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>1:1 맞춤 보장분석 상담 신청</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
